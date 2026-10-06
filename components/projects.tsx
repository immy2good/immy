"use client";

import { useState, useEffect, useRef, TouchEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

// Custom styling for more compact cards
const cardStyles = {
  card: "flex flex-col max-h-[680px] sm:max-h-[420px] md:max-h-[450px] lg:max-h-[450px] overflow-hidden",
  imageContainer: "h-[160px] sm:h-[180px] overflow-hidden relative", // Fixed height instead of aspect ratio
  image:
    "w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out",
  header: "py-4 px-3",
  title: "text-base sm:text-lg truncate",
  description: "line-clamp-2 text-xs sm:text-sm",
  content: "py-2 px-4 flex flex-col justify-between",
  detailsContainer:
    "flex flex-col gap-0.5 text-xs text-muted-foreground mb-1.5",
  detailRow: "flex",
  detailLabel: "w-12 inline-block font-small",
  detailValue: "line-clamp-2",
  techContainer:
    "flex flex-wrap gap-2 mb-2 max-h-[50px] overflow-y-auto scrollbar-thin",
  techBadge: "text-[9px] h-4 px-1.5 py-0",
  buttonContainer: "mt-auto",
};

const AccessibleImage = ({
  project,
  prefersReducedMotion,
}: {
  project: any;
  prefersReducedMotion: boolean;
}) => {
  return (
    <div className={cardStyles.imageContainer}>
      <img
        src={project.image || "/placeholder.svg"}
        alt={project.imageAlt || `${project.title} screenshot`}
        className={`${cardStyles.image} ${
          prefersReducedMotion
            ? ""
            : "transition-transform duration-500 ease-in-out"
        }`}
        loading="lazy"
      />
    </div>
  );
};

export function Projects() {
  const projects = [
    {
      title: "iTradeAIMS Revival & Automation",
      type: "AI-enabled commercial platform",
      target: "Digital product businesses",
      problem: "Rebuild a reacquired FinTech business and remove routine operational work",
      description:
        "Rebuilt iTradeAIMS into an API-driven commercial platform with automated payments, entitlements, licensing, customer access, email and TradingView fulfilment.",
      imageAlt:
        "Screenshot of the iTradeAIMS platform representing the automated commercial product ecosystem",
      image: "/images/itradeaims-screenshot.jpg",
      technologies: [
        "Stripe", "REST APIs", "WordPress", "PMPro", "Amazon SES", "CI/CD",
        "Automation", "TradingView", "MetaTrader"
      ],
      liveUrl: "https://itradeaims.net/",
      liveLabel: "Visit iTradeAIMS",
    },
    {
      title: "DLMS — Digital Licence Management",
      type: "Licensing & entitlement platform",
      target: "Commercial software products",
      problem: "Protect MQL software while eliminating manual licence fulfilment",
      description:
        "Laravel/API-driven licensing system that generates and delivers software entitlements after purchase and surfaces them in the iTradeAIMS member portal.",
      imageAlt:
        "iTradeAIMS platform screenshot representing automated digital licensing and customer entitlements",
      image: "/images/itradeaims-screenshot.jpg",
      technologies: [
        "Laravel", "PHP", "REST APIs", "Authentication", "Stripe", "CI/CD", "MQL4/5"
      ],
      liveUrl: "",
      liveLabel: "",
    },
    {
      title: "AIMStack — Agent Engineering Platform",
      type: "Agentic engineering infrastructure",
      target: "AI coding agents and multi-repo delivery",
      problem: "Make powerful coding agents reliable across a complex production estate",
      description:
        "Private skills and plugin stack spanning Codex, Claude Code, Cursor and Antigravity, with session bootstraps, TDD, code review, domain skills, guardrails and delivery gates.",
      imageAlt:
        "Portrait of Immy Yousafzai representing agent orchestration and AI engineering",
      image: "/images/immy-profile.jpg",
      technologies: [
        "Codex", "Claude Code", "Gemini", "MCP", "Agent Skills", "TDD", "GitHub", "CI Gates"
      ],
      liveUrl: "https://github.com/immy2good",
      liveLabel: "View GitHub",
    },
    {
      title: "Quant Research & Model Deployment",
      type: "Applied ML / quantitative research stack",
      target: "Systematic trading research and model deployment",
      problem: "Test whether ML improves an existing trading method without being fooled by leakage or overfitting",
      description:
        "Connected Edge Hunt, Train Model and AIMS Quant workflows for statistical evidence, point-in-time features, PyTorch training, adversarial leakage tests, ONNX export and MT5 integration.",
      imageAlt:
        "Banana EA trading interface representing financial machine learning and MetaTrader deployment",
      image: "/images/banana-ea-project-screenshot.webp",
      technologies: [
        "Python", "PyTorch", "ONNX", "Meta-labeling", "Purged CV", "HMM", "MQL5", "React", "TypeScript"
      ],
      liveUrl: "",
      liveLabel: "",
    },
    {
      title: "AI Content & Support Operations",
      type: "Agentic business operations",
      target: "Customer support and content workflows",
      problem: "Automate repetitive business work while retaining deterministic controls and human escalation",
      description:
        "Designed workflows combining deterministic scripts with AI reasoning, documentation and memory retrieval, severity-based escalation, governed content generation, review and distribution.",
      imageAlt:
        "iTradeAIMS dashboard representing AI-assisted customer and content operations",
      image: "/images/itradeaims-screenshot.jpg",
      technologies: [
        "Gemini", "Discord Bot API", "MCP", "VPS", "Deterministic Automation", "Human-in-the-Loop"
      ],
      liveUrl: "",
      liveLabel: "",
    },
    {
      title: "ChartBridge",
      type: "Startup / product concept",
      target: "TradingView and MetaTrader users",
      problem: "Bridge TradingView strategy signals into MT4/MT5 execution workflows",
      description:
        "Originated the product concept and serve as the trading/FinTech domain expert, defining user workflows, requirements and product direction while the engineering team owns implementation.",
      imageAlt:
        "TradingView interface representing the ChartBridge product domain",
      image: "/images/tradingview-profile-screenshot.png",
      technologies: [
        "Product Discovery", "FinTech Domain", "TradingView", "MetaTrader", "API Workflows"
      ],
      liveUrl: "",
      liveLabel: "",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Create a wrapped version of projects for infinite scrolling effect
  const wrappedProjects = [...projects];

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
  }, []); // Track if we're in the middle of a transition
  const [isTransitioning, setIsTransitioning] = useState(false);

  // State to track if carousel is paused (for accessibility)
  const [isPaused, setIsPaused] = useState(false);
  // State to track if user prefers reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Auto-rotation effect with pause capability
  useEffect(() => {
    // Don't auto-rotate if paused or user prefers reduced motion
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000); // 5000ms rotation speed
    return () => clearInterval(interval);
  }, [itemsPerSlide, isTransitioning, isPaused, prefersReducedMotion]);

  const nextSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Match duration-700 class on the track
  };

  const prevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Match duration-700 class on the track
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (isTransitioning) return;

    const difference = touchStartX.current - touchEndX.current;
    // If the swipe was significant enough (more than 50px)
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        // Swiped left, go to next slide
        nextSlide();
      } else {
        // Swiped right, go to previous slide
        prevSlide();
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        prevSlide();
        break;
      case "ArrowRight":
        nextSlide();
        break;
      case " ": // spacebar
      case "Spacebar":
        e.preventDefault();
        setIsPaused((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const pageCount = Math.ceil(projects.length / itemsPerSlide);

  return (
    <section
      id="projects"
      className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 bg-muted/50"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="container mx-auto">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
            Flagship Case Studies
          </h2>
          <div
            className="relative overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects carousel"
          >
            <div className="sr-only">
              Use the next and previous buttons to navigate through projects, or
              use the indicator dots below.
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200/50 hover:bg-gray-200/50 text-white w-10 h-10 focus:ring-2 focus:ring-primary/20 focus:outline-none"
              aria-label="Previous project"
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              aria-controls="projects-carousel"
            >
              <ChevronLeft className="w-7 h-7 text-black/70" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200/50 hover:bg-gray-200/50 text-white w-10 h-10 focus:ring-2 focus:ring-primary/20 focus:outline-none"
              aria-label="Next project"
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              aria-controls="projects-carousel"
            >
              <ChevronRight className="w-7 h-7 text-black/70" />
            </Button>
            <div
              id="projects-carousel"
              ref={trackRef}
              className="flex transition-transform duration-700 ease-in-out touch-pan-y"
              style={{
                transform: `translateX(-${(100 / itemsPerSlide) * currentIndex}%)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              aria-live="polite"
            >
              {/* First we render clones of the last items for continuity when scrolling backward */}
              {currentIndex === 0 &&
                projects.slice(-itemsPerSlide).map((project, index) => (
                  <div
                    key={`before-${index}`}
                    className="px-4 flex-shrink-0 opacity-0 pointer-events-none absolute"
                    style={{
                      width: `${100 / itemsPerSlide}%`,
                      transform: `translateX(-${100 * itemsPerSlide}%)`,
                    }}
                  >
                    <Card className={cardStyles.card}>
                      {/* Project content (same as below) */}
                      <div className={cardStyles.imageContainer}>
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={
                            project.imageAlt || `${project.title} screenshot`
                          }
                          className={cardStyles.image}
                          loading="lazy"
                        />
                      </div>
                    </Card>
                  </div>
                ))}

              {/* Render all projects */}
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="px-4 flex-shrink-0"
                  style={{ width: `${100 / itemsPerSlide}%` }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${index + 1} of ${projects.length}: ${project.title}`}
                  tabIndex={
                    currentIndex <= index &&
                    index < currentIndex + itemsPerSlide
                      ? 0
                      : -1
                  }
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                >
                  <Card className={cardStyles.card}>
                    <AccessibleImage
                      project={project}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                    <CardHeader className={cardStyles.header}>
                      <CardTitle className={cardStyles.title}>
                        {project.title}
                      </CardTitle>
                      <CardDescription className={cardStyles.description}>
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className={cardStyles.content}>
                      <div className={cardStyles.detailsContainer}>
                        <div className={cardStyles.detailRow}>
                          <strong className={cardStyles.detailLabel}>
                            Type:
                          </strong>
                          <span className={cardStyles.detailValue}>
                            {project.type}
                          </span>
                        </div>
                        <div className={cardStyles.detailRow}>
                          <strong className={cardStyles.detailLabel}>
                            Target:
                          </strong>
                          <span className={cardStyles.detailValue}>
                            {project.target}
                          </span>
                        </div>
                        <div className={cardStyles.detailRow}>
                          <strong className={cardStyles.detailLabel}>
                            Problem:
                          </strong>
                          <span className={cardStyles.detailValue}>
                            {project.problem}
                          </span>
                        </div>
                      </div>
                      <div className={cardStyles.techContainer}>
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className={cardStyles.techBadge}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      {project.liveUrl && (
                        <div className={cardStyles.buttonContainer}>
                          <Button
                            size="sm"
                            asChild
                            className="h-6 text-xs px-2 py-0"
                          >
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-2.5 h-2.5 mr-1" />
                              {project.liveLabel || "View"}
                            </a>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}

              {/* Then we render clones of the first items for continuity when scrolling forward */}
              {currentIndex >= projects.length - itemsPerSlide &&
                projects.slice(0, itemsPerSlide).map((project, index) => (
                  <div
                    key={`after-${index}`}
                    className="px-4 flex-shrink-0"
                    style={{ width: `${100 / itemsPerSlide}%` }}
                  >
                    <Card className={cardStyles.card}>
                      <AccessibleImage
                        project={project}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                      <CardHeader className={cardStyles.header}>
                        <CardTitle className={cardStyles.title}>
                          {project.title}
                        </CardTitle>
                        <CardDescription className={cardStyles.description}>
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className={cardStyles.content}>
                        <div className={cardStyles.detailsContainer}>
                          <div className={cardStyles.detailRow}>
                            <strong className={cardStyles.detailLabel}>
                              Type:
                            </strong>
                            <span className={cardStyles.detailValue}>
                              {project.type}
                            </span>
                          </div>
                          <div className={cardStyles.detailRow}>
                            <strong className={cardStyles.detailLabel}>
                              Target:
                            </strong>
                            <span className={cardStyles.detailValue}>
                              {project.target}
                            </span>
                          </div>
                          <div className={cardStyles.detailRow}>
                            <strong className={cardStyles.detailLabel}>
                              Problem:
                            </strong>
                            <span className={cardStyles.detailValue}>
                              {project.problem}
                            </span>
                          </div>
                        </div>
                        <div className={cardStyles.techContainer}>
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className={cardStyles.techBadge}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        {project.liveUrl && (
                          <div className={cardStyles.buttonContainer}>
                            <Button
                              size="sm"
                              asChild
                              className="h-6 text-xs px-2 py-0"
                            >
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-2.5 h-2.5 mr-1" />
                                {project.liveLabel || "View"}
                              </a>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
          </div>

          {/* Pause/Play button for accessibility */}
          <div className="flex justify-center mt-2 items-center">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="mr-3 text-xs flex items-center focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-1.5 py-0.5"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              <span className="sr-only">
                {isPaused ? "Play" : "Pause"} slideshow
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mr-1"
              >
                {isPaused ? (
                  <polygon points="5 3 19 12 5 21 5 3" />
                ) : (
                  <>
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </>
                )}
              </svg>
              <span>{isPaused ? "Play" : "Pause"}</span>
            </button>

            <div
              className="flex gap-1.5"
              role="tablist"
              aria-label="Select a slide to show"
            >
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index * itemsPerSlide);
                    // Announce slide change for screen readers
                    const announcementDiv = document.getElementById(
                      "carousel-announcement"
                    );
                    if (announcementDiv) {
                      announcementDiv.textContent = `Showing slide group ${index + 1} of ${pageCount}`;
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-primary ${
                    Math.floor(currentIndex / itemsPerSlide) === index
                      ? "bg-primary"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                  role="tab"
                  aria-selected={
                    Math.floor(currentIndex / itemsPerSlide) === index
                  }
                  aria-label={`Go to slide group ${index + 1}`}
                  tabIndex={0}
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                >
                  <span className="sr-only">Slide group {index + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hidden live region for screen reader announcements */}
          <div
            id="carousel-announcement"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          ></div>
        </div>
      </div>
    </section>
  );
}
