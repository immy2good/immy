# I M Yousafzai - Portfolio Website

A modern, responsive portfolio website showcasing my expertise as a **Software Engineer** and **Fullstack Web Developer** with a **FinTech** background. Built with Next.js 15.2.4, React 19, TypeScript, and Tailwind CSS with accessibility features. (Yeah! yeah I know Next.js is an overkill for a portfolio website but man's gotta play with the toys man's got! )

## 🚀 Live Demo

Visit the live website: https://imyousafzai.com

## 👨‍💻 About Me

I'm I M Yousafzai (Immy), a passionate software developer and technical analysis expert with over 13 years of experience in financial markets since 2011. I specialize in:

- **FinTech Solutions**: Trading platforms, algorithmic trading, technical analysis tools
- **Web Development**: Full-stack applications, e-commerce sites, business websites
- **Technical Analysis**: Published author of Elliott Wave Principle book
- **Trading Automation**: Pine Script indicators, MQL4/MQL5 Expert Advisors

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.2.4** - React framework with App Router
- **React 19** - Latest React version with improved performance
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI Components** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful vector icons
- **TypewriterEffect** - Custom component for animated text display

### Backend & Services

- **Server Actions** - Next.js server-side form handling
- **Resend** - Email service for contact form
- **Resume Generator** - Custom PDF resume generation
- **Next.js API Routes** - Backend functionality
- **Vercel** - Deployment and hosting

### FinTech Technologies

- **Pine Script** - TradingView indicator development
- **MQL4/MQL5** - MetaTrader automation
- **Technical Analysis** - Elliott Wave, Fibonacci, pattern recognition

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main portfolio page
│   ├── globals.css         # Global styles
│   ├── api/                # API routes
│   │   └── download/       # Resume download API endpoint
│   └── send/               # Email sending endpoint
├── components/
│   ├── ui/                 # Radix UI components
│   ├── header.tsx          # Navigation header
│   ├── hero.tsx            # Hero section
│   ├── about.tsx           # About section
│   ├── skills.tsx          # Skills showcase
│   ├── projects.tsx        # Projects carousel
│   ├── contact.tsx         # Contact form
│   ├── footer.tsx          # Footer
│   ├── ResumeDownload.tsx  # Resume download component
│   ├── TypewriterEffect.tsx # Animated text component
│   └── theme-toggle.tsx    # Dark/light mode toggle
├── hooks/
│   └── use-mobile.tsx      # Mobile detection hook
├── lib/
│   ├── actions.ts          # Server actions for form handling
│   ├── resumeGenerator.ts  # PDF resume generation
│   └── utils.ts            # Utility functions
└── public/
    ├── cv/                 # Resume PDF files
    └── images/             # Project screenshots and assets
```

## ✨ Features

### 🎨 Design & UX

- **Responsive Design** - Works perfectly on all devices
- **Dark/Light Mode** - Theme switcher with system preference
- **Modern UI** - Clean, professional design using Radix UI components
- **Smooth Animations** - Hover effects and transitions
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
- **Typewriter Effect** - Animated text display on hero section
- **Compact Project Carousel** - Accessible, responsive project showcase

### 📧 Contact Form

- **Functional Contact Form** - Powered by Resend email service
- **Form Validation** - Client and server-side validation with Zod and React Hook Form
- **Success/Error Handling** - User feedback and error messages
- **Email Notifications** - Direct emails to my inbox
- **Professional Templates** - Formatted HTML emails

### � Resume Generation

- **Dynamic Resume Download** - On-demand PDF generation
- **Multiple Formats** - View online or download as PDF
- **Customization Options** - Different resume variants available
- **Print Friendly** - Optimized for printing

### �📱 Sections

- **Hero Section** - Introduction and animated typewriter effect
- **About** - Personal story and credentials
- **Skills** - Technical expertise categorized by domain
- **Projects** - Accessible carousel of FinTech and web development work
- **Contact** - Functional contact form and social links

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn or pnpm
- Resend API key (for contact form)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/immy2good/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:

   ```env
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Run the development server**

   ```bash
   pnpm run dev
   ```

   If you encounter permission errors with the trace files:

   ```bash
   pnpm run dev:safe
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📊 Featured Projects

### FinTech Projects

- **iTradeAIMS** - Trading education platform with Discord community
- **TradingView Indicators** - Pine Script tools with 1.2K+ followers
- **Elliott Wave Tools** - Pattern recognition and analysis systems
- **MetaTrader Bots** - Automated trading Expert Advisors

### Web Development Projects

- **Bewdley Farm Shop** - E-commerce site with WordPress/WooCommerce
- **Splashbacks Birmingham** - Local business website with SEO
- **iTradeAIMS** - A financial trading website that provoides courses, tools and memberships.

## 📚 Published Work

- **"The 10 Seconds Elliott Wave"** - Available on Amazon
- **240+ TradingView Ideas** - Published technical analysis
- **100+ FinTech Tools** - Scripts used by global trading community
- **Accessible UI Components** - Optimized for all users including those with disabilities

## 🔗 Connect With Me

- **Website**: [imYousafzai.com](https://imyousafzai.com)
- **Email**: [Mail Me](mailto:imran@brumbyte.com)
- **TradingView**: [@iTradeAIMS](https://www.tradingview.com/u/iTradeAIMS/)
- **LinkedIn**: [Immy Yousafzai](https://www.linkedin.com/in/immy-yousafzai/)
- **GitHub**: [immy2good](https://github.com/immy2good)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal portfolio, I'm open to suggestions and improvements. Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

Interested in FinTech development, web development, or technical analysis consulting? Let's discuss your project!

- **Email**: imran@brumbyte.com
- **Portfolio**: https://imyousafzai.com

## 🔧 Troubleshooting

### Next.js Trace Permission Errors

If you encounter `EPERM: operation not permitted` errors related to the `.next/trace` directory:

1. Use the provided safe development script:

   ```bash
   pnpm run dev:safe
   ```

2. Or add the following to your `.env.local`:

   ```
   NEXT_TELEMETRY_DISABLED=1
   NEXT_TRACE_PROFILER_DISABLED=1
   ```

3. The project's `next.config.mjs` has been configured to minimize trace file issues with:
   ```js
   outputFileTracingExcludes: {
     "*": ["**/*"],
   }
   ```

---

**Built with ❤️ by I M Yousafzai**

```

```
