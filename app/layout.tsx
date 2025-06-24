import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
// import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IM Yousafzai | Portfolio",
  description: "Portfolio of I M Yousafzai - Entrepreneur, Product Manager, Software Engineer, Financial Trader/Investor ",
    generator: 'Next.js',
  applicationName: 'I M Yousafzai Portfolio',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:url" content="https://imyousafzai.com" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://imyousafzai.com" />
        <meta property="og:title" content="I M Yousafzai | Portfolio" />
        <meta property="og:description" content="Portfolio of I M Yousafzai - Entrepreneur, Product Manager, Software Engineer, Financial Trader/Investor" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="I M Yousafzai | Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@imyousafzai" />
        <meta name="twitter:creator" content="@imyousafzai" />
        <meta name="twitter:title" content="I M Yousafzai | Portfolio" />
        <meta name="twitter:description" content="Portfolio of I M Yousaf zai - Entrepreneur, Product Manager, Software Engineer, Financial Trader/Investor" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
