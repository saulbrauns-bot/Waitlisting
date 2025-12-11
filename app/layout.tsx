import type { Metadata } from "next";
import { satoshi, inter } from "./fonts";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: "Bridge - Intentional Dating",
  description: "One curated match at a time. No swiping. No noise. Dating designed for people who value their time.",

  // OpenGraph metadata for social sharing
  openGraph: {
    title: "Bridge - Intentional Dating",
    description: "One curated match at a time. Dating designed for people who value their time.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://bridge.app",
    siteName: "Bridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bridge - Intentional Dating"
      }
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Bridge - Intentional Dating",
    description: "One curated match at a time. Dating designed for people who value their time.",
    images: ["/og-image.png"],
  },

  // Search engine directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${satoshi.variable} ${inter.variable}`}
      style={{ scrollBehavior: "auto" }}
    >
      <body
        className="antialiased"
        style={{ overflow: "auto" }}
      >
        {children}
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
