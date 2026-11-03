import { TypewriterEffect } from "@/components/TypewriterEffect";

const roles = [
  "MT4/MT5 Expert Advisors",
  "Pine Script tools",
  "AI agent workflows",
  "MCP integrations",
  "EA licensing systems",
];

export function Hero() {
  return (
    <section id="top" className="wrap pt-[clamp(48px,7vw,88px)]">
      <p className="eyebrow text-q-muted">MQL5 · Pine Script · AI agent engineering</p>
      <h1 className="mt-[26px] text-balance text-[clamp(48px,9vw,128px)] font-bold leading-[.94] tracking-[-0.05em]">
        Trading tools &amp; AI systems that do <span className="text-q-blue">real work.</span>
      </h1>
      <div className="mt-[clamp(36px,5vw,64px)] flex flex-wrap items-start gap-x-10 gap-y-7 border-t border-q-line pb-[clamp(40px,5vw,64px)] pt-7">
        <div className="flex flex-[1_1_220px] items-center gap-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/immy-profile.webp"
            alt="Immy Yousafzai"
            className="h-[52px] w-[52px] rounded-full object-cover object-[center_30%]"
          />
          <div className="text-[13px] leading-[1.45] text-q-muted">
            Founder, iTradeAIMS
            <br />
            Birmingham, UK
          </div>
        </div>
        <p className="m-0 flex-[2_1_380px] text-pretty text-lg leading-[1.55] text-q-body2">
          Since 2011 I&apos;ve built MT4/MT5 Expert Advisors, indicators and Pine Script tools, plus the AI agent
          workflows I use to ship them. Spec-first, test-heavy, verified before done.
        </p>
        <div className="flex flex-[1_1_300px] flex-col items-start gap-[18px]">
          <div className="flex h-[22px] items-center gap-2 whitespace-nowrap font-mono text-[15px]">
            <span className="text-q-muted">now building</span>
            <TypewriterEffect words={roles} className="text-q-blue" />
            <span className="anim-blink h-[18px] w-2 bg-q-blue" aria-hidden />
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="#work"
              className="rounded-full bg-q-fg px-5 py-[13px] text-[15px] font-semibold text-q-bg hover:text-q-bg hover:opacity-90"
            >
              See the work
            </a>
            <a href="#contact" className="rounded-full border border-q-edge2 px-5 py-3 text-[15px]">
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
