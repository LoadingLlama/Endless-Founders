"use client";

import { useEffect } from "react";

/**
 * Sets up IntersectionObserver to add 'visible' class to elements with 'reveal' class.
 * Uses threshold 0 so even opacity:0 elements trigger.
 * Observes on mount and once more after a short delay to catch late-rendered content.
 */
export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px", threshold: 0 }
    );

    function observeAll() {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
        observer.observe(el);
      });
    }

    observeAll();
    // Catch any elements rendered after initial mount
    const timer = setTimeout(observeAll, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}
