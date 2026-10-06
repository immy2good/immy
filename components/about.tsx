import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const metrics = [
  { value: "15+ years", label: "building commercial digital products" },
  { value: "500+", label: "Stripe customer records in the current platform" },
  { value: "20+", label: "active commercial product configurations" },
  { value: "~25", label: "active engineering repositories" },
];

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Builder first. Technology is the leverage.
          </h2>

          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-12 items-start">
                <div className="profile-image-container">
                  <img
                    src="/images/immy-profile.jpg"
                    alt="Immy Yousafzai"
                    className="rounded-lg w-full max-w-sm mx-auto profile-image"
                  />
                </div>

                <div className="space-y-6 md:col-span-3">
                  <p className="text-lg text-muted-foreground">
                    I have spent my working life building and operating things. Earlier in my career that meant physical businesses - marble processing, flour milling, cold storage and warehousing. Later it became trading systems, digital products and iTradeAIMS. AI has expanded the scale of what I can build and the speed at which I can move from an idea to a working system.
                  </p>

                  <p className="text-lg text-muted-foreground">
                    Today I design AI-native product and engineering workflows: specifications, agent orchestration, MCP tools, reusable skills, test-driven implementation, code review, CI/CD gates and controlled production access. I use Codex and Claude for serious engineering work, Gemini for selected automation and content workflows, and deterministic code wherever deterministic behaviour is the better choice.
                  </p>

                  <p className="text-lg text-muted-foreground">
                    My strongest domain is FinTech and algorithmic trading, where I combine long trading experience with MQL4/5, Pine Script, Python, PyTorch, ONNX and web technologies. The same approach applies outside trading: identify the business bottleneck, design the system, automate the repetitive work and keep humans in the loop where judgement matters.
                  </p>

                  <p className="text-lg text-muted-foreground">
                    I am open to UK-remote roles in AI product engineering, automation, agentic systems, solutions engineering and applied AI. I am particularly useful where a company needs someone who can bridge business context, product decisions and hands-on technical delivery.
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {metrics.map((metric) => (
                      <div key={metric.label} className="rounded-lg border bg-background p-4">
                        <div className="text-2xl font-bold text-primary">{metric.value}</div>
                        <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <Button variant="secondary" size="sm" asChild>
                      <a
                        href="https://itradeaims.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit iTradeAIMS
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href="https://github.com/immy2good"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
