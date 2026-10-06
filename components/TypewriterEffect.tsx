import { useState, useEffect } from "react";

function TypewriterEffect() {
  const titles = [
    "AI Product & Automation Engineer",
    "Agentic Systems Builder",
    "FinTech Founder & Product Builder",
    "Applied AI / ML Practitioner",
    "Business Operator & Problem Solver",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
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
  }, [currentText, currentTitleIndex, phase, titles]);

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
