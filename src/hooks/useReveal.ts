"use client";

import { useEffect } from "react";

/**
 * Sets up IntersectionObserver to add 'visible' class to elements with 'reveal' class.
 * Uses threshold 0 so even opacity:0 elements trigger.
 * Re-observes on DOM changes to catch dynamically rendered content.
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

    // Re-observe when DOM changes
    const mutation = new MutationObserver(observeAll);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);
}
