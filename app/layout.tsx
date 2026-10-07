import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Immy Yousafzai | AI Product & Automation Engineer",
  description:
    "Portfolio of Immy Yousafzai - AI product and automation engineer, agentic systems builder, FinTech founder and applied AI practitioner.",
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
        <meta property="og:title" content="Immy Yousafzai | AI Product & Automation Engineer" />
        <meta
          property="og:description"
          content="AI product engineering, agentic systems, business automation, FinTech and applied AI."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Immy Yousafzai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://imyousafzai.com/images/immy-profile.jpg" />
        <meta name="twitter:title" content="Immy Yousafzai | AI Product & Automation Engineer" />
        <meta
          name="twitter:description"
          content="AI product engineering, agentic systems, business automation, FinTech and applied AI."
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
