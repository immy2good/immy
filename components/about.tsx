import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const metrics = [
  { value: "Since 2011", label: "running iTradeAIMS" },
  { value: "500+", label: "customers" },
  { value: "21 + 8", label: "indicators and Expert Advisors for MT4, MT5 and TradingView" },
  { value: "200+", label: "test, probe and verification scripts in my EA and indicator repos" },
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
                    I have spent my working life building and operating things. Earlier in my career that meant physical businesses - marble processing, flour milling, cold storage and warehousing. Then it became trading: I founded iTradeAIMS in 2011, and it still sells and supports 21 indicators and 8 Expert Advisors for MT4, MT5 and TradingView. I&apos;ve published on TradingView since 2014 and taught on YouTube, where the iTradeAIMS channel has 537 videos.
                  </p>

                  <p className="text-lg text-muted-foreground">
                    Today I build with AI coding agents (Claude Code, Codex, Cursor, Gemini, Grok and Antigravity) inside a setup I run myself: specs, versioned skills, MCP tools, tests, hooks and review gates. Work is handed between agents with baton, my open-source relay, and the agents share a knowledge-graph memory. I use plain code wherever it beats AI, and I sign off anything that matters.
                  </p>

                  <p className="text-lg text-muted-foreground">
                    Trading development is my strongest area: MQL4/5, Pine Script, Python and web technologies, built around how traders actually work. The same approach applies outside trading: find the bottleneck, design the system, automate the repetitive work and keep a person in the loop where judgement matters.
                  </p>

                  <p className="text-lg text-muted-foreground">
                    I&apos;m open to UK remote roles in trading technology, AI automation and agentic systems, and to freelance work on MT4/MT5, Pine Script and AI agent workflows.
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
