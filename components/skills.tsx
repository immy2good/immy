import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [ "React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "TypeScript", "Redux", "GraphQL"],
    },
    {
      title: "Backend",
      skills: [ "Node.js", "Express", "GraphQL", "REST APIs", "PostgreSQL", "MongoDB", "Redis", "WebSockets"],
    },
    {
      title: "Languages & DevOps",
      skills: [ "JavaScript", "TypeScript", "Python", "Docker", "AWS", "Git", "CI/CD", "Agile Methodologies", "MQL4", "MQL5", "TradingView Pine Script", "Technical Analysis"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Software Engineering Skills & Technical Proficiencies
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
