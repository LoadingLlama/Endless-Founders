"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * Floating bubble navbar centered at top.
 * Elevated with shadow and blur, collapses to hamburger on mobile.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const linkClass = (path: string) =>
    `font-sans font-normal text-[0.85rem] tracking-[0.01em] hover:text-white px-4 py-2 rounded-full transition-colors min-h-[44px] flex items-center ${
      pathname === path ? "text-white underline underline-offset-4 decoration-white/60" : "text-white/70"
    }`;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-sm:top-3 max-sm:left-3 max-sm:right-3 max-sm:translate-x-0">
      {/* Desktop nav */}
      <nav
        className={`hidden md:flex items-center gap-1 px-3 py-2.5 rounded-full transition-all duration-500 whitespace-nowrap border border-white/[0.12] shadow-[0_10px_50px_rgba(0,0,0,0.8),0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] ${
          scrolled
            ? "bg-[#111]/95 border-white/[0.15] shadow-[0_14px_60px_rgba(0,0,0,0.9),0_6px_25px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
            : "bg-[#111]/85"
        }`}
      >
        <Link href="/" prefetch className={linkClass("/")}> home </Link>
        <Link href="/about" prefetch className={linkClass("/about")}> about us </Link>
        <a
          href="/apply"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans font-semibold text-[0.85rem] tracking-[0.01em] text-black bg-white px-5 py-1.5 rounded-full hover:bg-white/90 hover:scale-[1.02] transition-all min-h-[44px] flex items-center"
        >
          apply now
        </a>
        <Link href="/backing" prefetch className={linkClass("/backing")}> the backing </Link>
        <Link href="/contact" prefetch className={linkClass("/contact")}> contact </Link>
      </nav>

      {/* Mobile nav */}
      <div className="md:hidden">
        <div className={`flex items-center justify-between px-4 py-2.5 rounded-full transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)] ${
          scrolled || menuOpen
            ? "bg-[#111]/95"
            : "bg-[#111]/80"
        }`}>
          <a
            href="/apply"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-semibold text-[0.8rem] text-black bg-white px-4 py-1.5 rounded-full"
          >
            apply now
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white/80 w-11 h-11 flex items-center justify-center"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? "max-h-[300px] mt-2" : "max-h-0"
        }`}>
          <div className="bg-[#111]/95 rounded-2xl py-3 px-2 shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)] flex flex-col gap-0.5">
            {[
              { href: "/", label: "home" },
              { href: "/about", label: "about us" },
              { href: "/backing", label: "the backing" },
              { href: "/contact", label: "contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                className={`font-sans text-[0.9rem] px-4 py-3 rounded-xl transition-colors ${
                  pathname === item.href
                    ? "text-white bg-white/[0.08] font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
