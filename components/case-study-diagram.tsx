"use client";

import { useEffect, useId, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Diagram, DiagramEdge, Tone } from "@/lib/case-studies";

// Literal class strings so Tailwind keeps them.
const ZONE: Record<Tone, string> = {
  green: "fill-emerald-50/70 stroke-emerald-300 dark:fill-emerald-950/30 dark:stroke-emerald-800",
  amber: "fill-amber-50/70 stroke-amber-300 dark:fill-amber-950/30 dark:stroke-amber-800",
  blue: "fill-sky-50/70 stroke-sky-300 dark:fill-sky-950/30 dark:stroke-sky-800",
  rose: "fill-rose-50/70 stroke-rose-300 dark:fill-rose-950/30 dark:stroke-rose-800",
};
const ZONE_TEXT: Record<Tone, string> = {
  green: "fill-emerald-700 dark:fill-emerald-400",
  amber: "fill-amber-700 dark:fill-amber-400",
  blue: "fill-sky-700 dark:fill-sky-400",
  rose: "fill-rose-700 dark:fill-rose-400",
};
const NODE: Record<Tone, string> = {
  green: "stroke-emerald-600 dark:stroke-emerald-500",
  amber: "stroke-amber-600 dark:stroke-amber-500",
  blue: "stroke-sky-600 dark:stroke-sky-500",
  rose: "stroke-rose-600 dark:stroke-rose-500",
};
const DOT: Record<Tone, string> = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  blue: "bg-sky-500",
  rose: "bg-rose-500",
};

function labelPosition(edge: DiagramEdge) {
  if (edge.label) return { x: edge.label.x, y: edge.label.y, anchor: edge.label.anchor ?? "middle" };
  const p = edge.path.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const n = p.length;
  const midY = (p[1] + p[n - 1]) / 2;
  if (p[0] === p[n - 2]) return { x: p[0] + 7, y: midY + 4, anchor: "start" as const };
  return { x: (p[0] + p[n - 2]) / 2, y: midY - 5, anchor: "middle" as const };
}

export function CaseStudyDiagram({ diagram }: { diagram: Diagram }) {
  const markerId = useId().replace(/:/g, "");
  const journeyNames = Object.keys(diagram.journeys);
  const firstNode = Object.keys(diagram.nodes)[0];

  const [journey, setJourney] = useState(journeyNames[0]);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(firstNode);

  const steps = diagram.journeys[journey];
  const current = step >= 0 ? steps[step] : null;
  const activeEdges = new Set(current?.edges ?? []);
  const activeNode = current?.node ?? selected;

  useEffect(() => {
    if (!playing) return;
    if (step >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), step < 0 ? 0 : 1800);
    return () => clearTimeout(t);
  }, [playing, step, steps.length]);

  useEffect(() => {
    if (current) setSelected(current.node);
  }, [current]);

  const chooseJourney = (name: string) => {
    setJourney(name);
    setStep(-1);
    setPlaying(false);
  };

  const node = diagram.nodes[activeNode];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border bg-card p-3 sm:p-4">
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${diagram.width} ${diagram.height}`}
            className="h-auto w-full min-w-[640px] font-sans"
            role="img"
            aria-label="Architecture diagram. Select a box to read what it does."
          >
            <defs>
              {(["idle", "hot"] as const).map((kind) => (
                <marker
                  key={kind}
                  id={`${markerId}-${kind}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path
                    d="M0,0 L10,5 L0,10 z"
                    className={kind === "hot" ? "fill-amber-500" : "fill-muted-foreground"}
                  />
                </marker>
              ))}
            </defs>

            {diagram.zones.map((z) => (
              <g key={z.label}>
                <rect
                  x={z.x}
                  y={diagram.zoneTop}
                  width={z.w}
                  height={diagram.zoneHeight}
                  rx={12}
                  strokeDasharray="5 4"
                  className={ZONE[z.tone]}
                />
                <text
                  x={z.x + 14}
                  y={diagram.zoneTop + 22}
                  className={cn("text-[11px] font-semibold uppercase tracking-wider", ZONE_TEXT[z.tone])}
                >
                  {z.label}
                </text>
              </g>
            ))}

            {Object.entries(diagram.edges).map(([id, e]) => {
              const hot = activeEdges.has(id);
              return (
                <path
                  key={id}
                  d={e.path}
                  fill="none"
                  strokeWidth={hot ? 2.5 : 1.4}
                  markerEnd={`url(#${markerId}-${hot ? "hot" : "idle"})`}
                  className={cn(
                    "transition-all duration-300",
                    hot ? "stroke-amber-500" : "stroke-muted-foreground/60",
                  )}
                />
              );
            })}

            {Object.entries(diagram.edges).map(([id, e]) => {
              if (!e.text) return null;
              const pos = labelPosition(e);
              const hot = activeEdges.has(id);
              return (
                <text
                  key={id}
                  x={pos.x}
                  y={pos.y}
                  textAnchor={pos.anchor}
                  style={{ paintOrder: "stroke" }}
                  strokeWidth={4}
                  strokeLinejoin="round"
                  className={cn(
                    "stroke-card text-[10.5px]",
                    hot ? "fill-foreground font-semibold" : "fill-muted-foreground",
                  )}
                >
                  {e.text}
                </text>
              );
            })}

            {Object.entries(diagram.nodes).map(([id, n]) => {
              const active = id === activeNode;
              return (
                <g
                  key={id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${n.title}: ${n.sub}`}
                  aria-pressed={active}
                  className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-[3px]"
                  onClick={() => {
                    setSelected(id);
                    setStep(-1);
                    setPlaying(false);
                  }}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                      ev.preventDefault();
                      setSelected(id);
                      setStep(-1);
                      setPlaying(false);
                    }
                  }}
                >
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height={n.h}
                    rx={9}
                    strokeWidth={active ? 2.5 : 1.4}
                    className={cn(
                      "fill-card transition-all duration-300",
                      NODE[n.tone],
                      active && "drop-shadow-md",
                    )}
                  />
                  <text
                    x={n.x + n.w / 2}
                    y={n.y + n.h / 2 - 3}
                    textAnchor="middle"
                    className="fill-foreground text-[13px] font-semibold"
                  >
                    {n.title}
                  </text>
                  <text
                    x={n.x + n.w / 2}
                    y={n.y + n.h / 2 + 14}
                    textAnchor="middle"
                    className="fill-muted-foreground text-[10.5px]"
                  >
                    {n.sub}
                  </text>
                </g>
              );
            })}

            <text
              x={diagram.footnote.x}
              y={diagram.footnote.y}
              className="fill-muted-foreground text-[11px] italic"
            >
              {diagram.footnote.text}
            </text>
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-xl border bg-card p-5" aria-live="polite">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className={cn("h-2 w-2 rounded-full", DOT[node.tone])} />
            Selected component
          </div>
          <h3 className="text-lg font-semibold leading-tight">{node.title}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{node.sub}</p>
          <p className="text-sm leading-relaxed">{node.detail}</p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Walk through a journey
          </div>
          <div className="mb-4 flex flex-wrap gap-1.5" role="tablist">
            {journeyNames.map((name) => (
              <button
                key={name}
                role="tab"
                aria-selected={name === journey}
                onClick={() => chooseJourney(name)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs transition-colors",
                  name === journey
                    ? "border-primary bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {name}
              </button>
            ))}
          </div>

          <ol className="mb-4 space-y-1">
            {steps.map((s, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    setPlaying(false);
                    setStep(i);
                  }}
                  className={cn(
                    "flex w-full gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                    i === step ? "bg-amber-500/10 text-foreground" : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                      i === step && "border-amber-500 bg-amber-500 text-white",
                      i < step && "border-amber-500 text-amber-600 dark:text-amber-400",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="leading-snug">{s.text}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                if (playing) return setPlaying(false);
                if (step >= steps.length - 1) setStep(-1);
                setPlaying(true);
              }}
            >
              {playing ? <Pause className="mr-1.5 h-3.5 w-3.5" /> : <Play className="mr-1.5 h-3.5 w-3.5" />}
              {playing ? "Pause" : "Play"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setPlaying(false);
                setStep(-1);
              }}
              disabled={step < 0}
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
