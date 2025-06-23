import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { Download } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
            Hey! <span className="text-primary">I M Yousafzai</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
            Entrepreneur - Product Manager - Softare Engineer - Finanical
            Trader/Investor
          </p>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Product‐minded technologist with 13+ years in fintech and web
            development, proven at leading cross-functional teams and delivering
            scalable, secure, user-centric applications (e-commerce, SaaS,
            full-stack). Seeking a role that blends software engineering and
            product leadership to tackle user-first challenges at scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a
                href="cv/Yousafzai_PM_SE_CV_21_June_2025-V3.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Download className="h-5 w-5" /> Download CV
              </a>
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/immy2good "
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/immy-yousafzai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="mailto:imran@brumbyte.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
