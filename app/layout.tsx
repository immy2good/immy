import type React from "react";
import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const siteTitle = "Immy Yousafzai · Trading tools & AI systems";
const shareDescription =
  "MT4/MT5 Expert Advisors, Pine Script tools and AI agent workflows. Founder of iTradeAIMS, Birmingham UK.";

export const metadata: Metadata = {
  metadataBase: new URL("https://imyousafzai.com"),
  title: siteTitle,
  description:
    "Founder of iTradeAIMS since 2011. I build MT4/MT5 Expert Advisors, TradingView Pine Script tools and EA licensing, and run tested AI agent workflows. Birmingham, UK.",
  generator: "Next.js",
  applicationName: "Immy Yousafzai Portfolio",
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description: shareDescription,
    url: "/",
    type: "website",
    siteName: "Immy Yousafzai",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: shareDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
