"use client";

import MarbleBackground from "@/components/MarbleBackground";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ProgramSection from "@/components/ProgramSection";
import FAQSection from "@/components/FAQSection";
import StatementSection from "@/components/StatementSection";
import WhoSection from "@/components/WhoSection";
import ApplySection from "@/components/ApplySection";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  useReveal();

  return (
    <>
      <Navbar />

      {/* Single shared marble — fixed behind everything */}
      <MarbleBackground className="fixed top-0 left-0 w-full h-full z-0" />

      {/* ─── HERO ─── */}
      <section className="relative z-10 h-screen overflow-hidden" style={{ height: "100dvh" }}>

        {/* Bottom fade — smooth to black so it blends into next section */}
        <div className="absolute bottom-0 left-0 w-full h-[45%] z-[3] pointer-events-none [background:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.9)_80%,rgb(0,0,0)_100%)]" />

        {/* Center content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8 max-sm:px-6">
          {/* Title */}
          <h1 className="reveal font-serif font-light text-[clamp(3.5rem,10vw,8.5rem)] tracking-[-0.02em] leading-none text-[#f0eeea] mb-[2rem] [text-shadow:0_4px_80px_rgba(0,0,0,0.9),0_2px_30px_rgba(0,0,0,0.7)] max-sm:text-[clamp(2.6rem,13vw,4.5rem)] max-sm:mb-[1.2rem]">
            <em>endless</em> founders
          </h1>

          {/* Subtitle */}
          <p className="reveal reveal-delay-1 font-sans font-light text-[clamp(0.9rem,1.8vw,1.25rem)] tracking-[0.02em] text-[#d5d3ce] mb-10 [text-shadow:0_2px_20px_rgba(0,0,0,0.8)] max-sm:text-[0.85rem] max-sm:mb-8">
            applications for the summer 2026 cohort open now
          </p>

          {/* Apply link — underlined, lifts on hover */}
          <div className="reveal reveal-delay-2">
            <a
              href="/apply"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-sans font-medium text-[1.4rem] tracking-[0.01em] text-white border-b-2 border-white/40 pb-px hover:border-white hover:-translate-y-[2px] transition-all duration-300 max-sm:text-[1.1rem] max-sm:min-h-[44px]"
            >
              apply now
            </a>
          </div>

        </div>

      </section>

      {/* ─── SECTIONS ─── */}
      <AboutSection />
      <WhoSection />
      <ProgramSection />
      <FAQSection />
      <ApplySection />
      <Footer />
    </>
  );
}
