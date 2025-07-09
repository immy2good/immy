"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { Download } from "lucide-react";
import { ResumeDownload } from "./ResumeDownload";

function TypewriterEffect() {
  const titles = [
    "Entrepreneur",
    "Founder",
    "Product Manager", 
    "Software Engineer",
    "Financial Trader",
    "Investor"
  ];
  
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing, pausing, or deleting
  
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    
    if (phase === "typing") {
      if (currentText.length < currentTitle.length) {
        // Still typing the current title
        const timeout = setTimeout(() => {
          setCurrentText(currentTitle.slice(0, currentText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, now pause
        const timeout = setTimeout(() => {
          setPhase("pausing");
        }, 500);
        return () => clearTimeout(timeout);
      }
    } else if (phase === "pausing") {
      // After pausing, start deleting
      const timeout = setTimeout(() => {
        setPhase("deleting");
      }, 500);
      return () => clearTimeout(timeout);
    } else if (phase === "deleting") {
      if (currentText.length > 0) {
        // Still deleting
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 25);
        return () => clearTimeout(timeout);
      } else {
        // Move to next title
        setCurrentTitleIndex((currentTitleIndex + 1) % titles.length);
        setPhase("typing");
      }
    }
  }, [currentText, currentTitleIndex, phase, titles]);  return (
    <span className="border-r-2 border-primary pr-1 animate-pulse-border">
      <span className="modern-gradient font-bold" style={{
        background: "linear-gradient(to right, rgba(64,124,255,0.85), rgba(120,82,232,0.85), rgba(66,153,225,0.85), rgba(145,108,255,0.85), rgba(56,178,255,0.85))",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        backgroundSize: "200% auto",
        animation: "rainbow-text-animate 6s linear infinite",
        textShadow: "0 0 10px rgba(128,128,255,0.15)",
        padding: "2px 4px",
        borderRadius: "4px",
      }}>
        {currentText}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-6xl mx-auto text-center">
        <div className="max-w-6xl mx-auto">
          {" "}
          <h1 className="text-6xl sm:text-6xl font-bold text-foreground mb-6">
            Hey! <span className="text-primary">I M Yousafzai</span>
          </h1>          <div className="h-10 sm:h-12">
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
