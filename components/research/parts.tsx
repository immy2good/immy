import type { ReactNode } from "react";

// Building blocks for a research report: the same shape for every strategy, so reports read alike.
const S1 = "#4d8dff";
const S2 = "#f2b84b";

export function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-[90px] border-t border-q-line">
      <div className="mx-auto flex max-w-[880px] flex-col gap-5 px-[clamp(20px,4vw,48px)] py-[clamp(48px,6vw,80px)]">
        <h2 className="text-balance text-[clamp(26px,3vw,36px)] font-bold leading-[1.1] tracking-[-0.03em]">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-4 text-[20px] font-bold tracking-[-0.015em]">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-pretty text-[16.5px] leading-[1.7] text-q-body2 [&_strong]:font-semibold [&_strong]:text-q-fg">{children}</p>;
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2.5 pl-5 text-[16px] leading-[1.65] text-q-body2 marker:text-q-faint [&_strong]:font-semibold [&_strong]:text-q-fg">
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  );
}

export function Chips({ items }: { items: { label: string; tone?: "pass" | "plain" | "fail" }[] }) {
  const tone = { pass: "bg-[rgba(95,211,141,.12)] text-q-green", fail: "bg-[rgba(240,113,120,.12)] text-q-rose", plain: "border border-q-edge2 text-q-body2" };
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((c) => (
        <span key={c.label} className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] ${tone[c.tone ?? "plain"]}`}>
          {c.label}
        </span>
      ))}
    </div>
  );
}

type Key = { label: string; kind: "s1" | "s2" | "s1line" | "s2line" | "s1wash" | "s2wash" };

export function Figure({ title, sub, legend, children }: { title: string; sub: string; legend?: Key[]; children: ReactNode }) {
  const sw = (k: Key["kind"]) => {
    const color = k.startsWith("s1") ? S1 : S2;
    if (k.endsWith("line")) return <i className="inline-block h-[2px] w-3.5 rounded" style={{ background: color }} />;
    if (k.endsWith("wash")) return <i className="inline-block h-2.5 w-3.5 rounded-sm border" style={{ background: `${color}29`, borderColor: color }} />;
    return <i className="inline-block h-2.5 w-3.5 rounded-sm" style={{ background: color }} />;
  };
  return (
    <figure className="m-0 flex min-w-0 flex-col gap-3 rounded-xl border border-q-edge bg-q-card p-[clamp(14px,2vw,20px)]">
      <figcaption className="flex flex-col gap-1">
        <span className="text-[15px] font-bold tracking-[-0.01em]">{title}</span>
        <span className="text-[13px] leading-[1.45] text-q-muted">{sub}</span>
      </figcaption>
      {legend && (
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-q-muted" aria-hidden>
          {legend.map((l) => (
            <span key={l.label} className="inline-flex items-center gap-2">{sw(l.kind)}{l.label}</span>
          ))}
        </div>
      )}
      {children}
    </figure>
  );
}

export function Pair({ left, right }: { left: { title: string; node: ReactNode }; right: { title: string; node: ReactNode } }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[left, right].map((x) => (
        <div key={x.title} className="flex min-w-0 flex-col gap-1">
          <span className="text-[13px] font-semibold">{x.title}</span>
          {x.node}
        </div>
      ))}
    </div>
  );
}

const clean = (s: string | number) => String(s).replace(/&ndash;/g, "–").replace(/&minus;/g, "−");

export function StatsTable({ table }: { table: { head: string[]; rows: (string | number)[][] } }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-q-edge">
      <table className="w-full border-collapse text-[14px] [font-variant-numeric:tabular-nums]">
        <thead>
          <tr className="bg-q-band">
            {table.head.map((h, i) => (
              <th key={h} className={`border-b border-q-line px-3.5 py-2.5 text-[12px] font-semibold text-q-fg ${i ? "text-right" : "text-left"}`}>{clean(h)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, k) => (
            <tr key={k} className="border-b border-q-line last:border-0">
              {r.map((c, i) => (
                <td key={i} className={`px-3.5 py-2.5 ${i ? "whitespace-nowrap text-right font-mono text-[13px] text-q-body2" : "min-w-[150px] text-q-fg"}`}>{clean(c)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Spec({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="grid gap-x-6 gap-y-2.5 rounded-xl border border-q-edge bg-q-band p-[clamp(14px,2vw,20px)] text-[14.5px] sm:grid-cols-[120px_minmax(0,1fr)]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="font-mono text-[12px] uppercase tracking-[0.08em] text-q-muted sm:pt-0.5">{k}</dt>
          <dd className="mb-2 leading-[1.6] text-q-body2 sm:mb-0">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Steps({ items }: { items: { title: string; text: ReactNode }[] }) {
  return (
    <ol className="flex flex-col border-t border-q-line">
      {items.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-b border-q-line py-4">
          <span className="font-mono text-[15px] text-q-blue">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <div className="text-[16.5px] font-bold tracking-[-0.01em]">{s.title}</div>
            <p className="mt-1 text-[15px] leading-[1.65] text-q-body2">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Verdict({ items }: { items: { k: string; v: string; n: string }[] }) {
  return (
    <dl className="grid overflow-hidden rounded-xl border border-q-edge sm:grid-cols-3">
      {items.map((x, i) => (
        <div key={x.k} className={`flex flex-col gap-1.5 p-5 ${i ? "border-t border-q-edge sm:border-l sm:border-t-0" : ""}`}>
          <dt className="text-[13px] font-semibold text-q-fg">{x.k}</dt>
          <dd className={`font-mono text-[30px] tracking-[-0.03em] ${i === 0 ? "text-q-blue" : ""}`}>{x.v}</dd>
          <dd className="text-[13px] leading-[1.5] text-q-muted">{x.n}</dd>
        </div>
      ))}
    </dl>
  );
}

// What the past showed and what came next, for each look back: two dots joined by a line.
export function Dumbbell({ looks }: { looks: { name: string; seen: number; got: number }[] }) {
  const lo = -0.02, hi = 0.04, pos = (v: number) => ((v - lo) / (hi - lo)) * 100;
  const tick = [-0.02, -0.01, 0, 0.01, 0.02, 0.03, 0.04];
  const f = (v: number) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(3);
  return (
    <div className="flex flex-col pr-5" role="img" aria-label="Whatever the look back, the 20 rules picked made money over their look back and lost the year after.">
      {looks.map((l) => {
        const story = l.name === "2 years" || l.name === "10 years";
        const [a, b] = [pos(l.seen), pos(l.got)].sort((x, y) => x - y);
        return (
          <div key={l.name} className="grid grid-cols-[72px_minmax(0,1fr)] items-center sm:grid-cols-[88px_minmax(0,1fr)]">
            <div className={`text-[13px] ${story ? "font-semibold text-q-fg" : "text-q-muted"}`}>{l.name}</div>
            <div className={`relative ${story ? "h-[50px]" : "h-[34px]"}`}>
              {tick.map((t) => <span key={t} className={`absolute inset-y-0 w-px ${t === 0 ? "bg-q-faint2" : "bg-q-line"}`} style={{ left: `${pos(t)}%` }} />)}
              <span className="absolute top-1/2 -mt-px h-0.5 bg-q-edge2" style={{ left: `${a}%`, width: `${b - a}%` }} />
              <span className="absolute top-1/2 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full ring-2 ring-q-card" style={{ left: `${pos(l.seen)}%`, background: S1 }} title={`${l.name}: ${f(l.seen)} over its look back`} />
              <span className="absolute top-1/2 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full ring-2 ring-q-card" style={{ left: `${pos(l.got)}%`, background: S2 }} title={`${l.name}: ${f(l.got)} the year after`} />
              {story && (
                <>
                  <span className="absolute top-0.5 -translate-x-1/2 font-mono text-[11.5px] text-q-fg" style={{ left: `${pos(l.seen)}%` }}>{f(l.seen)}</span>
                  <span className="absolute bottom-0.5 -translate-x-1/2 font-mono text-[11.5px] text-q-fg" style={{ left: `${pos(l.got)}%` }}>{f(l.got)}</span>
                </>
              )}
            </div>
          </div>
        );
      })}
      <div className="grid grid-cols-[72px_minmax(0,1fr)] sm:grid-cols-[88px_minmax(0,1fr)]">
        <div />
        <div className="relative h-6 border-t border-q-edge2">
          {tick.map((t) => (
            <span key={t} className="absolute top-1.5 -translate-x-1/2 font-mono text-[11px] text-q-muted" style={{ left: `${pos(t)}%` }}>
              {t === 0 ? "0" : (t > 0 ? "+" : "−") + Math.abs(t).toFixed(2)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Plain-language meanings of the terms a report uses, shown before the results.
export function Glossary({ items }: { items: [string, string][] }) {
  return (
    <dl className="grid gap-x-6 gap-y-3 border-t border-q-line pt-4 text-[15px] sm:grid-cols-[170px_minmax(0,1fr)]">
      {items.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="font-semibold text-q-fg">{k}</dt>
          <dd className="mb-2 leading-[1.6] text-q-body2 sm:mb-0">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

// The terms every report uses, in plain words. Shown in each report's "How to read this report".
export const readingTerms: [string, string][] = [
  ["Normal day", "A market's normal daily move. I measure every trade against it, so +0.10 means a tenth of a normal day. That puts different markets on one scale."],
  ["R", "For a trade with a stop: its profit divided by the distance to its stop. +1R is a win the size of the risk taken."],
  ["% of the account", "What the result would be if each trade were sized so a normal day's move is 1% of your account. A fixed, modest size, not a recommendation."],
  ["t", "How sure we can be the result isn't luck. Around 2 is common by chance when you test many ideas; I want above 3."],
  ["Random histories", "The same strategy with its entries moved to random times: same market, same months, same direction, same costs. If the real strategy can't beat them, its timing adds nothing."],
  ["Simulated years", "A year built by drawing the strategy's own past trading days at random, done 10,000 times: the spread of good and bad years, and how deep the drawdowns go."],
  ["Drawdown", "How far the running total falls from its last high before it recovers."],
  ["Breaks even at", "The round-trip cost per trade, in pips or points, at which the strategy stops making money. Compare it with what your broker charges."],
];

// A short card per idea: what it is, where it was tested, its key numbers and its verdict.
export function IdeaCards({ items }: { items: { title: string; data: string; stats: [string, string][]; verdict: string; pass?: boolean }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.title} className="flex flex-col gap-3 rounded-xl border border-q-edge bg-q-card p-4">
          <div className="flex items-start justify-between gap-3">
            <span className="text-[15px] font-bold leading-[1.35] tracking-[-0.01em]">{it.title}</span>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] ${it.pass ? "bg-[rgba(242,184,75,.14)] text-q-amber" : "bg-[rgba(240,113,120,.12)] text-q-rose"}`}>
              {it.verdict}
            </span>
          </div>
          <span className="text-[13px] text-q-muted">{it.data}</span>
          <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-q-line pt-3">
            {it.stats.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] text-q-muted">{k}</dt>
                <dd className="font-mono text-[14px]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
