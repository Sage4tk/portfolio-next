import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { adminDb } from "@/lib/firebase-admin";
import admin from "firebase-admin";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY!);

// Rate limit configuration
const RATE_LIMIT = {
  maxRequests: 1, // Only 1 email per IP
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  blockDurationMs: 24 * 60 * 60 * 1000, // Block for 24 hours after limit reached
};

function getRateLimitKey(request: NextRequest): string {
  // Get IP address from various possible headers
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const clientIp = request.headers.get("cf-connecting-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return realIp || clientIp || "unknown";
}

async function isRateLimited(
  ip: string
): Promise<{ limited: boolean; retryAfter?: number }> {
  try {
    const now = Date.now();
    const rateLimitRef = adminDb.collection("rateLimits").doc(ip);
    const doc = await rateLimitRef.get();

    if (!doc.exists) {
      // Create new rate limit record
      await rateLimitRef.set({
        count: 0,
        lastReset: now,
        blocked: false,
        createdAt: now,
      });
      return { limited: false };
    }

    const data = doc.data()!;

    // Check if user is currently blocked
    if (data.blocked && data.blockedUntil && now < data.blockedUntil) {
      const retryAfter = Math.ceil((data.blockedUntil - now) / 1000);
      return { limited: true, retryAfter };
    }

    // Reset if window has passed
    if (now - data.lastReset > RATE_LIMIT.windowMs) {
      await rateLimitRef.update({
        count: 0,
        lastReset: now,
        blocked: false,
        blockedUntil: null,
      });
      return { limited: false };
    }

    // Check if limit exceeded
    if (data.count >= RATE_LIMIT.maxRequests) {
      // Block the user
      const blockedUntil = now + RATE_LIMIT.blockDurationMs;
      await rateLimitRef.update({
        blocked: true,
        blockedUntil: blockedUntil,
      });
      const retryAfter = Math.ceil(RATE_LIMIT.blockDurationMs / 1000);
      return { limited: true, retryAfter };
    }

    return { limited: false };
  } catch (error) {
    console.error("Rate limit check error:", error);
    // If Firestore fails, allow the request (fail open)
    return { limited: false };
  }
}

async function incrementRateLimit(ip: string): Promise<void> {
  try {
    const rateLimitRef = adminDb.collection("rateLimits").doc(ip);
    await rateLimitRef.update({
      count: admin.firestore.FieldValue.increment(1),
      lastUpdated: Date.now(),
    });
  } catch (error) {
    console.error("Rate limit increment error:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIp = getRateLimitKey(request);
    const rateLimitResult = await isRateLimited(clientIp);

    if (rateLimitResult.limited) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. You can only send one message per day.",
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimitResult.retryAfter?.toString() || "86400",
          },
        }
      );
    }

    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Email to you (notification)
    const notificationEmail = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.CONTACT_EMAIL || process.env.RESEND_FROM_EMAIL!,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 600; letter-spacing: -0.5px;">New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 16px;">From your portfolio website</p>
          </div>
          
          <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 12px 12px;">
            <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
              <h2 style="color: #111827; margin-top: 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #3b82f6; padding-bottom: 12px; margin-bottom: 20px;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #374151; width: 100px;">Name:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #374151;">Email:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-weight: 500;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #374151;">Subject:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 500;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 500; color: #374151;">Received:</td>
                  <td style="padding: 12px 0; color: #6b7280;">${new Date().toLocaleString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZoneName: "short",
                    }
                  )}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
              <h2 style="color: #111827; margin-top: 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #3b82f6; padding-bottom: 12px; margin-bottom: 20px;">Message</h2>
              <div style="line-height: 1.7; color: #374151; font-size: 16px; white-space: pre-wrap; background: #f9fafb; padding: 24px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                ${message}
              </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 20px; border-radius: 12px; border-left: 4px solid #10b981;">
              <div style="display: flex; align-items: center;">
                <div style="margin-right: 12px; font-size: 24px;">💡</div>
                <div>
                  <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 14px; margin-bottom: 4px;">Quick Reply</p>
                  <p style="margin: 0; color: #047857; font-size: 14px;">Reply directly to this email to respond to ${name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    // Check if notification email was sent successfully
    if (notificationEmail.error) {
      throw new Error("Failed to send notification email");
    }

    // Increment rate limit only after successful email send
    await incrementRateLimit(clientIp);

    return NextResponse.json(
      {
        message: "Email sent successfully",
        details: {
          notificationId: notificationEmail.data?.id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend Error:", error);

    // More detailed error handling for Resend
    if (error && typeof error === "object" && "message" in error) {
      console.error("Resend API Error:", error.message);

      return NextResponse.json(
        {
          error: "Email service error",
          details:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
