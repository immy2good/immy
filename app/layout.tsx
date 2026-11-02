import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

const siteTitle = "Immy Yousafzai | MT5 EA & Pine Script Developer, AI Agent Engineering";
const shareDescription =
  "MT4/MT5 Expert Advisors, Pine Script, EA licensing and AI agent engineering. Founder of iTradeAIMS since 2011.";

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
    images: ["/images/immy-profile.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: shareDescription,
    images: ["/images/immy-profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
