"use client";

import { Button } from "@/components/ui/button";
import { ResumeDownload } from "./ResumeDownload";
import TypewriterEffect from "./TypewriterEffect";
import { SocialLinks } from "@/components/common/SocialLinks";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-6xl mx-auto text-center">
        <div className="max-w-6xl mx-auto">
          {" "}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Hello! <span className="text-primary">I M Yousafzai</span>
          </h1>{" "}
          <div className="h-12 sm:h-16 md:h-20 flex justify-center mb-2">
            <div className="glassmorphism-container text-sm sm:text-lg md:text-2xl lg:text-3xl text-primary font-medium inline-block px-4 py-2 overflow-hidden">
              <TypewriterEffect />
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-12 mt-8 max-w-3xl mx-auto">
            I build scalable full-stack applications and trading automation systems using JavaScript, TypeScript, Python, and MQL4. With a passion for financial algorithms and a strong foundation in modern frameworks, I transform complex logic into high-performance digital products.
          </p>
          {/* <p className="text-lg pt-4 sm: text-muted-foreground mb-8 max-w-3xl mx-auto">
            {" "}
            Seeking a role that blends software engineering and product
            leadership to tackle user-first challenges at scale.
          </p> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="outline" size="lg" asChild className="w-48">
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-48">
              <a href="#contact">Get In Touch</a>
            </Button>
            <ResumeDownload
              variant="outline"
              size="lg"
              showDropdown={true}
              label="Download Resume"
              className="w-48"
            />
          </div>
          <SocialLinks spacing="normal" variant="ghost" size="icon" />
        </div>
      </div>
    </section>
  );
}
