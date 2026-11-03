"use client";

import { useEffect, useState } from "react";

// Decorative price tape. The numbers are made up and drift at random; the label says so.
const BASE: [string, number, number][] = [
  ["EURUSD", 1.0842, 5],
  ["GBPUSD", 1.2716, 5],
  ["XAUUSD", 2387.4, 2],
  ["US30", 39112, 0],
  ["NAS100", 18240.5, 1],
  ["GBPJPY", 198.31, 3],
  ["BTCUSD", 67210, 0],
  ["USDJPY", 156.42, 3],
  ["UK100", 8215.6, 1],
  ["GER40", 18490.2, 1],
];

export function Ticker() {
  const [prices, setPrices] = useState(() => BASE.map((b) => b[1]));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setPrices((ps) => ps.map((p) => p * (1 + (Math.random() - 0.5) * 0.0014))),
      2200,
    );
    return () => clearInterval(timer);
  }, []);

  const quotes = BASE.map(([sym, open, digits], i) => {
    const change = ((prices[i] - open) / open) * 100;
    return {
      sym,
      price: prices[i].toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }),
      change: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
      up: change >= 0,
    };
  });

  return (
    <div className="relative flex h-16 items-center overflow-hidden border-y border-q-line bg-q-band font-mono">
      <p className="absolute left-0 top-0 z-[1] flex h-full items-center bg-gradient-to-r from-q-band from-70% to-transparent pl-[clamp(20px,4vw,48px)] pr-10 text-[10px] uppercase tracking-[0.12em] text-q-faint">
        Illustrative,
        <br />
        not live data
      </p>
      <div className="anim-tape flex whitespace-nowrap" aria-hidden>
        {[...quotes, ...quotes].map((q, i) => (
          <span key={i} className="flex items-baseline gap-3 border-r border-q-line px-7">
            <span className="text-xs text-q-muted">{q.sym}</span>
            <span className="text-xl">{q.price}</span>
            <span className={`text-xs ${q.up ? "text-q-green" : "text-q-rose"}`}>{q.change}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
