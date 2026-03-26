"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Initializes Lenis smooth scrolling and a scroll progress bar.
 * Dispatches a custom 'lenis-scroll' event so other components can pause during scroll.
 */
export default function SmoothScroll() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    lenis.on("scroll", () => {
      if (barRef.current) {
        const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        barRef.current.style.width = `${Math.min(progress * 100, 100)}%`;
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <div ref={barRef} className="scroll-progress" />;
}
