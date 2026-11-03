"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Diagram, DiagramEdge, Tone } from "@/lib/case-studies";

const TONE: Record<Tone, string> = { blue: "#4d8dff", amber: "#f2b84b", rose: "#f07178", green: "#5fd38d" };
const STEP_MS = 2400;

function labelPosition(edge: DiagramEdge) {
  if (edge.label) return { x: edge.label.x, y: edge.label.y, anchor: edge.label.anchor ?? "middle" };
  const p = edge.path.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const n = p.length;
  const midY = (p[1] + p[n - 1]) / 2;
  if (p[0] === p[n - 2]) return { x: p[0] + 7, y: midY + 4, anchor: "start" as const };
  return { x: (p[0] + p[n - 2]) / 2, y: midY - 5, anchor: "middle" as const };
}

export function CaseStudyDiagram({ diagram: d }: { diagram: Diagram }) {
  const markerId = useId().replace(/:/g, "");
  const journeyNames = Object.keys(d.journeys);
  const boxRef = useRef<HTMLDivElement>(null);

  const [journey, setJourney] = useState(0);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const steps = d.journeys[journeyNames[journey]];
  const current = step >= 0 ? steps[step] : null;
  const activeEdges = new Set(current?.edges ?? []);
  const activeNode = current?.node ?? selected;
  const node = activeNode ? d.nodes[activeNode] : null;

  // Fit the drawing to its box; below 640px a CSS container query swaps it for a list.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, (el.clientWidth - 24) / d.width));
    // Measure now as well: a background tab may not deliver the observer's first callback until it is shown.
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [d.width]);

  // Start playing on load unless the visitor prefers less motion.
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(true);
  }, []);

  // Step through the journey, then move on to the next one and loop.
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(
      () => {
        if (step < steps.length - 1) return setStep((s) => s + 1);
        setJourney((j) => (j + 1) % journeyNames.length);
        setStep(0);
      },
      step < 0 ? 400 : STEP_MS,
    );
    return () => clearTimeout(t);
  }, [playing, step, steps.length, journeyNames.length]);

  const pickNode = (id: string) => {
    setPlaying(false);
    setStep(-1);
    setSelected(id);
  };

  const pickJourney = (i: number) => {
    setJourney(i);
    setStep(-1);
    setSelected(null);
    setPlaying(true);
  };

  const nodeStyle = (id: string, tone: Tone) =>
    id === activeNode ? { borderColor: TONE[tone], background: "#13171d" } : { borderColor: "#2a2e35", background: "#0c0e11" };

  const zoneOf = (x: number) => d.zones.find((z) => x >= z.x - 5 && x < z.x + z.w);

  return (
    <div>
      <div className="mt-9 flex flex-wrap items-center gap-2">
        {journeyNames.map((name, i) => (
          <button
            key={name}
            type="button"
            aria-pressed={i === journey}
            onClick={() => pickJourney(i)}
            className={`flex-none whitespace-nowrap rounded-full border px-4 py-[9px] text-sm font-medium transition-colors ${
              i === journey ? "border-q-blue bg-[#13203a] text-q-fg" : "border-q-edge2 text-q-body2 hover:text-q-fg"
            }`}
          >
            {name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="ml-auto flex-none whitespace-nowrap rounded-full bg-q-blue px-[18px] py-[9px] text-sm font-semibold text-white"
        >
          {playing ? "Pause ❚❚" : "Play ▶"}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-start gap-6">
        <div ref={boxRef} className="dg-box min-w-0 flex-[3_1_640px] overflow-hidden rounded-[14px] border border-q-line bg-q-bg p-3">
          <div className="dg-full relative w-full" style={{ height: d.height * scale }}>
            <div
              className="absolute left-0 top-0 origin-top-left"
              style={{ width: d.width, height: d.height, transform: `scale(${scale})` }}
            >
              {d.zones.map((z) => (
                <div
                  key={z.label}
                  className="absolute rounded-xl border border-dashed"
                  style={{ left: z.x, top: d.zoneTop, width: z.w, height: d.zoneHeight, borderColor: "#2c3139" }}
                >
                  <div
                    className="absolute left-3 top-2 font-mono text-[10px] uppercase tracking-[0.1em]"
                    style={{ color: TONE[z.tone] }}
                  >
                    {z.label}
                  </div>
                </div>
              ))}
              <svg
                className="pointer-events-none absolute inset-0"
                width={d.width}
                height={d.height}
                viewBox={`0 0 ${d.width} ${d.height}`}
                aria-hidden
              >
                <defs>
                  {(["idle", "hot"] as const).map((k) => (
                    <marker
                      key={k}
                      id={`${markerId}-${k}`}
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M0,0 L10,5 L0,10 z" fill={k === "hot" ? "#4d8dff" : "#3a3f48"} />
                    </marker>
                  ))}
                </defs>
                {Object.entries(d.edges).map(([id, e]) => {
                  const hot = activeEdges.has(id);
                  return (
                    <path
                      key={id}
                      d={e.path}
                      fill="none"
                      stroke={hot ? "#4d8dff" : "#3a3f48"}
                      strokeWidth={hot ? 2 : 1.25}
                      markerEnd={`url(#${markerId}-${hot ? "hot" : "idle"})`}
                      className="transition-[stroke] duration-300"
                    />
                  );
                })}
                {Object.entries(d.edges).map(([id, e]) => {
                  if (!e.text) return null;
                  const pos = labelPosition(e);
                  const hot = activeEdges.has(id);
                  return (
                    <text
                      key={id}
                      x={pos.x}
                      y={pos.y}
                      textAnchor={pos.anchor}
                      fill={hot ? "#f2f2f0" : "#8a8f98"}
                      stroke="#08090b"
                      strokeWidth={4}
                      strokeLinejoin="round"
                      style={{ paintOrder: "stroke" }}
                      className="font-mono text-[10px]"
                    >
                      {e.text}
                    </text>
                  );
                })}
              </svg>
              {Object.entries(d.nodes).map(([id, n]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={id === activeNode}
                  onClick={() => pickNode(id)}
                  className="absolute flex flex-col justify-center rounded-[10px] border px-3 py-2 text-left text-q-fg transition-[background,border-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-q-blue"
                  style={{ left: n.x, top: n.y, width: n.w, height: n.h, ...nodeStyle(id, n.tone) }}
                >
                  <span className="text-[13px] font-bold leading-[1.2]">{n.title}</span>
                  <span className="mt-[3px] font-mono text-[10px] leading-[1.3] text-q-muted">{n.sub}</span>
                </button>
              ))}
              <div
                className="absolute right-4 text-xs text-q-muted"
                style={{ left: d.footnote.x, top: d.footnote.y - 10 }}
              >
                {d.footnote.text}
              </div>
            </div>
          </div>

          <div className="dg-list flex-col gap-[18px] p-1.5">
            {d.zones.map((z) => {
              const ids = Object.keys(d.nodes).filter((id) => zoneOf(d.nodes[id].x) === z);
              if (!ids.length) return null;
              return (
                <div key={z.label} className="flex flex-col gap-2">
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: TONE[z.tone] }}>
                    {z.label}
                  </div>
                  {ids.map((id) => {
                    const n = d.nodes[id];
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={id === activeNode}
                        onClick={() => pickNode(id)}
                        className="min-h-[44px] rounded-[10px] border px-3.5 py-3 text-left text-q-fg transition-[background,border-color] duration-200"
                        style={nodeStyle(id, n.tone)}
                      >
                        <div className="text-[15px] font-bold">{n.title}</div>
                        <div className="mt-[3px] font-mono text-xs text-q-muted">{n.sub}</div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
            <p className="text-xs leading-normal text-q-muted">{d.footnote.text}</p>
          </div>
        </div>

        <div className="flex flex-[1_1_300px] flex-col gap-4">
          <div className="rounded-[14px] border border-q-line bg-q-card p-[22px]" aria-live="polite">
            <div
              className="font-mono text-[11px] uppercase tracking-[0.1em]"
              style={{ color: node ? TONE[node.tone] : "#8a8f98" }}
            >
              {node ? node.sub : "Select any box"}
            </div>
            <h3 className="mt-2 text-[19px] font-bold">{node ? node.title : "Each box is a part of the system"}</h3>
            <p className="mt-2.5 text-sm leading-[1.6] text-q-body2">
              {node ? node.detail : "Click one to read what it does and why it was built that way."}
            </p>
          </div>
          <ol className="flex flex-col gap-0.5 rounded-[14px] border border-q-line px-[22px] py-[18px]">
            {steps.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    setSelected(null);
                    setStep(i);
                  }}
                  className={`flex w-full gap-3 py-2 text-left text-sm leading-[1.45] ${i === step ? "text-q-fg" : "text-q-muted hover:text-q-body"}`}
                >
                  <span className={`flex-none pt-px font-mono text-xs ${i <= step ? "text-q-blue" : "text-q-faint"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s.text}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
