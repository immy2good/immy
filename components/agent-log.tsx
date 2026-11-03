"use client";

import { useEffect, useState } from "react";

// Example lines of the kind the agent setup writes. A loop, not a feed; the label says so.
const POOL: [string, string, string][] = [
  ["claude-code", "spec", "banana-ea/risk-guard.md drafted"],
  ["codex", "test", "engine suite: 1,416 assertions passed"],
  ["review", "gate", "pull request waiting for human merge"],
  ["cursor", "build", "confluence-pack.mq5 compiled, 0 warnings"],
  ["mcp", "support", "ticket reply drafted, awaiting approval"],
  ["ci", "test", "6/6 golden outputs byte-exact"],
  ["licence", "test", "15/15 crypto vectors pass"],
  ["baton", "relay", "handoff codex → claude-code"],
  ["gemini", "audit", "MT4/MT5 parity diff: every divergence named"],
  ["memory", "graph", "decision linked to its ADR"],
  ["mt5", "deploy", "ONNX model loaded in tester"],
  ["immy", "merge", "signed off, merged to main"],
];

type Line = { id: number; src: string; kind: string; msg: string; ts: string };

const colour = (kind: string) =>
  kind === "test" ? "text-q-green" : kind === "merge" || kind === "gate" ? "text-q-amber" : "text-[#7f8794]";

function line(n: number, ts: string): Line {
  const [src, kind, msg] = POOL[n % POOL.length];
  return { id: n, src, kind, msg, ts };
}

export function AgentLog() {
  // Timestamps are filled in on the client so the server and browser render the same first frame.
  const [lines, setLines] = useState<Line[]>(() => [2, 1, 0].map((n) => line(n, "--:--:--")));

  useEffect(() => {
    const now = () => new Date().toTimeString().slice(0, 8);
    setLines((ls) => ls.map((l) => ({ ...l, ts: now() })));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let n = 3;
    const timer = setInterval(() => {
      setLines((ls) => [line(n++, now()), ...ls.slice(0, 2)]);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap border-b border-q-line">
      <div className="flex flex-none flex-col justify-center gap-1 px-[clamp(20px,4vw,48px)] py-[18px] font-mono text-[11px] tracking-[0.12em]">
        <span className="flex items-center gap-2 text-q-blue">
          <span className="anim-pulse h-1.5 w-1.5 rounded-full bg-q-blue" aria-hidden />
          AGENT LOG
        </span>
        <span className="text-[10px] uppercase text-q-faint">Illustrative, not live data</span>
      </div>
      <div className="grid flex-[1_1_600px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))]" aria-hidden>
        {lines.map((l) => (
          <div key={l.id} className="border-l border-q-line px-6 py-4 font-mono text-xs leading-normal">
            <div className={colour(l.kind)}>
              {l.src} · {l.ts}
            </div>
            <div className="text-q-body">{l.msg}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
