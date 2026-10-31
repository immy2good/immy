import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Immy Yousafzai | MT5 EA & Pine Script Developer, AI Agent Engineering",
  description:
    "Founder of iTradeAIMS since 2011. I build MT4/MT5 Expert Advisors, TradingView Pine Script tools and EA licensing, and run tested AI agent workflows. Birmingham, UK.",
  generator: "Next.js",
  applicationName: "Immy Yousafzai Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:url" content="https://imyousafzai.com" />
        <meta property="og:image" content="https://imyousafzai.com/images/immy-profile.jpg" />
        <link rel="canonical" href="https://imyousafzai.com" />
        <meta property="og:title" content="Immy Yousafzai | MT5 EA & Pine Script Developer, AI Agent Engineering" />
        <meta
          property="og:description"
          content="MT4/MT5 Expert Advisors, Pine Script, EA licensing and AI agent engineering. Founder of iTradeAIMS since 2011."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Immy Yousafzai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://imyousafzai.com/images/immy-profile.jpg" />
        <meta name="twitter:title" content="Immy Yousafzai | MT5 EA & Pine Script Developer, AI Agent Engineering" />
        <meta
          name="twitter:description"
          content="MT4/MT5 Expert Advisors, Pine Script, EA licensing and AI agent engineering. Founder of iTradeAIMS since 2011."
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
