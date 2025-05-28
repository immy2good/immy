import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Skills() {
  const skillCategories = [
    {
      title: "FinTech & Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Pine Script", "Technical Analysis", "Elliott Wave"],
    },
    {
      title: "Backend & Trading",
      skills: ["Node.js", "Python", "MQL4", "MQL5", "PostgreSQL", "Financial APIs", "Algorithmic Trading"],
    },
    {
      title: "Tools & Platforms",
      skills: ["TradingView", "MetaTrader", "AWS", "Docker", "Git", "FinTech Solutions", "Market Data APIs"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            FinTech Skills & Technical Analysis Expertise
          </h2>

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
  )
}
