"use client";

import { useEffect } from "react";

// Fades each page section up as it scrolls into view. Does nothing under reduced motion.
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("rv-in");
          io.unobserve(e.target);
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll("main > section, main > header").forEach((el) => {
      // Anything already on screen stays put, so the first paint never flashes.
      // (A floor on the height covers a page that loads in a hidden or collapsed window.)
      if (el.getBoundingClientRect().top < Math.max(window.innerHeight, 600)) return;
      el.classList.add("rv");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
