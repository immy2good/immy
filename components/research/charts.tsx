"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Charts for the research reports, drawn as SVG at the width of their box so text stays legible on a phone.
// Series 1 (the rule) is the site blue; series 2 (random trades, drawdowns) is amber.
const C = {
  s1: "#4d8dff",
  s2: "#f2b84b",
  s1Wash: "rgba(77,141,255,0.16)",
  s2Wash: "rgba(242,184,75,0.16)",
  grid: "#1c1f24",
  axis: "#2a2e35",
  text: "#f2f2f0",
  muted: "#8a8f98",
  faint: "#6b7079",
  shade: "rgba(255,255,255,0.035)",
};

const sgn = (v: number) => (v > 0 ? "+" : v < 0 ? "−" : "");
export const num = (v: number, d = 2) => sgn(v) + Math.abs(v).toFixed(d);
export const pct = (v: number, d = 1) => num(v, d) + "%";

function ticks(min: number, max: number, n: number) {
  const span = max - min || 1;
  const mag = Math.pow(10, Math.floor(Math.log10(span / n)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= n) ?? 10 * mag;
  const out: number[] = [];
  for (let v = Math.ceil(min / step - 1e-9) * step; v <= max + 1e-9; v += step) out.push(+v.toFixed(10));
  return out;
}

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(720);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(260, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

type Frame = { W: number; H: number; x0: number; x1: number; y0: number; y1: number };

function Svg({ f, label, children }: { f: Frame; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${f.W} ${f.H}`} width="100%" role="img" aria-label={label} className="block overflow-visible">
      {children}
    </svg>
  );
}

function T({ x, y, children, anchor = "middle", size = 11, color = C.muted, weight = 400 }: {
  x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; size?: number; color?: string; weight?: number;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={color} fontWeight={weight} fontFamily="var(--font-mono), monospace">
      {children}
    </text>
  );
}

function line(pts: [number, number][]) {
  return pts.filter(([, y]) => Number.isFinite(y)).map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

function band(top: [number, number][], bot: [number, number][]) {
  return line(top) + " " + [...bot].reverse().map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + " Z";
}

function barPath(x: number, w: number, y: number, y0: number) {
  const h = Math.abs(y0 - y), r = Math.min(3, h, w / 2);
  if (h < 0.5) return "";
  return y <= y0
    ? `M${x},${y0} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y0} Z`
    : `M${x},${y0} L${x},${y - r} Q${x},${y} ${x + r},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y - r} L${x + w},${y0} Z`;
}

const frame = (W: number, H: number, m: { l: number; r: number; t: number; b: number }): Frame => ({
  W, H, x0: m.l, x1: W - m.r, y0: H - m.b, y1: m.t,
});

type Hist = { edges: number[]; counts: number[] };
export type RandomRun = { rule: number; random: number; beats: number; runs: number; hist: Hist };

// Monte Carlo 1: the rule against random histories of the same shape.
export function Histogram({ R, label = "The rule" }: { R: RandomRun; label?: string }) {
  const [ref, W] = useWidth();
  const f = frame(W, W < 480 ? 220 : 250, { l: 44, r: 14, t: 30, b: 34 });
  const e = R.hist.edges, c = R.hist.counts;
  const xmin = e[0], xmax = e[e.length - 1], ymax = Math.max(...c) * 1.35;
  const X = (v: number) => f.x0 + ((v - xmin) / (xmax - xmin)) * (f.x1 - f.x0);
  const Y = (v: number) => f.y0 - (v / ymax) * (f.y0 - f.y1);
  const xr = X(R.rule), right = xr > (f.x0 + f.x1) / 2;
  return (
    <div ref={ref}>
      <Svg f={f} label={`${R.runs.toLocaleString("en-US")} random histories averaged ${num(R.random, 3)}; the rule made ${num(R.rule, 3)} and beat ${(R.beats * 100).toFixed(1)}% of them.`}>
        {ticks(0, ymax, 4).map((v) => (
          <g key={v}>
            <line x1={f.x0} x2={f.x1} y1={Y(v)} y2={Y(v)} stroke={C.grid} />
            <T x={f.x0 - 8} y={Y(v) + 4} anchor="end">{v.toLocaleString("en-US")}</T>
          </g>
        ))}
        {ticks(xmin, xmax, W < 480 ? 4 : 6).map((v) => <T key={v} x={X(v)} y={f.y0 + 18}>{num(v)}</T>)}
        <line x1={f.x0} x2={f.x1} y1={f.y0} y2={f.y0} stroke={C.axis} />
        {c.map((n, i) => (
          <path key={i} d={barPath(X(e[i]) + 1, Math.max(1, X(e[i + 1]) - X(e[i]) - 2), Y(n), f.y0)} fill={C.s2}>
            <title>{`${num(e[i], 3)} to ${num(e[i + 1], 3)}: ${n.toLocaleString("en-US")} random histories`}</title>
          </path>
        ))}
        <line x1={xr} x2={xr} y1={f.y1 - 8} y2={f.y0} stroke={C.s1} strokeWidth={2.5} strokeLinecap="round" />
        <T x={xr + (right ? -6 : 6)} y={f.y1 - 12} anchor={right ? "end" : "start"} size={12} weight={600} color={C.text}>
          {label} {num(R.rule, 3)}
        </T>
      </Svg>
    </div>
  );
}

export type Equity = { date: string[]; cum: number[]; dd: number[] };

// Running total in % of the account with the drawdown below it; the last two years shaded.
export function EquityChart({ E, shadeFrom = "2024-10-01" }: { E: Equity; shadeFrom?: string }) {
  const [ref, W] = useWidth();
  const f = frame(W, W < 480 ? 300 : 340, { l: 46, r: 14, t: 12, b: 28 });
  const ddH = Math.round((f.y0 - f.y1) * 0.26);
  const top = { y0: f.y0 - ddH - 14, y1: f.y1 }, dd = { y0: f.y0, y1: f.y0 - ddH };
  const tm = E.date.map((s) => Date.parse(s + "T00:00:00Z")), n = tm.length;
  const X = (t: number) => f.x0 + ((t - tm[0]) / (tm[n - 1] - tm[0])) * (f.x1 - f.x0);
  const cmax = Math.max(...E.cum, 0), cmin = Math.min(...E.cum, 0), dmin = Math.min(...E.dd);
  const Yc = (v: number) => top.y0 - ((v - cmin) / (cmax - cmin || 1)) * (top.y0 - top.y1);
  const Yd = (v: number) => dd.y1 + (v / (dmin || -1)) * (dd.y0 - dd.y1);
  const xs = X(Date.parse(shadeFrom + "T00:00:00Z"));
  const y0 = new Date(tm[0]).getUTCFullYear(), y1 = new Date(tm[n - 1]).getUTCFullYear();
  const every = W < 480 ? (y1 - y0 > 12 ? 6 : 4) : y1 - y0 > 12 ? 3 : 2;
  const years: number[] = [];
  for (let y = Math.ceil(y0 / every) * every; y <= y1; y += every) if (Date.UTC(y, 0, 1) >= tm[0]) years.push(y);
  return (
    <div ref={ref}>
      <Svg f={f} label={`Running total from ${E.date[0]} to ${E.date[n - 1]}: ${pct(E.cum[n - 1])}; deepest drawdown ${pct(dmin)}.`}>
        <rect x={xs} y={f.y1} width={f.x1 - xs} height={f.y0 - f.y1} fill={C.shade} />
        <T x={xs + 4} y={top.y0 - 6} anchor="start" size={10.5}>Last two years</T>
        {ticks(cmin, cmax, 4).map((v) => (
          <g key={"c" + v}>
            <line x1={f.x0} x2={f.x1} y1={Yc(v)} y2={Yc(v)} stroke={v === 0 ? C.axis : C.grid} />
            <T x={f.x0 - 8} y={Yc(v) + 4} anchor="end">{sgn(v) + Math.abs(v) + "%"}</T>
          </g>
        ))}
        {ticks(dmin, 0, 2).map((v) => (
          <g key={"d" + v}>
            <line x1={f.x0} x2={f.x1} y1={Yd(v)} y2={Yd(v)} stroke={v === 0 ? C.axis : C.grid} />
            <T x={f.x0 - 8} y={Yd(v) + 4} anchor="end">{sgn(v) + Math.abs(v) + "%"}</T>
          </g>
        ))}
        {years.map((y) => <T key={y} x={X(Date.UTC(y, 0, 1))} y={f.y0 + 18}>{y}</T>)}
        <path d={band(tm.map((t) => [X(t), Yd(0)]), tm.map((t, i) => [X(t), Yd(E.dd[i])]))} fill={C.s2Wash} />
        <path d={line(tm.map((t, i) => [X(t), Yd(E.dd[i])]))} fill="none" stroke={C.s2} strokeWidth={1.25} />
        <path d={line(tm.map((t, i) => [X(t), Yc(E.cum[i])]))} fill="none" stroke={C.s1} strokeWidth={2} strokeLinejoin="round" />
        <T x={f.x0 + 4} y={dd.y1 - 4} anchor="start" size={10.5}>Drawdown</T>
      </Svg>
    </div>
  );
}

export type Years = { year: number[]; pnl: number[]; days: number[] };

// Calendar years as bars, in % of the account.
export function YearBars({ Y, unit = "%" }: { Y: Years; unit?: string }) {
  const u = (v: number, d = 1) => num(v, d) + unit;
  const [ref, W] = useWidth();
  const f = frame(W, W < 480 ? 200 : 220, { l: 40, r: 10, t: 18, b: 26 });
  const vals = Y.pnl, lo = Math.min(0, ...vals), hi = Math.max(0, ...vals), pad = (hi - lo) * 0.12;
  const base = lo - (lo < 0 ? pad : 0);
  const Yv = (v: number) => f.y0 - ((v - base) / (hi + pad - base)) * (f.y0 - f.y1);
  const bandW = (f.x1 - f.x0) / vals.length, w = Math.min(22, bandW - 4);
  return (
    <div ref={ref}>
      <Svg f={f} label={"By calendar year: " + Y.year.map((y, i) => `${y} ${u(vals[i])}`).join(", ")}>
        {ticks(lo, hi, 4).map((v) => (
          <g key={v}>
            <line x1={f.x0} x2={f.x1} y1={Yv(v)} y2={Yv(v)} stroke={v === 0 ? C.axis : C.grid} />
            <T x={f.x0 - 7} y={Yv(v) + 4} anchor="end">{sgn(v) + Math.abs(v) + unit}</T>
          </g>
        ))}
        {vals.map((v, i) => {
          const x = f.x0 + bandW * i + (bandW - w) / 2;
          return (
            <g key={Y.year[i]}>
              <path d={barPath(x, w, Yv(v), Yv(0))} fill={v >= 0 ? C.s1 : C.s2}>
                <title>{`${Y.year[i]}${Y.year[i] === 2026 ? " to September" : ""}: ${u(v, 2)}${unit === "%" ? " of the account" : ""}, ${Y.days[i]} trading days`}</title>
              </path>
              {(W >= 480 || i % 2 === 0) && (
                <T x={x + w / 2} y={f.y0 + 17} size={10.5}>{W < 480 ? "'" + String(Y.year[i]).slice(2) : Y.year[i]}</T>
              )}
            </g>
          );
        })}
      </Svg>
    </div>
  );
}

export type MonteCarlo = {
  n: number; runs: number; p_loss: number;
  pct: Record<"5" | "25" | "50" | "75" | "95", number[]>;
  paths: number[][];
  final: Record<string, number>;
  dd: Record<string, number>;
  dd_hist: Hist;
};

// Monte Carlo 2: simulated years drawn from the strategy's own days.
export function Fan({ M }: { M: MonteCarlo }) {
  const [ref, W] = useWidth();
  const f = frame(W, W < 480 ? 240 : 270, { l: 44, r: 14, t: 14, b: 30 });
  const n = M.pct["50"].length - 1;
  const all = [...M.pct["5"], ...M.pct["95"], ...M.paths.flat()];
  const lo = Math.min(0, ...all), hi = Math.max(...all);
  const X = (i: number) => f.x0 + (i / n) * (f.x1 - f.x0), Y = (v: number) => f.y0 - ((v - lo) / (hi - lo)) * (f.y0 - f.y1);
  const idx = Array.from({ length: n + 1 }, (_, i) => i);
  const pts = (a: number[]) => idx.map((i) => [X(i), Y(a[i])] as [number, number]);
  return (
    <div ref={ref}>
      <Svg f={f} label={`${M.runs.toLocaleString("en-US")} simulated years of ${M.n} trading days: median ${pct(M.final["50"])}, 90% between ${pct(M.final["5"])} and ${pct(M.final["95"])}; ${(M.p_loss * 100).toFixed(1)}% end below zero.`}>
        {ticks(lo, hi, 5).map((v) => (
          <g key={v}>
            <line x1={f.x0} x2={f.x1} y1={Y(v)} y2={Y(v)} stroke={v === 0 ? C.axis : C.grid} />
            <T x={f.x0 - 8} y={Y(v) + 4} anchor="end">{sgn(v) + Math.abs(v) + "%"}</T>
          </g>
        ))}
        {ticks(0, n, W < 480 ? 4 : 6).map((v) => <T key={v} x={X(v)} y={f.y0 + 18}>{v}</T>)}
        <path d={band(pts(M.pct["95"]), pts(M.pct["5"]))} fill={C.s1Wash} />
        <path d={band(pts(M.pct["75"]), pts(M.pct["25"]))} fill={C.s1Wash} />
        {M.paths.map((p, k) => (
          <path key={k} d={line(p.map((v, i) => [X(i), Y(v)]))} fill="none" stroke={C.s1} strokeOpacity={0.22} strokeWidth={1} />
        ))}
        <path d={line(pts(M.pct["50"]))} fill="none" stroke={C.s1} strokeWidth={2.5} />
        <T x={(f.x0 + f.x1) / 2} y={f.H - 2} size={10.5}>Trading days into the year</T>
      </Svg>
    </div>
  );
}

// A plain histogram for one series: drawdowns of the simulated years, or single sessions' results.
export function Dist({ H: h, xlab, color = "s2", digits = 0, suffix = "%", mark }: {
  H: Hist; xlab: string; color?: "s1" | "s2"; digits?: number; suffix?: string; mark?: { x: number; label: string };
}) {
  const fmt = (v: number) => num(v, digits) + suffix;
  const [ref, W] = useWidth();
  const f = frame(W, W < 480 ? 200 : 220, { l: 44, r: 14, t: 12, b: 34 });
  const e = h.edges, c = h.counts, xmin = e[0], xmax = e[e.length - 1], ymax = Math.max(...c) * 1.15;
  const X = (v: number) => f.x0 + ((v - xmin) / (xmax - xmin)) * (f.x1 - f.x0), Y = (v: number) => f.y0 - (v / ymax) * (f.y0 - f.y1);
  return (
    <div ref={ref}>
      <Svg f={f} label={xlab}>
        {ticks(0, ymax, 3).map((v) => (
          <g key={v}>
            <line x1={f.x0} x2={f.x1} y1={Y(v)} y2={Y(v)} stroke={C.grid} />
            <T x={f.x0 - 8} y={Y(v) + 4} anchor="end">{v.toLocaleString("en-US")}</T>
          </g>
        ))}
        {mark && <rect x={X(mark.x)} y={f.y1} width={f.x1 - X(mark.x)} height={f.y0 - f.y1} fill={C.s1Wash} />}
        {ticks(xmin, xmax, W < 480 ? 4 : 6).map((v) => <T key={v} x={X(v)} y={f.y0 + 17}>{fmt(v)}</T>)}
        <line x1={f.x0} x2={f.x1} y1={f.y0} y2={f.y0} stroke={C.axis} />
        {c.map((n, i) => (
          <path key={i} d={barPath(X(e[i]) + 0.75, Math.max(1, X(e[i + 1]) - X(e[i]) - 1.5), Y(n), f.y0)} fill={C[color]}>
            <title>{`${fmt(e[i])} to ${fmt(e[i + 1])}: ${n.toLocaleString("en-US")}`}</title>
          </path>
        ))}
        {mark && (
          <>
            <line x1={X(mark.x)} x2={X(mark.x)} y1={f.y1} y2={f.y0} stroke={C.s1} strokeWidth={2} />
            <T x={X(mark.x) + 6} y={f.y1 + 12} anchor="start" size={12} weight={600} color={C.text}>{mark.label}</T>
          </>
        )}
        <T x={(f.x0 + f.x1) / 2} y={f.H - 2} size={10.5}>{xlab}</T>
      </Svg>
    </div>
  );
}

export type CostCurve = { cost: number[]; t: (number | null)[]; mean: (number | null)[] };

// t as the round-trip cost rises: where it falls through 3 (the bar) and through 0 (break-even).
export function CostChart({ C: cc, unit, marks = [] }: { C: CostCurve; unit: string; marks?: { x: number; label: string; row?: number }[] }) {
  const [ref, W] = useWidth();
  const f = frame(W, W < 480 ? 220 : 240, { l: 36, r: 14, t: 16, b: 34 });
  const x = cc.cost, y = cc.t.map((v) => v ?? NaN), xmax = x[x.length - 1];
  const fin = y.filter(Number.isFinite);
  const lo = Math.min(-1, ...fin), hi = Math.max(4, ...fin);
  const X = (v: number) => f.x0 + (v / xmax) * (f.x1 - f.x0), Y = (v: number) => f.y0 - ((v - lo) / (hi - lo)) * (f.y0 - f.y1);
  return (
    <div ref={ref}>
      <Svg f={f} label={`t falls as the round-trip cost rises from 0 to ${xmax} ${unit}.`}>
        {ticks(lo, hi, 5).map((v) => (
          <g key={v}>
            <line x1={f.x0} x2={f.x1} y1={Y(v)} y2={Y(v)} stroke={v === 0 ? C.axis : C.grid} />
            <T x={f.x0 - 7} y={Y(v) + 4} anchor="end">{v}</T>
          </g>
        ))}
        {ticks(0, xmax, W < 480 ? 4 : 6).map((v) => <T key={v} x={X(v)} y={f.y0 + 17}>{v}</T>)}
        <line x1={f.x0} x2={f.x1} y1={Y(3)} y2={Y(3)} stroke={C.faint} />
        <T x={f.x1 - 2} y={Y(3) - 5} anchor="end" size={10.5}>t = 3, the bar</T>
        {marks.map((m) => (
          <g key={m.label}>
            <line x1={X(m.x)} x2={X(m.x)} y1={f.y1} y2={f.y0} stroke={C.axis} />
            <T x={X(m.x) + 4} y={f.y1 + 10 + (m.row ?? 0) * 13} anchor="start" size={10.5} color={C.text}>{m.label}</T>
          </g>
        ))}
        <path d={line(x.map((v, i) => [X(v), Y(y[i])]))} fill="none" stroke={C.s1} strokeWidth={2.25} />
        <T x={(f.x0 + f.x1) / 2} y={f.H - 2} size={10.5}>All-in round-trip cost, {unit}</T>
      </Svg>
    </div>
  );
}

export type Profile = {
  minutes: number[];
  gotobi: { days: number; mean: number[]; lo: number[]; hi: number[] };
  other: { days: number; mean: number[] };
};

// The average gotobi morning against other mornings, 03:00 to 12:00 Tokyo.
export function ProfileChart({ P }: { P: Profile }) {
  const [ref, W] = useWidth();
  const f = frame(W, W < 480 ? 240 : 270, { l: 46, r: 14, t: 18, b: 34 });
  const m = P.minutes, n = m.length;
  const all = [...P.gotobi.lo, ...P.gotobi.hi, ...P.other.mean];
  const lo0 = Math.min(...all), hi0 = Math.max(...all), pad = (hi0 - lo0) * 0.1, lo = lo0 - pad, hi = hi0 + pad;
  const X = (v: number) => f.x0 + (v / m[n - 1]) * (f.x1 - f.x0), Y = (v: number) => f.y0 - ((v - lo) / (hi - lo)) * (f.y0 - f.y1);
  const fix = m.indexOf(415);
  const hhmm = (v: number) => String(3 + Math.floor(v / 60)).padStart(2, "0") + ":" + String(v % 60).padStart(2, "0");
  return (
    <div ref={ref}>
      <Svg f={f} label={`On gotobi days USDJPY rises ${num(P.gotobi.mean[fix], 3)} of a normal day from 03:00 to the 09:55 fix and gives part back by noon; other days ${num(P.other.mean[fix], 3)}.`}>
        {ticks(lo, hi, 4).map((v) => (
          <g key={v}>
            <line x1={f.x0} x2={f.x1} y1={Y(v)} y2={Y(v)} stroke={v === 0 ? C.axis : C.grid} />
            <T x={f.x0 - 8} y={Y(v) + 4} anchor="end">{num(v)}</T>
          </g>
        ))}
        {[0, 120, 240, 360, 415, 540].filter((v) => W >= 480 || v % 240 === 0 || v === 415).map((v) => (
          <T key={v} x={X(v)} y={f.y0 + 17}>{hhmm(v)}</T>
        ))}
        <line x1={X(415)} x2={X(415)} y1={f.y1} y2={f.y0} stroke={C.axis} />
        <T x={X(415) - 5} y={f.y1 + 2} anchor="end" size={10.5} color={C.text}>09:55 fix</T>
        <path d={band(m.map((v, i) => [X(v), Y(P.gotobi.hi[i])]), m.map((v, i) => [X(v), Y(P.gotobi.lo[i])]))} fill={C.s1Wash} />
        <path d={line(m.map((v, i) => [X(v), Y(P.other.mean[i])]))} fill="none" stroke={C.s2} strokeWidth={2} />
        <path d={line(m.map((v, i) => [X(v), Y(P.gotobi.mean[i])]))} fill="none" stroke={C.s1} strokeWidth={2.5} />
        <T x={(f.x0 + f.x1) / 2} y={f.H - 2} size={10.5}>Tokyo time</T>
      </Svg>
    </div>
  );
}

export type Edge = { year: number[]; gross_pips: number[]; fee_pips: number[]; swap_pips: number[]; trades: number[] };

// Pips a trade before costs by year, against what the broker takes.
export function EdgeChart({ Eg }: { Eg: Edge }) {
  const [ref, W] = useWidth();
  const f = frame(W, W < 480 ? 220 : 240, { l: 40, r: 12, t: 16, b: 26 });
  const v = Eg.gross_pips, c = Eg.fee_pips.map((x, i) => x - Eg.swap_pips[i]);
  const hi = Math.max(...v, ...c) * 1.1, lo = Math.min(0, ...v);
  const Y = (x: number) => f.y0 - ((x - lo) / (hi - lo)) * (f.y0 - f.y1);
  const bw = (f.x1 - f.x0) / v.length, w = Math.min(20, bw - 3);
  return (
    <div ref={ref}>
      <Svg f={f} label={`Pips a trade before costs fell from ${v[1].toFixed(1)} to ${v[v.length - 1].toFixed(1)} while costs stayed near ${c[c.length - 1].toFixed(1)}.`}>
        {ticks(lo, hi, 4).map((x) => (
          <g key={x}>
            <line x1={f.x0} x2={f.x1} y1={Y(x)} y2={Y(x)} stroke={x === 0 ? C.axis : C.grid} />
            <T x={f.x0 - 7} y={Y(x) + 4} anchor="end">{x}</T>
          </g>
        ))}
        {v.map((x, i) => {
          const bx = f.x0 + bw * i + (bw - w) / 2;
          return (
            <g key={Eg.year[i]}>
              <path d={barPath(bx, w, Y(x), Y(0))} fill={C.s1}>
                <title>{`${Eg.year[i]}, ${Eg.trades[i]} trades: ${x.toFixed(2)} pips before costs, ${c[i].toFixed(2)} in costs`}</title>
              </path>
              {i % (W < 480 ? 4 : 2) === 0 && (
                <T x={bx + w / 2} y={f.y0 + 17} size={10.5}>{W < 480 ? "'" + String(Eg.year[i]).slice(2) : Eg.year[i]}</T>
              )}
            </g>
          );
        })}
        <path d={line(c.map((x, i) => [f.x0 + bw * (i + 0.5), Y(x)]))} fill="none" stroke={C.s2} strokeWidth={2.25} />
      </Svg>
    </div>
  );
}

export type Sides = Record<"longs" | "shorts", { trades: number; rule: number; random: number; rule_win: number; random_win: number }>;

// R per trade by side: the rule beside random trades with the same side, stop and target.
export function SideBars({ S }: { S: Sides }) {
  const [ref, W] = useWidth();
  const f = frame(W, W < 480 ? 240 : 260, { l: 52, r: 16, t: 24, b: 40 });
  const cats = [["Longs", S.longs], ["Shorts", S.shorts]] as const;
  const vals = cats.flatMap(([, s]) => [s.rule, s.random]);
  const ymin = Math.min(0, ...vals) * 1.2, ymax = Math.max(0, ...vals) * 1.35 + 0.01;
  const Y = (v: number) => f.y0 - ((v - ymin) / (ymax - ymin)) * (f.y0 - f.y1);
  const band = (f.x1 - f.x0) / 2, bw = Math.min(38, band / 5), gap = W < 520 ? 16 : 8;
  return (
    <div ref={ref}>
      <Svg f={f} label={`Longs: rule ${num(S.longs.rule, 3)}R, random ${num(S.longs.random, 3)}R. Shorts: rule ${num(S.shorts.rule, 3)}R, random ${num(S.shorts.random, 3)}R.`}>
        {ticks(ymin, ymax, 5).map((v) => (
          <g key={v}>
            <line x1={f.x0} x2={f.x1} y1={Y(v)} y2={Y(v)} stroke={v === 0 ? C.axis : C.grid} />
            <T x={f.x0 - 8} y={Y(v) + 4} anchor="end">{num(v)}</T>
          </g>
        ))}
        {cats.map(([name, s], i) => {
          const cx = f.x0 + band * (i + 0.5);
          return (
            <g key={name}>
              {([["The rule", s.rule, C.s1, s.rule_win], ["Random", s.random, C.s2, s.random_win]] as const).map(([nm, v, col, win], k) => {
                const x = cx + (k === 0 ? -bw - gap / 2 : gap / 2);
                return (
                  <g key={nm}>
                    <path d={barPath(x, bw, Y(v), Y(0))} fill={col}>
                      <title>{`${name}, ${nm.toLowerCase()}: ${num(v, 3)}R a trade, win rate ${(win * 100).toFixed(1)}%, ${s.trades} trades`}</title>
                    </path>
                    <T x={x + bw / 2} y={v >= 0 ? Y(v) - 6 : Y(v) + 15} size={11.5} weight={600} color={C.text}>{num(v, 3)}R</T>
                  </g>
                );
              })}
              <T x={cx} y={f.y0 + 22}>{`${name} (${s.trades} trades)`}</T>
            </g>
          );
        })}
      </Svg>
    </div>
  );
}

export type Cum = { date: string[]; rule: number[]; p5: number[]; p50: number[]; p95: number[] };

// Running total of R, trade by trade, against the middle 90% of random histories.
export function CumBand({ D }: { D: Cum }) {
  const [ref, W] = useWidth();
  const f = frame(W, W < 480 ? 250 : 300, { l: 48, r: 14, t: 16, b: 32 });
  const tm = D.date.map((s) => Date.parse(s + "T00:00:00Z")), n = tm.length;
  const all = [...D.rule, ...D.p5, ...D.p95];
  const lo0 = Math.min(...all), hi0 = Math.max(...all, 0), pad = (hi0 - lo0) * 0.08, lo = lo0 - pad, hi = hi0 + pad;
  const X = (t: number) => f.x0 + ((t - tm[0]) / (tm[n - 1] - tm[0])) * (f.x1 - f.x0);
  const Y = (v: number) => f.y0 - ((v - lo) / (hi - lo)) * (f.y0 - f.y1);
  const y0 = new Date(tm[0]).getUTCFullYear(), y1 = new Date(tm[n - 1]).getUTCFullYear(), every = W < 480 ? 6 : 3;
  const years: number[] = [];
  for (let y = Math.ceil(y0 / every) * every; y <= y1; y += every) if (Date.UTC(y, 0, 1) >= tm[0]) years.push(y);
  const pts = (a: number[]) => tm.map((t, i) => [X(t), Y(a[i])] as [number, number]);
  return (
    <div ref={ref}>
      <Svg f={f} label={`The rule finished at ${num(D.rule[n - 1], 0)}R; the middle of the random histories at ${num(D.p50[n - 1], 0)}R.`}>
        {ticks(lo, hi, 5).map((v) => (
          <g key={v}>
            <line x1={f.x0} x2={f.x1} y1={Y(v)} y2={Y(v)} stroke={v === 0 ? C.axis : C.grid} />
            <T x={f.x0 - 8} y={Y(v) + 4} anchor="end">{num(v, 0)}R</T>
          </g>
        ))}
        {years.map((y) => <T key={y} x={X(Date.UTC(y, 0, 1))} y={f.y0 + 18}>{y}</T>)}
        <path d={band(pts(D.p95), pts(D.p5))} fill={C.s2Wash} />
        <path d={line(pts(D.p50))} fill="none" stroke={C.s2} strokeWidth={2} />
        <path d={line(pts(D.rule))} fill="none" stroke={C.s1} strokeWidth={2} strokeLinejoin="round" />
      </Svg>
    </div>
  );
}

// Bars for named categories (hours of the day, say), with chosen bars in the rule's colour and the rest muted.
export function CategoryBars({ labels, values, unit = "", highlight = [], every = 1, tip }: {
  labels: string[]; values: number[]; unit?: string; highlight?: number[]; every?: number; tip?: (i: number) => string;
}) {
  const [ref, W] = useWidth();
  const f = frame(W, W < 480 ? 210 : 230, { l: 48, r: 10, t: 16, b: 26 });
  const lo = Math.min(0, ...values), hi = Math.max(0, ...values), pad = (hi - lo) * 0.1;
  const Y = (v: number) => f.y0 - ((v - (lo - pad)) / (hi + pad - (lo - pad))) * (f.y0 - f.y1);
  const bw = (f.x1 - f.x0) / values.length, w = Math.min(22, bw - 3);
  const step = W < 480 ? Math.max(every, 3) : every;
  return (
    <div ref={ref}>
      <Svg f={f} label={labels.map((l, i) => `${l} ${num(values[i], 3)}${unit}`).join(", ")}>
        {ticks(lo - pad, hi + pad, 4).map((v) => (
          <g key={v}>
            <line x1={f.x0} x2={f.x1} y1={Y(v)} y2={Y(v)} stroke={v === 0 ? C.axis : C.grid} />
            <T x={f.x0 - 7} y={Y(v) + 4} anchor="end">{num(v, 2) + unit}</T>
          </g>
        ))}
        {values.map((v, i) => {
          const x = f.x0 + bw * i + (bw - w) / 2;
          return (
            <g key={labels[i]}>
              <path d={barPath(x, w, Y(v), Y(0))} fill={highlight.includes(i) ? C.s1 : "#3a4049"}>
                <title>{tip ? tip(i) : `${labels[i]}: ${num(v, 3)}${unit}`}</title>
              </path>
              {i % step === 0 && <T x={x + w / 2} y={f.y0 + 17} size={10.5}>{labels[i]}</T>}
            </g>
          );
        })}
      </Svg>
    </div>
  );
}

export const chartColors = C;
