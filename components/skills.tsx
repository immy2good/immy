import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  const skillCategories = [
    {
      title: "Trading Development",
      skills: [
        "MQL5", "MQL4", "MetaTrader 5", "MetaTrader 4", "Expert Advisors",
        "Indicators", "Pine Script v6", "TradingView", "Strategy Tester",
        "EA Licensing", "MT4 to MT5 Conversion", "Parity Testing"
      ],
    },
    {
      title: "AI Agent Engineering",
      skills: [
        "Claude Code", "Codex", "Cursor", "Gemini", "Grok", "Antigravity", "MCP",
        "Multi-Agent Orchestration", "Agent Memory", "Guardrails", "Human-in-the-Loop",
        "Spec-Driven Development", "TDD", "Code Review"
      ],
    },
    {
      title: "Web & Platforms",
      skills: [
        "Python", "PowerShell", "TypeScript", "React", "Next.js", "Laravel", "PHP",
        "WordPress", "Paid Memberships Pro", "Stripe", "PayPal", "REST APIs", "Webhooks",
        "Amazon SES", "Docker"
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            What I build with
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            The tools matter less than the system around them: clear specs, permissions, tests and review before anything goes live.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category) => (
              <Card key={category.title}>
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
