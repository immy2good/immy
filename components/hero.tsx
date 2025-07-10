"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, Mail } from "lucide-react";
import { Download } from "lucide-react";
import { ResumeDownload } from "./ResumeDownload";
import TypewriterEffect from "./TypewriterEffect";


export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-6xl mx-auto text-center">
        <div className="max-w-6xl mx-auto">
          {" "}
          <h1 className="text-6xl sm:text-6xl font-bold text-foreground mb-6">
            Hey! <span className="text-primary">I M Yousafzai</span>
          </h1>{" "}
          <div className="h-10 sm:h-12">
            <div className="glassmorphism-container text-xl sm:text-3xl text-primary font-medium mb-8 inline-block px-4 py-2">
              <TypewriterEffect />
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Product‐minded technologist with 13+ years in fintech and web
            development, proven at leading cross-functional teams and delivering
            scalable, secure, user-centric applications (e-commerce, SaaS,
            full-stack).
          </p>
          {/* <p className="text-lg pt-4 sm: text-muted-foreground mb-8 max-w-3xl mx-auto">
            {" "}
            Seeking a role that blends software engineering and product
            leadership to tackle user-first challenges at scale.
          </p> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
            <ResumeDownload
              variant="secondary"
              size="lg"
              showDropdown={true}
              label="Download Resume"
            />
          </div>
          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/immy2good "
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/immy-yousafzai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="mailto:imran2good@hotmail.com"
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
