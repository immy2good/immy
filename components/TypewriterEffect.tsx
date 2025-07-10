import { useState, useEffect } from "react";


function TypewriterEffect() {
  const titles = [
    "Software Engineer | Full Stack Developer",
    "MBA Marketing | BSc Computer Science", 
    "Quantitative Analyst | Financial Engineer",
    "Entrepreneur | Founder | Investor",
    "Author | Blogger | Youtuber",
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
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200">
        {currentText}
      </span>
    </span>

  );
}
export default TypewriterEffect;