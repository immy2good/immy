import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  const skillCategories = [
    {
      title: "Agentic AI Engineering",
      skills: [
        "Multi-Agent Orchestration", "Codex", "Claude Code", "Gemini", "MCP",
        "Custom Skills & Plugins", "Agent Memory", "Guardrails", "Human-in-the-Loop",
        "Spec-Driven Development", "TDD", "Code Review"
      ],
    },
    {
      title: "Product & Automation",
      skills: [
        "Business Process Automation", "Product Requirements", "Architecture",
        "REST APIs", "Webhooks", "Stripe", "Amazon SES", "Discord APIs",
        "Customer Fulfilment", "Licensing", "Support Automation", "Content Automation"
      ],
    },
    {
      title: "Engineering, ML & FinTech",
      skills: [
        "Python", "TypeScript", "JavaScript", "React", "Next.js", "Laravel", "PHP",
        "Docker", "GitHub Actions", "CI/CD", "PyTorch", "ONNX", "Time-Series Validation",
        "MQL4/5", "Pine Script", "MetaTrader", "TradingView"
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
            Tools matter, but the differentiator is the system around them: specifications, context, permissions, tests, review and deployment gates.
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
