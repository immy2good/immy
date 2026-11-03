const groups = [
  {
    title: "Trading development",
    skills: ["MQL5 / MQL4", "MetaTrader 4 + 5", "Expert Advisors", "Pine Script v6", "Strategy Tester", "EA licensing", "MT4 → MT5 parity"],
  },
  {
    title: "AI agent engineering",
    skills: ["Claude Code", "Codex", "Cursor · Gemini", "MCP", "Multi-agent orchestration", "Guardrails + HITL", "Spec-driven TDD"],
  },
  {
    title: "Web + platforms",
    skills: ["Python · PyTorch · ONNX", "TypeScript · React · Next.js", "Laravel · PHP", "WordPress + PMPro", "Stripe · webhooks", "Docker"],
  },
];

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-[72px] border-t border-q-line">
      <div className="wrap flex flex-wrap gap-x-12 gap-y-6 py-[clamp(64px,8vw,104px)]">
        <h2 className="flex-[1_1_220px] text-[32px] font-bold tracking-[-0.03em]">Stack</h2>
        <div className="grid flex-[3_1_560px] gap-7">
          {groups.map((g) => (
            <div key={g.title} className="flex flex-wrap gap-x-6 gap-y-3.5 border-t border-q-line pt-5">
              <h3 className="flex-[0_0_220px] text-base font-semibold">{g.title}</h3>
              <ul className="flex flex-[1_1_300px] flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li key={s} className="rounded-full border border-q-edge px-3 py-1.5 text-[13px] text-q-body">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
