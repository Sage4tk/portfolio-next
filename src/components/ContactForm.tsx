"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.875rem 1rem",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "4px",
  color: "var(--text)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-space-mono), monospace",
  fontSize: "0.65rem",
  textTransform: "uppercase" as const,
  letterSpacing: "0.15em",
  color: "var(--muted)",
  marginBottom: "0.5rem",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else if (response.status === 429) {
        const retryAfter = data.retryAfter || 86400;
        const hours = Math.ceil(retryAfter / 3600);
        setError(
          `You've already sent a message today. Please wait ${hours} hour${hours !== 1 ? "s" : ""} before sending another.`
        );
      } else {
        setError(data.error || "Failed to send message.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getFocusStyle = (name: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focused === name ? "rgba(184,255,71,0.5)" : "var(--border)",
    boxShadow:
      focused === name ? "0 0 0 2px rgba(184,255,71,0.08)" : "none",
  });

  if (success) {
    return (
      <div
        style={{
          padding: "3rem",
          border: "1px solid rgba(184,255,71,0.25)",
          borderRadius: "8px",
          background: "rgba(184,255,71,0.04)",
          textAlign: "center",
        }}
      >
        <div
          className="font-display"
          style={{
            fontSize: "2.5rem",
            color: "var(--accent)",
            marginBottom: "0.75rem",
            letterSpacing: "0.05em",
          }}
        >
          MESSAGE SENT.
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
          I&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="btn-outline"
          style={{ marginTop: "1.5rem", fontSize: "0.8rem" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {error && (
        <div
          style={{
            padding: "1rem 1.25rem",
            background: "rgba(255,80,80,0.06)",
            border: "1px solid rgba(255,80,80,0.2)",
            borderRadius: "4px",
            color: "#ff8080",
            fontSize: "0.85rem",
            fontFamily: "var(--font-space-mono), monospace",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.25rem",
        }}
      >
        <div>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            required
            placeholder="Your name"
            style={getFocusStyle("name")}
          />
        </div>

        <div>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            required
            placeholder="your@email.com"
            style={getFocusStyle("email")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" style={labelStyle}>Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onFocus={() => setFocused("subject")}
          onBlur={() => setFocused(null)}
          required
          placeholder="What's this about?"
          style={getFocusStyle("subject")}
        />
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          required
          rows={6}
          placeholder="Tell me about your project..."
          style={{
            ...getFocusStyle("message"),
            resize: "none",
            lineHeight: 1.7,
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
            border: "none",
          }}
        >
          {loading ? (
            <>
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid rgba(0,0,0,0.3)",
                  borderTopColor: "#000",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin-slow 0.7s linear infinite",
                }}
              />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
