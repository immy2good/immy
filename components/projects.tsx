import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "iTradeAIMS: trading tools platform",
    type: "Commercial platform · 500+ customers",
    problem: "Run a trading tools business without handling every order by hand.",
    description:
      "An API-driven platform connecting payments, licensing, member access, email and TradingView access, with a members site for billing, courses and support.",
    outcome:
      "Routine product delivery runs without manual handling after purchase. 21 indicators and 8 EAs are sold and supported through it.",
    imageAlt:
      "Screenshot of the iTradeAIMS platform representing the automated commercial product ecosystem",
    image: "/images/itradeaims-screenshot.jpg",
    technologies: [
      "Stripe", "REST APIs", "WordPress", "PMPro", "Amazon SES", "CI/CD",
      "Automation", "TradingView", "MetaTrader"
    ],
    liveUrl: "https://itradeaims.net/",
    liveLabel: "Visit iTradeAIMS",
  },
  {
    number: "02",
    title: "EA licensing and code protection (MT4/MT5)",
    type: "Licensing & entitlement platform",
    problem: "Protect commercial MQL code and stop issuing licences by hand.",
    description:
      "A Laravel/API licensing system, in use for my own MT4/MT5 products, that issues licences after purchase and shows them in the member portal (243 merged pull requests). A v2 runtime on the latest Laravel with current SSL/TLS standards is built and working but not yet in service.",
    outcome:
      "Licensing is part of purchase-to-access, not a separate manual job. I build the same for traders who want to protect their own EAs.",
    imageAlt:
      "iTradeAIMS platform screenshot representing automated digital licensing and customer entitlements",
    image: "/images/itradeaims-screenshot.jpg",
    technologies: [
      "Laravel", "PHP", "REST APIs", "Authentication", "Stripe", "CI/CD", "MQL4/5"
    ],
  },
  {
    number: "03",
    title: "AIMStack: agent skills and baton",
    type: "Agentic engineering infrastructure",
    problem: "Make powerful coding agents reliable across a complex multi-repository production estate.",
    description:
      "A private, versioned set of agent skills shared across Claude Code, Codex, Cursor and Antigravity, with TDD, code review, trading domain skills and guardrails (197 merged pull requests). Work is handed between agents with baton, my open-source relay, where a different model reviews before a receipt gate marks it done.",
    outcome:
      "Agents start every job with the same standards and domain knowledge instead of being re-briefed prompt by prompt. baton is public on GitHub (MIT).",
    imageAlt:
      "Portrait of Immy Yousafzai representing agent orchestration and AI engineering",
    image: "/images/immy-profile.jpg",
    technologies: [
      "Codex", "Claude Code", "Cursor", "Antigravity", "MCP", "Agent Skills", "TDD", "CI Gates"
    ],
  },
  {
    number: "04",
    title: "Quant Research & Model Deployment",
    type: "Applied ML / quantitative research stack",
    problem: "Test whether ML improves an existing trading method without being fooled by leakage or overfitting.",
    description:
      "A research pipeline in Python and PyTorch with leakage tests, exporting models to ONNX to run inside MT5.",
    outcome:
      "A tested route from research to a model running natively in MetaTrader. No performance claims.",
    imageAlt:
      "Banana EA trading interface representing financial machine learning and MetaTrader deployment",
    image: "/images/banana-ea-project-screenshot.webp",
    technologies: [
      "Python", "PyTorch", "ONNX", "Meta-labeling", "Purged CV", "HMM", "MQL5", "React", "TypeScript"
    ],
  },
  {
    number: "05",
    title: "MCP support automation (2026, retired)",
    type: "Agentic business operations",
    problem: "Let an AI agent handle routine support without losing control of what goes to customers.",
    description:
      "Two MCP servers (37 tools) let an agent work Discord tickets, support email, WordPress membership and CRM, and TradingView access. Every customer-facing send was drafted first and only went out after I confirmed it.",
    outcome:
      "Handled about 96 real support jobs over Aug–Sep 2026 with 63 passing tests, then retired. The design now guides how I build approval-gated agents.",
    imageAlt:
      "iTradeAIMS dashboard representing AI-assisted customer and content operations",
    image: "/images/itradeaims-screenshot.jpg",
    technologies: [
      "MCP", "Python", "Discord API", "WordPress", "FluentCRM", "Human-in-the-Loop"
    ],
  },
  {
    number: "06",
    title: "ChartBridge",
    type: "BrumByte · Trading domain lead and MQL4/MQL5 developer",
    problem: "Send TradingView strategy alerts straight into MT4/MT5 trades.",
    description:
      "Trading domain lead and MQL4/MQL5 developer on a TradingView-to-MetaTrader bridge built with a small team. I owned the MT4/MT5 EAs and the MetaTrader integration, and contributed to the React/Next.js front end.",
    outcome:
      "I tested the full signal path end to end, from TradingView alert to MetaTrader trade.",
    imageAlt:
      "TradingView interface representing the ChartBridge product domain",
    image: "/images/tradingview-profile-screenshot.png",
    technologies: [
      "MQL4", "MQL5", "MetaTrader", "TradingView", "Webhooks", "React", "Next.js"
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Flagship Case Studies
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mt-4">
              Systems I've built and run. Most of the code is private, so each one says what I did and what you can check. Past projects are marked as retired.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.title} className="overflow-hidden flex flex-col">
                <div className="h-44 overflow-hidden border-b bg-muted">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <CardHeader className="pb-3">
                  <div className="text-xs font-semibold tracking-[0.18em] text-primary mb-2">
                    CASE STUDY {project.number}
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {project.type}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 flex-1">
                  <div>
                    <p className="text-sm font-medium mb-1">Problem</p>
                    <p className="text-sm text-muted-foreground">{project.problem}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">What I built / contributed</p>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Outcome / scope</p>
                    <p className="text-sm text-muted-foreground">{project.outcome}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {project.liveUrl && (
                    <div className="mt-auto pt-2">
                      <Button size="sm" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-2" />
                          {project.liveLabel || "View"}
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
