import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Bebas_Neue, Space_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timothy Timbol — Full Stack Developer",
  description:
    "Full Stack Developer based in Dubai, UAE. Building modern web & mobile experiences.",
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
        className={`${geistSans.variable} ${bebasNeue.variable} ${spaceMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
