import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CaseStudyDiagram } from "@/components/case-study-diagram";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  const title = `${study.cardTitle} | Case study | Immy Yousafzai`;
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

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {intro && <p className="mt-3 text-muted-foreground">{intro}</p>}
    </div>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="border-b px-4 pb-14 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><Link href="/" className="hover:text-foreground">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/#projects" className="hover:text-foreground">Case studies</Link></li>
                <li aria-hidden>/</li>
                <li className="text-foreground" aria-current="page">{study.cardTitle}</li>
              </ol>
            </nav>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {study.eyebrow}
            </p>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {study.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{study.lede}</p>

            <dl className={`mt-10 grid gap-6 border-t pt-6 sm:grid-cols-3 ${study.meta.length > 3 ? "lg:grid-cols-4" : ""}`}>
              {study.meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{m.label}</dt>
                  <dd className="mt-1 text-sm font-medium">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b bg-muted/40 px-4 py-10 sm:px-6 lg:px-8">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-5">
            {study.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-bold tracking-tight">{s.value}</dd>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </dl>
        </section>

        {/* Problem */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="The problem" title="Why this needed building" />
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { title: study.problem.wrongTitle, items: study.problem.wrong, dot: "bg-rose-500" },
                { title: study.problem.neededTitle, items: study.problem.needed, dot: "bg-emerald-500" },
              ].map((col) => (
                <div key={col.title} className="rounded-xl border bg-card p-6">
                  <h3 className="mb-4 font-semibold">{col.title}</h3>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${col.dot}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="border-y bg-muted/40 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Architecture"
              title="How it fits together"
              intro="Select any box to see what it does, or pick a journey and press Play to follow it step by step."
            />
            <CaseStudyDiagram diagram={study.diagram} />
          </div>
        </section>

        {/* Decisions */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Key decisions"
              title="What I chose, and what I rejected"
              intro="Each one is a written decision record in the repository."
            />
            <Accordion type="multiple" className="rounded-xl border bg-card px-6">
              {study.decisions.map((d, i) => (
                <AccordionItem key={d.title} value={`d${i}`} className="last:border-b-0">
                  <AccordionTrigger className="gap-4 text-left hover:no-underline">
                    <span className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                      <span>{d.title}</span>
                      <Badge variant="secondary" className="w-fit shrink-0 font-normal">{d.tag}</Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm leading-relaxed">
                    <p>{d.decision}</p>
                    <p className="border-l-2 pl-4 text-muted-foreground">{d.rejected}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Incidents */}
        <section className="border-y bg-muted/40 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="In production" title={study.incidentsTitle} intro={study.incidentsIntro} />
            <Accordion type="multiple" className="rounded-xl border bg-card px-6">
              {study.incidents.map((inc, i) => (
                <AccordionItem key={inc.title} value={`i${i}`} className="last:border-b-0">
                  <AccordionTrigger className="gap-4 text-left hover:no-underline">
                    <span className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                      <span>{inc.title}</span>
                      <Badge variant="outline" className="w-fit shrink-0 font-normal">{inc.tag}</Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        ["Symptom", inc.symptom],
                        ["Diagnosis", inc.diagnosis],
                        ["Fix", inc.fix],
                      ].map(([label, text]) => (
                        <div key={label} className="rounded-lg bg-muted/60 p-4">
                          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {label}
                          </p>
                          <p className="text-sm leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Method */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <SectionHeading eyebrow="Method" title="How I built it" />
              <ol className="space-y-5">
                {study.method.map((m, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">{m}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <SectionHeading eyebrow="Stack" title="Technology" />
              <div className="flex flex-wrap gap-2">
                {study.tech.map((t) => (
                  <Badge key={t} variant="outline" className="px-3 py-1 text-sm font-normal">{t}</Badge>
                ))}
              </div>
              {study.links && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {study.links.map((l) => (
                    <Button key={l.href} variant="outline" size="sm" asChild>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.href.includes("github.com") ? <Github className="mr-2 h-4 w-4" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                        {l.label}
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl bg-primary p-8 text-primary-foreground sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{study.cta.title}</h2>
            <div className="mt-4 max-w-3xl space-y-3 text-primary-foreground/80">
              {study.cta.body.map((p) => <p key={p}>{p}</p>)}
            </div>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <Link href="/#contact">
                Get in touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mx-auto mt-6 max-w-6xl text-xs leading-relaxed text-muted-foreground">{study.disclaimer}</p>
        </section>

        {/* Prev / next */}
        <nav aria-label="More case studies" className="border-t px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl sm:grid-cols-2">
            <Link href={`/case-studies/${prev.slug}`} className="group py-8 sm:border-r sm:pr-8">
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> Previous
              </p>
              <p className="mt-2 font-semibold group-hover:underline">{prev.cardTitle}</p>
            </Link>
            <Link href={`/case-studies/${next.slug}`} className="group border-t py-8 text-right sm:border-t-0 sm:pl-8">
              <p className="flex items-center justify-end gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                Next <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="mt-2 font-semibold group-hover:underline">{next.cardTitle}</p>
            </Link>
          </div>
        </nav>
      </main>
      <Footer />
    </div>
  );
}
