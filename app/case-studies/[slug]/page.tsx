import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { CaseStudyDiagram } from "@/components/case-study-diagram";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  const title = `${study.short} · Case study · Immy Yousafzai`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title,
      description: study.summary,
      url: `/case-studies/${study.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description: study.summary },
  };
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow text-q-muted">{children}</p>;
}

// Click-to-open row used by decisions and incidents.
function Row({ title, tag, outlined, children }: { title: string; tag: string; outlined?: boolean; children: ReactNode }) {
  return (
    <details className="group border-t border-q-line">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-2 py-5 [&::-webkit-details-marker]:hidden">
        <span className="flex-[1_1_300px] text-lg font-bold tracking-[-0.01em]">{title}</span>
        <span
          className={`rounded-full px-2.5 font-mono text-[11px] text-q-body2 ${outlined ? "border border-q-edge2 py-[3px]" : "bg-q-chip py-1"}`}
        >
          {tag}
        </span>
        <span className="w-4 text-center text-lg text-q-muted" aria-hidden>
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      {children}
    </details>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const h2 = "mt-3.5 text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.05] tracking-[-0.035em]";
  const h2Big = "mt-3.5 text-[clamp(32px,4vw,52px)] font-bold leading-[1.02] tracking-[-0.04em]";

  return (
    <>
      <Header />
      <main>
        <header className="wrap pt-[clamp(40px,6vw,72px)]">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-1.5 text-[13px] text-q-muted">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/#work">Work</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-q-fg" aria-current="page">
                {study.short}
              </li>
            </ol>
          </nav>
          <p className="eyebrow mt-10 text-q-blue">{study.eyebrow}</p>
          <h1 className="mt-5 max-w-[1200px] text-balance text-[clamp(38px,6vw,84px)] font-bold leading-[.98] tracking-[-0.045em]">
            {study.headline}
          </h1>
          <p className="mt-8 max-w-[860px] text-pretty text-[clamp(17px,1.6vw,20px)] leading-[1.6] text-q-body2">
            {study.lede}
          </p>
          <dl className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 border-t border-q-line pb-12 pt-6">
            {study.meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-q-muted">{m.label}</dt>
                <dd className="mt-1.5 text-[15px] leading-normal">{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <section className="border-y border-q-line bg-q-band">
          <dl className="wrap grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
            {study.stats.map((s, i) => (
              <div key={s.label} className="mr-6 flex flex-col-reverse border-r border-q-line py-7 pr-6">
                <dt className="mt-2 text-[13px] leading-[1.45] text-q-muted">{s.label}</dt>
                <dd className={`font-mono text-[clamp(34px,3.6vw,48px)] tracking-[-0.03em] ${i === 0 ? "text-q-blue" : ""}`}>
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="wrap py-[clamp(64px,8vw,104px)]">
          <Eyebrow>The problem</Eyebrow>
          <h2 className={h2Big}>Why this needed building</h2>
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6">
            {[
              { title: study.problem.wrongTitle, items: study.problem.wrong, dot: "bg-q-rose" },
              { title: study.problem.neededTitle, items: study.problem.needed, dot: "bg-q-green" },
            ].map((col) => (
              <div key={col.title} className="rounded-[14px] border border-q-line bg-q-card p-7">
                <h3 className="text-lg font-bold">{col.title}</h3>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-3.5 text-[15px] leading-[1.6] text-q-body2">
                      <span className={`mt-[9px] h-1.5 w-1.5 flex-none rounded-full ${col.dot}`} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-q-line bg-q-band">
          <div className="wrap py-[clamp(64px,8vw,104px)]">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <div>
                <Eyebrow>Architecture</Eyebrow>
                <h2 className={h2Big}>How it fits together</h2>
              </div>
              <p className="flex-[0_1_420px] text-[15px] leading-[1.55] text-q-muted">
                Select a box to see what it does, or pick a journey and press Play to follow it step by step.
              </p>
            </div>
            <CaseStudyDiagram diagram={study.diagram} />
          </div>
        </section>

        <section className="border-t border-q-line">
          <div className="wrap flex flex-wrap gap-x-12 gap-y-6 py-[clamp(64px,8vw,104px)]">
            <div className="flex-[1_1_280px]">
              <Eyebrow>Key decisions</Eyebrow>
              <h2 className={h2}>What I chose, and what I rejected</h2>
              <p className="mt-3.5 text-[15px] leading-[1.55] text-q-muted">
                Each one is a written decision record in the repository.
              </p>
            </div>
            <div className="flex-[3_1_560px] border-b border-q-line">
              {study.decisions.map((d) => (
                <Row key={d.title} title={d.title} tag={d.tag}>
                  <div className="flex max-w-[820px] flex-col gap-3 pb-6 text-[15px] leading-[1.65]">
                    <p className="text-q-body">{d.decision}</p>
                    <p className="border-l-2 border-q-edge2 pl-4 text-q-muted">{d.rejected}</p>
                  </div>
                </Row>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-q-line bg-q-band">
          <div className="wrap flex flex-wrap gap-x-12 gap-y-6 py-[clamp(64px,8vw,104px)]">
            <div className="flex-[1_1_280px]">
              <Eyebrow>In production</Eyebrow>
              <h2 className={`${h2} text-balance`}>{study.incidentsTitle}</h2>
              <p className="mt-3.5 text-[15px] leading-[1.55] text-q-muted">{study.incidentsIntro}</p>
            </div>
            <div className="flex-[3_1_560px] border-b border-q-line">
              {study.incidents.map((inc) => (
                <Row key={inc.title} title={inc.title} tag={inc.tag} outlined>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 pb-6">
                    {[
                      { label: "Symptom", text: inc.symptom, col: "text-q-rose" },
                      { label: "Diagnosis", text: inc.diagnosis, col: "text-q-amber" },
                      { label: "Fix", text: inc.fix, col: "text-q-green" },
                    ].map((t) => (
                      <div key={t.label} className="rounded-[10px] bg-q-inset p-4">
                        <h3 className={`text-xs font-semibold ${t.col}`}>{t.label}</h3>
                        <p className="mt-1.5 text-sm leading-[1.6] text-q-body">{t.text}</p>
                      </div>
                    ))}
                  </div>
                </Row>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-q-line">
          <div className="wrap flex flex-wrap gap-x-16 gap-y-12 py-[clamp(64px,8vw,104px)]">
            <div className="flex-[3_1_480px]">
              <Eyebrow>Method</Eyebrow>
              <h2 className={h2}>How I built it</h2>
              <ol className="mt-7 flex flex-col gap-[18px]">
                {study.method.map((m, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-q-edge2 font-mono text-xs text-q-blue">
                      {i + 1}
                    </span>
                    <p className="mt-[3px] text-[15px] leading-[1.65] text-q-body2">{m}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex-[2_1_320px]">
              <Eyebrow>Stack</Eyebrow>
              <h2 className={h2}>Technology</h2>
              <ul className="mt-7 flex flex-wrap gap-2">
                {study.tech.map((t) => (
                  <li key={t} className="rounded-full border border-q-edge px-3 py-1.5 text-[13px] text-q-body">
                    {t}
                  </li>
                ))}
              </ul>
              {study.links && (
                <div className="mt-7 flex flex-col gap-2.5">
                  {study.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="wrap pb-16">
          <div className="rounded-[20px] bg-q-blue p-[clamp(32px,5vw,64px)] text-white">
            <h2 className="max-w-[900px] text-balance text-[clamp(30px,4vw,56px)] font-bold leading-none tracking-[-0.045em]">
              {study.cta.title}
            </h2>
            <div className="mt-5 flex max-w-[760px] flex-col gap-3 text-[17px] leading-[1.6]">
              {study.cta.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link
              href="/#contact"
              className="mt-8 inline-block rounded-full bg-q-bg px-6 py-[15px] text-base font-semibold text-white hover:text-white hover:opacity-90"
            >
              Get in touch →
            </Link>
          </div>
          <p className="mt-5 max-w-[980px] text-xs leading-[1.6] text-q-muted">{study.disclaimer}</p>
        </section>

        <nav aria-label="More case studies" className="border-t border-q-line">
          <div className="wrap grid sm:grid-cols-2">
            <Link href={`/case-studies/${prev.slug}`} className="group py-8 text-q-fg sm:border-r sm:border-q-line sm:pr-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-q-muted">← Previous</span>
              <span className="mt-2 block text-xl font-bold group-hover:text-q-blue">{prev.short}</span>
            </Link>
            <Link
              href={`/case-studies/${next.slug}`}
              className="group border-t border-q-line py-8 text-right text-q-fg sm:border-t-0 sm:pl-8"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-q-muted">Next →</span>
              <span className="mt-2 block text-xl font-bold group-hover:text-q-blue">{next.short}</span>
            </Link>
          </div>
        </nav>
        <Reveal />
      </main>
      <Footer />
    </>
  );
}
