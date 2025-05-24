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
                    I'm a passionate full-stack developer and financial trading expert with over 13 years of experience
                    in the financial markets since 2011. I specialize in creating fintech solutions, trading platforms,
                    and educational resources that bridge the gap between technology and finance.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    My unique combination of programming skills and deep market knowledge allows me to build
                    sophisticated trading tools, automation systems, and educational platforms. I've authored courses,
                    written books on trading, and developed scripts used by trading communities worldwide.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <h4 className="font-semibold mb-2">Experience</h4>
                      <p className="text-muted-foreground">13+ Years Trading</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Projects</h4>
                      <p className="text-muted-foreground">100+ Scripts Published</p>
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
