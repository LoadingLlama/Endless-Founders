"use client";

import { useEffect, useState } from "react";

/**
 * Floating pill navbar centered at top.
 * Layout: About Us | Apply Now (white pill) | Advisors
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-sm:top-4"
      style={{ opacity: 0, animation: "fadeIn 1s ease 1.5s forwards" }}
    >
      <nav
        className={`flex items-center gap-1.5 px-2.5 py-2 rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl"
            : "bg-white/[0.06] backdrop-blur-sm"
        }`}
      >
        <a
          href="/about"
          className="font-sans font-normal text-[0.85rem] tracking-[0.01em] text-white/80 hover:text-white px-6 py-2 rounded-full transition-colors"
        >
          about us
        </a>

        <a
          href="https://www.livetheresidency.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans font-semibold text-[0.85rem] tracking-[0.01em] text-black bg-white px-6 py-1.5 rounded-full hover:bg-white/90 transition-all"
        >
          apply now
        </a>

        <a
          href="/advisors"
          className="font-sans font-normal text-[0.85rem] tracking-[0.01em] text-white/80 hover:text-white px-6 py-2 rounded-full transition-colors"
        >
          advisors
        </a>
      </nav>
    </div>
  );
}
