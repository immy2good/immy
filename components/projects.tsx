import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { caseStudies } from "@/lib/case-studies";

const otherWork = [
  {
    title: "iTradeAIMS",
    type: "Commercial platform · 500+ customers",
    description:
      "An API-driven platform connecting payments, licensing, member access, email and TradingView access. 21 indicators and 8 EAs are sold and supported through it, with routine delivery running without manual handling.",
    technologies: ["Stripe", "REST APIs", "WordPress", "PMPro", "Amazon SES", "TradingView", "MetaTrader"],
    link: { href: "https://itradeaims.net/", label: "Visit iTradeAIMS" },
  },
  {
    title: "Quant research & model deployment",
    type: "Applied ML research stack",
    description:
      "A Python and PyTorch research pipeline with leakage tests, exporting models to ONNX to run natively inside MT5. A tested route from research to MetaTrader. No performance claims.",
    technologies: ["Python", "PyTorch", "ONNX", "Meta-labeling", "Purged CV", "MQL5"],
  },
  {
    title: "MCP support automation",
    type: "Agentic business operations",
    description:
      "Two MCP servers (37 tools) let an agent work Discord tickets, support email, membership, CRM and TradingView access, with every customer-facing send confirmed by me first. Handled about 96 real support jobs over Aug–Sep 2026, with 63 passing tests.",
    technologies: ["MCP", "Python", "Discord API", "WordPress", "FluentCRM", "Human-in-the-loop"],
  },
  {
    title: "ChartBridge",
    type: "BrumByte · Trading domain lead, MQL4/MQL5 developer",
    description:
      "A TradingView-to-MetaTrader bridge built with a small team. I owned the MT4/MT5 EAs and the MetaTrader integration, contributed to the React/Next.js front end, and tested the full signal path end to end.",
    technologies: ["MQL4", "MQL5", "TradingView", "Webhooks", "React", "Next.js"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 bg-muted/50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Selected work
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Case studies</h2>
          <p className="mt-4 text-muted-foreground">
            Systems I've built and run in production. The code is private, so each case study walks
            through the architecture, the decisions behind it and the problems found along the way.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group flex flex-col rounded-xl border bg-card p-6 transition-all lg:row-span-6 lg:grid lg:grid-rows-subgrid lg:gap-0 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {study.category}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <h3 className="text-xl font-semibold leading-snug tracking-tight">{study.cardTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{study.summary}</p>

              <dl className="mt-6 grid grid-cols-3 gap-3 border-t pt-5">
                {study.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col-reverse">
                    <dt className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{m.label}</dt>
                    <dd className="text-lg font-bold tracking-tight">{m.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {study.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>

              <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium lg:mt-0">
                Read the case study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <h3 className="mb-6 mt-16 text-xl font-semibold tracking-tight">More work</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {otherWork.map((work) => (
            <div key={work.title} className="flex flex-col rounded-xl border bg-card p-6">
              <h4 className="font-semibold">{work.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground">{work.type}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{work.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {work.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs font-normal">
                    {tech}
                  </Badge>
                ))}
              </div>
              {work.link && (
                <a
                  href={work.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium hover:underline"
                >
                  {work.link.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
