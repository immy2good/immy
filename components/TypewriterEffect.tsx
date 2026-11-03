"use client";

import { useEffect, useState } from "react";

const TICK_MS = 65;
const HOLD_TICKS = 28; // pause on a finished word
const GAP_TICKS = 5; // pause before the next word

// Types each word, holds it, deletes it, moves on. Under reduced motion it shows the first word, still.
export function TypewriterEffect({ words, className }: { words: string[]; className?: string }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let word = 0;
    let chars = 0;
    let deleting = false;
    let pause = 0;
    setText("");
    const timer = setInterval(() => {
      if (pause > 0) {
        pause--;
        return;
      }
      const w = words[word % words.length];
      if (!deleting) {
        chars++;
        if (chars >= w.length) {
          deleting = true;
          pause = HOLD_TICKS;
        }
      } else {
        chars--;
        if (chars <= 0) {
          deleting = false;
          word++;
          pause = GAP_TICKS;
        }
      }
      setText(w.slice(0, chars));
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [words]);

  return (
    <>
      <span className={className} aria-hidden>
        {text}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </>
  );
}
