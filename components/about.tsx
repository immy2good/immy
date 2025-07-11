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
  Hey! I'm the founder of{" "}
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
  . My journey in tech began back in 2011 when I left my job to build solutions that deliver real value. Since then, I’ve evolved into a{" "}
  <strong>full-stack software engineer</strong> with a deep interest in automation, financial systems, and user-focused development.
  <br />
  <br />
  With over <strong>13 years</strong> of hands-on experience, I’ve designed and built web applications, algorithmic trading platforms, and digital tools for FinTech and e-commerce. I enjoy solving real-world problems with code—whether it’s enhancing UX, automating workflows, or integrating data-rich APIs.
</p>

<p className="text-lg text-muted-foreground">
  I specialize in modern tech stacks like React, Next.js, TypeScript, Node.js, and Python, along with AWS and Docker for cloud and deployment. I’ve also published technical analysis tools and trading bots used by thousands globally across MT4, MQL4/5, and TradingView.
</p>

<p className="text-lg text-muted-foreground">
  Outside of coding, I'm a proud father and husband. I enjoy backtesting trading strategies, building smart indicators, and continually exploring how software can make data and decisions more accessible.
</p>

<p className="text-lg text-muted-foreground pt-4">
  I’m currently open to software engineering and web development opportunities—especially roles where I can contribute immediately while continuing to grow. If you’re looking for a developer who combines business insight with hands-on coding experience, let’s connect.
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
