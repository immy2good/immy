import { useState, useEffect } from "react";

const titles = [
  "MT4/MT5 Expert Advisor Developer",
  "Pine Script & TradingView Developer",
  "AI Agent & MCP Engineer",
  "iTradeAIMS Founder since 2011",
  "Spec-first, test-heavy builder",
];

function TypewriterEffect() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [phase, setPhase] = useState("typing");
  const [reducedMotion, setReducedMotion] = useState(false);

  // Visitors who ask for less motion get the first title, still.
  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const currentTitle = titles[currentTitleIndex];

    if (phase === "typing") {
      if (currentText.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentTitle.slice(0, currentText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => setPhase("pausing"), 650);
      return () => clearTimeout(timeout);
    }

    if (phase === "pausing") {
      const timeout = setTimeout(() => setPhase("deleting"), 650);
      return () => clearTimeout(timeout);
    }

    if (currentText.length > 0) {
      const timeout = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1));
      }, 25);
      return () => clearTimeout(timeout);
    }

    setCurrentTitleIndex((currentTitleIndex + 1) % titles.length);
    setPhase("typing");
  }, [currentText, currentTitleIndex, phase, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="flex items-center justify-center h-12 sm:h-16">
        <span className="text-slate-400">{titles[0]}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-12 sm:h-16">
      <span className="border-r-2 border-primary pr-1 animate-pulse-border">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-400">
          {currentText}
        </span>
      </span>
    </div>
  );
}

export default TypewriterEffect;
