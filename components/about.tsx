import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

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
                    src="/images/immy-profile.jpg"
                    alt="Immy Yo - FinTech Developer and Web Developer"
                    className="rounded-lg w-full max-w-sm mx-auto"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground">
                    I'm a passionate FinTech developer and technical analysis expert with over 13 years of experience in
                    financial markets since 2011. I specialize in creating innovative FinTech solutions, algorithmic
                    trading platforms, and comprehensive technical analysis tools that empower traders worldwide.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    As a published author, I've written extensively on technical analysis, including my book on the
                    Elliott Wave Principle available on Amazon. My expertise spans forex, CFDs, futures, stocks, and
                    cryptocurrency markets, with automation scripts and trading bots used by thousands of community
                    members globally.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://amzn.eu/d/735UjWD" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View My Book
                      </a>
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <h4 className="font-semibold mb-2">Trading Experience</h4>
                      <p className="text-muted-foreground">13+ Years</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Published Scripts</h4>
                      <p className="text-muted-foreground">100+ FinTech Tools</p>
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
