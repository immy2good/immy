import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            About Me
          </h2>

          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-12 items-start">
                {/* Profile Image */}
                <div className="profile-image-container">
                  <img
                    src="/images/immy-profile.jpg"
                    alt="Immy Yousafzai Portfolio"
                    className="rounded-lg w-full max-w-sm mx-auto profile-image"
                  />
                </div>

                {/* Introduction & Metrics */}
                <div className="space-y-6 md:col-span-3">
                  <p className="text-lg text-muted-foreground">
                    Hey! I'm a Founder of{" "}
                    <a
                      href="https://itradeaims.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      iTradeAIMS Ltd
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://brumbyte.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      BrumByte Ltd
                    </a>
                    . It all started back in 2011 when I decided to quit my job
                    for building something that delivers value. Being a founder
                    forced me to wear multiple hats. <br />
                    <br />
                    Now, I'm a <strong>Full-Stack Developer</strong> and{" "}
                    <strong>Product Manager</strong> with a passion for building
                    innovative solutions that solve real-world problems.
                    <br />
                    <br />
                    <strong>13 years</strong> experience of driving product
                    strategy and building cool stuff for FinTech, e‑commerce,
                    and SaaS companies. I love connecting technical and business
                    teams to create products that users actually want to use -
                    ones that boost engagement, revenue, and make operations
                    smoother.
                  </p>

                  <p className="text-lg text-muted-foreground">
                    On the professional side, I work with React, Next.js,
                    TypeScript, Node.js, and cloud infrastructure (AWS, Docker).
                    As a published author on technical analysis, I've created
                    algorithmic trading bots and educational platforms used by
                    thousands globally.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    When I'm not coding or leading Agile teams, I'm a proud
                    father and husband. In my free time, you'll find me
                    tinkering with trading strategies, running backtests and
                    optimization in MT4 and TradingView platforms.
                  </p>

                  <p className="text-lg text-muted-foreground pt-4">
                    I'm always looking for new challenges that blend product
                    management and software engineering. Let's connect if you
                    need someone who can bridge the gap between business needs
                    and technical execution.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href="https://amzn.eu/d/735UjWD"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read My Book
                      </a>
                    </Button>
                    <Button variant="secondary" size="sm" asChild>
                      <a
                        href="https://itradeaims.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                        download
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit iTradeAIMS
                      </a>
                    </Button>
                    <Button variant="secondary" size="sm" asChild>
                      <a
                        href="https://brumbyte.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                        download
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit BrumByte
                      </a>
                    </Button>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-6">
                    <div>
                      <h4 className="font-semibold mb-2">Product Leadership</h4>
                      <p className="text-muted-foreground">
                        Managed 10+ product launches
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Web Development</h4>
                      <p className="text-muted-foreground">
                        Built 20+ responsive apps
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">FinTech Tools</h4>
                      <p className="text-muted-foreground">
                        100+ published scripts
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Global Impact</h4>
                      <p className="text-muted-foreground">
                        100K+ users served
                      </p>
                    </div>
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
