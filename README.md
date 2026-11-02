# Immy Yousafzai - Portfolio

Portfolio of **Immy Yousafzai**: trading software (MT4/MT5, Pine Script) and AI agent engineering.

Live site: https://imyousafzai.com

## What's on the site

- **Case studies** (`lib/case-studies.ts`, rendered by `app/case-studies/[slug]/page.tsx`):
  1. Banana EA: rebuilding a flagship trading robot for MT5
  2. EA and indicator licensing for MT4/MT5
  3. Confluence Pack for MT5
  4. AIMStack: the software factory behind iTradeAIMS
- **More work** cards: `components/projects.tsx`.
- **CV**: `public/cv/cv.pdf`, linked from the header and hero. Its source is `cv/cv.html` in the
  itradeaims-job-hunt repo; run `bash cv/export.sh` there to rebuild and copy it here.
- **Share images, favicon, sitemap, robots**: `app/opengraph-image.tsx`, `app/case-studies/[slug]/opengraph-image.tsx`,
  `app/icon.svg`, `app/apple-icon.png`, `app/sitemap.ts`, `app/robots.ts`.

## Stack

Next.js 15, React 19, TypeScript, Tailwind CSS, Radix UI (shadcn/ui components in `components/ui`).

## Development

```bash
pnpm install
pnpm run dev
pnpm run build
```

The contact form sends mail server-side with [Resend](https://resend.com). Set these in Vercel (Production, and Preview if you want the form to work on preview deploys). Do not commit the values, and do not put the recipient address in source.

- `RESEND_API_KEY` — Resend API key
- `CONTACT_TO_EMAIL` — private inbox that receives enquiries
- `CONTACT_FROM_EMAIL` — verified sender on your domain, for example `Contact Form <contact@imyousafzai.com>`

`imyousafzai.com` must be verified in Resend (the DNS records Resend shows) before messages from that sender will deliver. Until then, Resend only delivers mail sent from its onboarding address to the address on the Resend account.
