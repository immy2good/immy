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
    title: "iTradeAIMS Revival & Automation",
    type: "AI-enabled commercial platform",
    problem: "Rebuild a reacquired FinTech business and remove routine operational work.",
    description:
      "Rebuilt iTradeAIMS into an API-driven commercial platform spanning payments, entitlements, licensing, customer access, email and TradingView fulfilment.",
    outcome:
      "Routine product fulfilment now runs effectively without manual handling after a customer purchase.",
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
    title: "DLMS — Digital Licence Management System",
    type: "Licensing & entitlement platform",
    problem: "Protect commercial MQL software while eliminating manual licence fulfilment.",
    description:
      "Laravel/API-driven licensing system that generates software entitlements after purchase and surfaces them in the iTradeAIMS member portal.",
    outcome:
      "Licensing is integrated into the purchase-to-access workflow rather than handled as a separate manual task.",
    imageAlt:
      "iTradeAIMS platform screenshot representing automated digital licensing and customer entitlements",
    image: "/images/itradeaims-screenshot.jpg",
    technologies: [
      "Laravel", "PHP", "REST APIs", "Authentication", "Stripe", "CI/CD", "MQL4/5"
    ],
  },
  {
    number: "03",
    title: "AIMStack — Agent Engineering Platform",
    type: "Agentic engineering infrastructure",
    problem: "Make powerful coding agents reliable across a complex multi-repository production estate.",
    description:
      "Private skills and plugin stack spanning Codex, Claude Code, Cursor and Antigravity, with session bootstraps, TDD, code review, domain skills, guardrails and delivery gates.",
    outcome:
      "Reusable engineering discipline and domain context are carried across agent harnesses instead of being recreated prompt by prompt.",
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
      "Directed and operated connected Edge Hunt, Train Model and AIMS Quant workflows for statistical evidence, point-in-time features, PyTorch training, adversarial leakage tests, ONNX export and MT5 integration.",
    outcome:
      "A research-to-deployment path links validation controls to model artefacts and native MetaTrader inference.",
    imageAlt:
      "Banana EA trading interface representing financial machine learning and MetaTrader deployment",
    image: "/images/banana-ea-project-screenshot.webp",
    technologies: [
      "Python", "PyTorch", "ONNX", "Meta-labeling", "Purged CV", "HMM", "MQL5", "React", "TypeScript"
    ],
  },
  {
    number: "05",
    title: "AI Content & Support Operations",
    type: "Agentic business operations",
    problem: "Automate repetitive business work while retaining deterministic controls and human escalation.",
    description:
      "Built governed content workflows and previously built a Discord support automation architecture combining deterministic intake with AI reasoning, retrieval, severity routing and escalation.",
    outcome:
      "The content factory remains an active workflow; the original support implementation was later superseded and is retained as architectural evidence.",
    imageAlt:
      "iTradeAIMS dashboard representing AI-assisted customer and content operations",
    image: "/images/itradeaims-screenshot.jpg",
    technologies: [
      "Gemini", "Discord Bot API", "MCP", "VPS", "Deterministic Automation", "Human-in-the-Loop"
    ],
  },
  {
    number: "06",
    title: "ChartBridge",
    type: "Startup / product & domain role",
    problem: "Bridge TradingView strategy signals into MT4/MT5 execution workflows.",
    description:
      "Originated the product concept and serve as the trading/FinTech domain expert, defining user workflows, requirements and product direction.",
    outcome:
      "My role is product and domain leadership; the startup engineering team owns implementation.",
    imageAlt:
      "TradingView interface representing the ChartBridge product domain",
    image: "/images/tradingview-profile-screenshot.png",
    technologies: [
      "Product Discovery", "FinTech Domain", "TradingView", "MetaTrader", "API Workflows"
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
              Production systems, operating workflows and applied AI work. The emphasis is on the problem, the controls around the system and what changed in practice.
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
