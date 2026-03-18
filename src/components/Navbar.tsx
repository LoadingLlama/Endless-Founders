"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Floating pill navbar centered at top.
 * Layout: home | apply now | about us
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
      style={isHome ? { opacity: 0, animation: "fadeIn 0.4s ease 0.6s forwards" } : undefined}
    >
      <nav
        className={`flex items-center gap-1.5 px-2.5 py-2 rounded-full transition-all duration-300 max-sm:gap-1 max-sm:px-1.5 max-sm:py-1.5 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl"
            : "bg-white/[0.06] backdrop-blur-sm"
        }`}
      >
        <a
          href="/"
          className="font-sans font-normal text-[0.85rem] tracking-[0.01em] text-white/80 hover:text-white px-6 py-2 rounded-full transition-colors max-sm:px-4 max-sm:py-2 max-sm:text-[0.78rem]"
        >
          home
        </a>

        <a
          href="/apply"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans font-semibold text-[0.85rem] tracking-[0.01em] text-black bg-white px-6 py-1.5 rounded-full hover:bg-white/90 transition-all max-sm:px-4 max-sm:py-1.5 max-sm:text-[0.78rem]"
        >
          apply now
        </a>

        <a
          href="/about"
          className="font-sans font-normal text-[0.85rem] tracking-[0.01em] text-white/80 hover:text-white px-6 py-2 rounded-full transition-colors max-sm:px-4 max-sm:py-2 max-sm:text-[0.78rem]"
        >
          about us
        </a>
      </nav>
    </div>
  );
}
