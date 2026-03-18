"use client";

import MarbleBackground from "@/components/MarbleBackground";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ProgramSection from "@/components/ProgramSection";
import FAQSection from "@/components/FAQSection";
import StatementSection from "@/components/StatementSection";
import ApplySection from "@/components/ApplySection";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  useReveal();

  return (
    <>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <MarbleBackground />

        {/* Bottom fade — smooth to black so it blends into next section */}
        <div className="absolute bottom-0 left-0 w-full h-[45%] z-[3] pointer-events-none [background:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.9)_80%,rgb(0,0,0)_100%)]" />

        {/* Center content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8 max-sm:px-6">
          {/* Title */}
          <h1 className="font-serif font-light text-[clamp(3.5rem,10vw,8.5rem)] tracking-[-0.02em] leading-none text-[#f0eeea] mb-[2rem] opacity-0 translate-y-[30px] animate-[fadeUp_1.4s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] [text-shadow:0_4px_80px_rgba(0,0,0,0.9),0_2px_30px_rgba(0,0,0,0.7)] max-sm:text-[clamp(2.6rem,13vw,4.5rem)] max-sm:mb-[1.2rem]">
            <em>endless</em> founders
          </h1>

          {/* Subtitle */}
          <p className="font-sans font-light text-[clamp(0.9rem,1.8vw,1.25rem)] tracking-[0.02em] text-[#d5d3ce] mb-10 opacity-0 translate-y-[20px] animate-[fadeUp_1.2s_cubic-bezier(0.16,1,0.3,1)_0.6s_forwards] [text-shadow:0_2px_20px_rgba(0,0,0,0.8)] max-sm:text-[0.85rem] max-sm:mb-8">
            applications for the summer 2026 cohort open now
          </p>

          {/* Frosted glass Apply button with arrow */}
          <div className="opacity-0 translate-y-[20px] animate-[fadeUp_1.2s_cubic-bezier(0.16,1,0.3,1)_0.9s_forwards]">
            <a
              href="https://www.livetheresidency.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-8 py-3 font-sans font-medium text-[1.2rem] tracking-[0.01em] text-white bg-white/[0.18] border-none rounded-full cursor-pointer transition-all duration-300 hover:bg-white/[0.25] active:scale-[0.97] max-sm:px-7 max-sm:py-2.5 max-sm:text-[1rem]"
            >
              <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-[4px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12h20" />
                <path d="M16 6l6 6-6 6" />
              </svg>
              apply
            </a>
          </div>

        </div>

        {/* Bottom bar: location left, socials right */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between px-10 pb-8 opacity-0 animate-[fadeIn_1s_ease_1.8s_forwards] max-sm:px-6 max-sm:pb-6">
          {/* Location */}
          <div className="font-sans font-light text-[0.85rem] tracking-[0.02em] text-[#d5d3ce] [text-shadow:0_2px_12px_rgba(0,0,0,0.8)] max-sm:text-[0.75rem]">
            location tbd
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5 max-sm:gap-4">
            <a
              href="https://www.linkedin.com/company/endless-founder/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#d5d3ce] hover:text-white transition-colors"
            >
              <svg className="w-[18px] h-[18px] max-sm:w-4 max-sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTIONS ─── */}
      <AboutSection />
      <ProgramSection />
      <FAQSection />
      <ApplySection />
      <Footer />
    </>
  );
}
