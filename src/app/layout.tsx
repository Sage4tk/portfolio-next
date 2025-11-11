import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Timothy Timbol",
  description: "Modern portfolio showcasing my work and expertise",
  icons: {
    icon: [
      "/icons/favicon.ico",
      "/icons/favicon-16x16.png",
      "/icons/favicon-32x32.png",
    ],
    apple: "/icons/apple-touch-icon.png",
    other: [
      { rel: "android-chrome", url: "/icons/android-chrome-192x192.png" },
      { rel: "android-chrome", url: "/icons/android-chrome-512x512.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
