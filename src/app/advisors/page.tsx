"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

/**
 * Advisors page — placeholder until advisor roster is finalized.
 */
export default function AdvisorsPage() {
  useReveal();

  return (
    <>
      <Navbar />

      <section className="relative z-20 bg-black pt-40 pb-32 px-8 max-sm:pt-28 max-sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="reveal font-serif font-light text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-10">
            <em>advisors</em>
          </h1>

          <p className="reveal reveal-delay-1 font-sans font-light text-[1.05rem] leading-[1.9] text-[#c5c3be] max-w-2xl mb-20">
            founders and operators who've built from zero. not advisors in title — peers who've walked the path.
          </p>

          <div className="reveal border-t border-white/[0.08] pt-14">
            <p className="font-serif font-light text-[2rem] text-[#f0eeea] tracking-[-0.01em] mb-4 max-sm:text-[1.5rem]">
              announcements coming soon.
            </p>
            <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be] max-w-lg">
              we're assembling a world-class group of founders, operators, and investors. follow us on linkedin for updates.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
