import { Card, CardContent } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">About Me</h2>

          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <img
                    src="/placeholder.svg?height=400&width=400"
                    alt="Profile"
                    className="rounded-lg w-full max-w-sm mx-auto"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground">
                    I'm a passionate web developer with over 5 years of experience creating digital solutions that make
                    a difference. I specialize in modern web technologies and love turning complex problems into simple,
                    beautiful designs.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source
                    projects, or enjoying a good cup of coffee while planning my next project.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <h4 className="font-semibold mb-2">Experience</h4>
                      <p className="text-muted-foreground">5+ Years</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Projects</h4>
                      <p className="text-muted-foreground">50+ Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
