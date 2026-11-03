import Link from "next/link";
import type { ReactNode } from "react";
import { caseStudies } from "@/lib/case-studies";

type Card = {
  key: string;
  href: string;
  external?: boolean;
  category: string;
  title: string;
  sub: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  cta: string;
  wide?: boolean;
  // What shows on hover: a picture, or a panel drawn in code.
  visual: ReactNode;
};

function Picture({ src, alt }: { src: string; alt: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className="block h-full w-full object-cover object-top" />;
}

// AIMStack has no screenshot to show (the repository is private), so the card draws its shape.
function RepoPanel() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3.5 bg-q-band px-[22px] py-5 font-mono">
      <div className="flex items-baseline justify-between gap-3 text-xs">
        <span className="text-q-fg">
          AIMStack <span className="text-q-muted">· private repository</span>
        </span>
        <span className="text-q-muted">33 skills · 4 plugins</span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
        <div className="flex flex-col gap-[7px] overflow-hidden rounded-lg border border-q-line px-3.5 py-3 text-xs">
          <div className="text-[10px] tracking-[0.12em] text-q-blue">PLUGINS /</div>
          <div className="text-q-body">▸ aimstack</div>
          <div className="text-q-body">▸ aimstack-delivery</div>
          <div className="text-q-body">▸ aimstack-network</div>
          <div className="text-q-fg">▾ aimstack-trading</div>
          <div className="pl-3.5 text-q-muted">mt5-mcp</div>
          <div className="pl-3.5 text-q-muted">ea-release-readiness</div>
          <div className="pl-3.5 text-q-muted">tradingview-verify</div>
        </div>
        <div className="flex flex-col gap-2 overflow-hidden rounded-lg border border-q-line px-3.5 py-3 text-xs">
          <div className="text-[10px] tracking-[0.12em] text-q-blue">ONE SOURCE → EVERY HARNESS</div>
          {["Claude Code", "Codex", "Cursor", "Gemini · Antigravity"].map((h) => (
            <div key={h} className="flex justify-between gap-2">
              <span className="text-q-fg">{h}</span>
              <span className="text-q-green">✓</span>
            </div>
          ))}
          <div className="mt-auto text-[11px] text-q-muted">.claude-plugin · .codex-plugin · .cursor-plugin</div>
        </div>
      </div>
    </div>
  );
}

// An example of the support flow, not a real ticket.
function McpPanel() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 bg-q-band px-[22px] py-5 font-mono text-xs">
      <div className="flex justify-between gap-3">
        <span className="text-q-fg">#support · example ticket</span>
        <span className="text-q-muted">2 MCP servers · 37 tools</span>
      </div>
      <div className="rounded-lg border border-q-line px-3 py-2.5 font-sans text-[13px] leading-[1.4] text-q-body">
        <span className="font-mono text-[11px] text-q-muted">customer · </span>
        Renewed yesterday but TradingView access still shows expired?
      </div>
      <div className="flex flex-col gap-[5px] text-q-muted">
        <div>
          <span className="text-q-blue">→</span> membership.lookup <span className="text-q-green">active · renewed</span>
        </div>
        <div>
          <span className="text-q-blue">→</span> tradingview.access.check <span className="text-q-rose">expired</span>
        </div>
        <div>
          <span className="text-q-blue">→</span> tradingview.access.grant{" "}
          <span className="text-q-green">granted · verified buyer</span>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2.5 rounded-lg border border-[#3a2f17] bg-[#15120b] px-3 py-2.5">
        <span className="text-q-amber">reply drafted · waiting for Immy</span>
        <span className="flex gap-1.5">
          <span className="rounded-full border border-q-edge2 px-2.5 py-1 text-q-body">Edit</span>
          <span className="rounded-full bg-q-fg px-2.5 py-1 text-q-bg">Approve &amp; send</span>
        </span>
      </div>
    </div>
  );
}

const cards: Card[] = [
  ...caseStudies.map((s) => ({
    key: s.slug,
    href: `/case-studies/${s.slug}`,
    category: s.category,
    title: s.short,
    sub: s.sub,
    metrics: s.metrics,
    tags: s.tags,
    cta: "Read the case study →",
    visual: s.image ? <Picture src={s.image.src} alt={s.image.alt} /> : <RepoPanel />,
  })),
  {
    key: "mcp",
    href: "#contact",
    category: "Agentic business operations",
    title: "MCP Support Ops",
    sub: "Triages Discord and email support, drafts replies, and gives verified buyers TradingView access on its own",
    metrics: [
      { value: "3-in-1", label: "Discord triage, email, TradingView access" },
      { value: "2", label: "reply styles: owner persona or support team" },
      { value: "~96", label: "real support jobs" },
    ],
    tags: ["MCP", "Python", "Discord API", "Playwright", "Email"],
    cta: "Ask me about it",
    visual: <McpPanel />,
  },
  {
    key: "itradeaims",
    href: "https://itradeaims.net/",
    external: true,
    category: "Commercial platform · since 2011",
    title: "iTradeAIMS",
    sub: "The business all of this runs inside: payments, licensing, member access, email and TradingView access",
    metrics: [
      { value: "3,000+", label: "customers" },
      { value: "500+", label: "active licence holders" },
      { value: "21 + 8", label: "indicators and EAs" },
    ],
    tags: ["Stripe", "REST APIs", "WordPress", "TradingView"],
    cta: "Visit itradeaims.net ↗",
    wide: true,
    visual: <Picture src="/images/itradeaims-home.webp" alt="itradeaims.net home page" />,
  },
];

export function Projects() {
  return (
    <section id="work" className="wrap scroll-mt-[72px] pb-[clamp(64px,8vw,104px)] pt-[clamp(72px,9vw,120px)]">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <h2 className="m-0 text-[clamp(40px,5.5vw,72px)] font-bold leading-[.98] tracking-[-0.045em]">Selected work</h2>
        <p className="m-0 flex-[0_1_420px] text-base leading-[1.55] text-q-muted">
          Systems built and run in production. The code is private, so each one leads with the numbers. Hover a card
          to see it.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(min(100%,460px),1fr))] gap-6">
        {cards.map((c, i) => {
          const [lead, ...rest] = c.metrics;
          const body = (
            <>
              <div
                className={`relative overflow-hidden border-b border-q-line ${c.wide ? "aspect-[21/9]" : "aspect-video"}`}
              >
                <div className="absolute inset-0 flex flex-col justify-end p-7 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
                  <div className="font-mono text-[clamp(56px,7vw,88px)] leading-none tracking-[-0.04em] text-q-blue">
                    {lead.value}
                  </div>
                  <div className="mt-2.5 text-sm text-q-muted">{lead.label}</div>
                </div>
                <div className="absolute inset-0 scale-[1.04] bg-q-inset opacity-0 transition-[opacity,transform] duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                  {c.visual}
                </div>
              </div>
              <div className="flex flex-1 flex-col px-7 pb-7 pt-6">
                <div className="flex justify-between gap-3 font-mono text-[11px] tracking-[0.06em] text-q-muted">
                  <span>{c.category}</span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-3 text-[26px] font-bold tracking-[-0.025em]">{c.title}</h3>
                <p className="mt-1.5 text-[15px] text-[#9ba0a8]">{c.sub}</p>
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-5 border-t border-q-line pt-[18px]">
                  {rest.map((m) => (
                    <div key={m.label} className="flex flex-col-reverse">
                      <dt className="mt-0.5 text-xs text-q-muted">{m.label}</dt>
                      <dd className="font-mono text-lg">{m.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-[18px] flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-full bg-q-chip px-2.5 py-[5px] text-xs text-q-body2">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-auto pt-[22px] text-[15px] font-semibold text-q-fg group-hover:text-q-blue">
                  {c.cta}
                </span>
              </div>
            </>
          );
          const cls = `group flex flex-col overflow-hidden rounded-[14px] border border-q-line bg-q-card text-q-fg transition-colors hover:border-q-blue hover:text-q-fg focus-visible:border-q-blue focus-visible:outline-none ${c.wide ? "col-span-full" : ""}`;
          return c.external ? (
            <a key={c.key} href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>
              {body}
            </a>
          ) : (
            <Link key={c.key} href={c.href} className={cls}>
              {body}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
