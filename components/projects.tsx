"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title: "iTradeAIMS",
      type: "Digital course & membership product",
      target: "Beginner–intermediate traders",
      problem: "Structured roadmap to profitable trading through community, live coaching, and self-paced content",
      description:
        "A comprehensive FinTech education platform featuring advanced technical analysis tools, live Discord community, algorithmic trading signals, and Elliott Wave analysis.",
      image: "/images/itradeaims-screenshot.jpg",
      technologies: ["React", "Node.js", "FinTech APIs", "Technical Analysis", "Real-time Data", "Elliott Wave"],
      liveUrl: "https://itradeaims.net/",
      liveLabel: "Visit iTradeAIMS"
    },
    {
      title: "The Banana EA",
      type: "Expert Advisor / MetaTrader Automation Bot",
      target: "Forex traders",
      problem: "Emotion-free, automated execution with advanced risk filters",
      description:
        "A fully automated trading system with plug & profit simplicity, tested strategy, 24/5 automation, and smart risk management.",
      image: "/images/banana-ea-project-screenshot.webp",
      technologies: ["MQL4", "MQL5", "MetaTrader", "Algorithmic Trading", "Risk Management", "Forex"],
      liveUrl: "https://banana.imyousafzai.com/",
      liveLabel: "Try Banana EA"
    },
    {
      title: "TradingView Pine Script Indicators",
      type: "Technical Analysis Toolkit",
      target: "Retail traders",
      problem: "Visual tools for trend detection, pattern recognition, and automated alerts",
      description:
        "Collection of advanced Pine Script indicators and technical tools with 1.2K+ followers on TradingView.",
      image: "/images/tradingview-profile-screenshot.png",
      technologies: ["Pine Script", "Technical Analysis", "Elliott Wave", "TradingView", "Algorithmic Trading"],
      liveUrl: "https://www.tradingview.com/u/iTradeAIMS/",
      liveLabel: "View Profile"
    },
    {
      title: "Financial Education Book (Amazon)",
      type: "Kindle Publication",
      target: "Traders learning Elliott Wave",
      problem: "Simplifies complex wave pattern recognition",
      description:
        "Published book with practical tools for Elliott Wave recognition. Linked to automated Pine Script indicators.",
      image: "/images/elliott-wave-book-amazon.png",
      technologies: ["Pine Script", "Elliott Wave Theory", "Pattern Recognition", "Fibonacci Analysis", "TradingView"],
      liveUrl: "https://www.amazon.co.uk/10-Seconds-Elliott-Wave-within-ebook/dp/B0C4FZZNX6",
      liveLabel: "Buy on Amazon"
    },
    {
      title: "MetaTrader Automation Bots",
      type: "MQL4/5 Expert Advisors",
      target: "Algorithmic traders",
      problem: "Hands-free trading with predefined logic and visual overlays",
      description:
        "Advanced trading robots for MetaTrader with custom SL/TP and indicator filters.",
      image: "/images/metatrader-banana-ea.png",
      technologies: ["MQL4", "MQL5", "MetaTrader", "Algorithmic Trading", "Risk Management", "Forex"],
      liveUrl: "https://itradeaims.net/",
      liveLabel: "Learn More"
    },
    {
      title: "Bewdley Farm Shop",
      type: "E-commerce website",
      target: "Local grocery customers",
      problem: "Local farm produce delivery with custom shop and order handling",
      description:
        "WooCommerce solution with delivery system, payment gateway, and beautiful product layouts.",
      image: "/images/bewdley-farmshop-screenshot.png",
      technologies: ["WordPress", "WooCommerce", "Bricks Builder", "PHP", "Stripe Integration"],
      liveUrl: "https://bewdleyfarmshop.co.uk/",
      liveLabel: "Visit Shop"
    },
    {
      title: "Splashbacks Birmingham",
      type: "Business website",
      target: "Homeowners and interior decorators",
      problem: "Online presence with gallery, booking, and contact options",
      description:
        "Professional brochure website for top-rated splashback company in West Midlands.",
      image: "/images/splashbacks-screenshot.png",
      technologies: ["WordPress", "Custom PHP", "Local SEO", "Contact Forms", "Gallery System"],
      liveUrl: "https://splashbacks.co/",
      liveLabel: "Visit Website"
    },
  ]


  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const trackRef = useRef(null);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [itemsPerSlide]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const pageCount = Math.ceil(projects.length / itemsPerSlide);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Featured FinTech & Web Projects</h2>

          <div className="relative overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white-500 hover:bg-gray-200/50 w-14 h-14"
            >
              <ChevronLeft className="w-10 h-10 text-black/70" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white-500 hover:bg-gray-200/50 w-14 h-14"
            >
              <ChevronRight className="w-10 h-10 text-black/70" />
            </Button>

            <div
              ref={trackRef}
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${(100 / itemsPerSlide) * currentIndex}%)` }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="px-4 flex-shrink-0"
                  style={{ width: `${100 / itemsPerSlide}%` }}
                >
                  <Card className="flex flex-col h-full">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                      />
                    </div>
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between flex-grow">
                      <div className="flex flex-col gap-2 text-xs mb-4 text-muted-foreground">
                        <div><strong>Type:</strong> {project.type}</div>
                        <div><strong>Target:</strong> {project.target}</div>
                        <div><strong>Problem:</strong> {project.problem}</div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-auto">
                        <Button size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {project.liveLabel || "Live Site"}
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: pageCount }).map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerSlide)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
                  Math.floor(currentIndex / itemsPerSlide) === index ? "bg-primary" : "bg-gray-400"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
