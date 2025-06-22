import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            About Me
          </h2>

          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Profile Image */}
                <div>
                  <img
                    src="/images/immy-profile.jpg"
                    alt="Immy Yousafzai Portfolio"
                    className="rounded-lg w-full max-w-sm mx-auto"
                  />
                </div>

                {/* Introduction & Metrics */}
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    I’m a seasoned <strong>Senior Product Manager</strong> and{" "}
                    <strong>Full-Stack Developer</strong> with over{" "}
                    <strong>13 years</strong> driving product strategy and
                    building scalable web applications in FinTech, e‑commerce,
                    and SaaS. I bridge technical and business teams to deliver
                    user-centric products that increase engagement, revenue, and
                    operational efficiency.
                  </p>

                  <p className="text-lg text-muted-foreground">
                    My expertise includes leading Agile teams, defining
                    roadmaps, and executing end‑to‑end development using React,
                    Next.js, TypeScript, Node.js, and cloud infrastructure (AWS,
                    Docker). As a published author on technical analysis, I’ve
                    also created algorithmic trading bots and educational
                    platforms used by thousands globally.
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
                        View My Book
                      </a>
                    </Button>
                    <Button variant="secondary" size="sm" asChild>
                      <a
                        href="cv/Yousafzai_PM_SE_CV_21_June_2025-.pdf"
                        download
                        className="flex items-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Download CV
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
