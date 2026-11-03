const timeline = [
  { year: "Earlier", role: "Operations", detail: "Marble processing, flour milling, cold storage" },
  { year: "2011 →", role: "Founder, iTradeAIMS", detail: "21 indicators, 8 EAs, 3,000+ customers" },
  { year: "2014 →", role: "TradingView author", detail: "Publishing Pine Script tools and ideas" },
  { year: "BrumByte", role: "ChartBridge · domain lead", detail: "TradingView → MetaTrader bridge; owned the MT4/MT5 EAs" },
  { year: "Now", role: "AI agent engineering", detail: "AIMStack, baton relay, MCP support automation" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-[72px] border-t border-q-line">
      <div className="wrap py-[clamp(72px,9vw,120px)]">
        <div className="flex flex-wrap gap-x-12 gap-y-8">
          <h2 className="flex-[5_1_340px] text-balance text-[clamp(36px,4.5vw,56px)] font-bold leading-[1.02] tracking-[-0.04em]">
            Builder first. Technology is the leverage.
          </h2>
          <div className="grid flex-[6_1_400px] gap-[18px] text-[17px] leading-[1.6] text-q-body2">
            <p className="text-pretty">
              I&apos;ve spent my working life building and operating things: marble processing, flour milling and cold
              storage, then trading. iTradeAIMS still sells and supports 21 indicators and 8 Expert Advisors: 3,000+
              customers, 500+ active licence holders.
            </p>
            <p className="text-pretty">
              Today I build with AI coding agents inside a setup I run myself: specs, versioned skills, MCP tools, tests
              and review gates. I use plain code wherever it beats AI, and a person stays in the loop where judgement
              matters.
            </p>
          </div>
        </div>
        <ol className="mt-20 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-y-10">
          {timeline.map((e) => (
            <li key={e.year} className="relative pr-6">
              <div className="absolute inset-x-0 top-[5px] h-px bg-q-edge2" aria-hidden />
              <div className="relative h-[11px] w-[11px] rounded-full border-2 border-q-blue bg-q-bg" aria-hidden />
              <div className="mt-5 font-mono text-[13px] text-q-blue">{e.year}</div>
              <div className="mt-2 text-[17px] font-bold tracking-[-0.01em]">{e.role}</div>
              <div className="mt-1.5 text-sm leading-normal text-q-muted">{e.detail}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
