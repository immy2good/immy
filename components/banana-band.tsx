import Link from "next/link";
import { caseStudies } from "@/lib/case-studies";

const banana = caseStudies.find((s) => s.slug === "banana-ea")!;

const story = [
  {
    title: "Problem",
    text: "One 3,377-line MT4 class, no behaviour tests. Some bugs only showed after a restart: pending orders that never expired, partial closes that fired twice. Porting it as-is would have carried them to MT5.",
  },
  {
    title: "Approach",
    text: "Audit first, then rebuild behind a headless engine suite, with decision traces to diff MT4 and MT5 behaviour bar by bar.",
  },
  {
    title: "Outcome",
    text: "Behaves as well as 6.6 or better, with nothing changed by accident. Risk guards that survive restarts, proof on demo accounts first, and server-side licensing.",
  },
];

export function BananaBand() {
  return (
    <section id="case" className="scroll-mt-[72px] border-t border-q-line bg-q-band">
      <div className="wrap py-[clamp(64px,8vw,104px)]">
        <p className="eyebrow text-q-blue">Case study · Flagship product · MT4 → MT5</p>
        <h2 className="mt-[18px] max-w-[1000px] text-balance text-[clamp(36px,5vw,64px)] font-bold leading-none tracking-[-0.045em]">
          {banana.cardTitle}
        </h2>
        <dl className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] border-t border-q-line">
          {banana.stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse py-6 ${i === 0 ? "pr-6" : "px-6"} ${i < banana.stats.length - 1 ? "border-r border-q-line" : ""}`}
            >
              <dt className="mt-1.5 text-[13px] text-q-muted">{s.label}</dt>
              <dd className={`font-mono text-[44px] tracking-[-0.03em] ${i === 2 ? "text-q-blue" : ""}`}>{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-14 flex flex-wrap items-start gap-10">
          <div className="flex-[7_1_480px] overflow-hidden rounded-[14px] border border-q-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={banana.image!.src}
              alt={banana.image!.alt}
              loading="lazy"
              className="block aspect-[16/10] w-full object-cover object-top"
            />
          </div>
          <div className="grid flex-[5_1_320px] gap-7">
            {story.map((s) => (
              <div key={s.title}>
                <h3 className="text-[13px] font-semibold text-q-blue">{s.title}</h3>
                <p className="mt-2 text-base leading-[1.6] text-q-body2">{s.text}</p>
              </div>
            ))}
            <Link href="/case-studies/banana-ea" className="text-[15px] font-semibold">
              Read the full case study →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
