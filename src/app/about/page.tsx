"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

/**
 * About page — concise overview of endless founders.
 */
export default function AboutPage() {
  useReveal();

  return (
    <>
      <Navbar />

      <section className="relative z-20 bg-black pt-40 pb-32 px-8 max-sm:pt-28 max-sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="reveal font-serif font-light text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-10">
            <em>focus</em> is a superpower.<br />community is a <em>multiplier.</em>
          </h1>

          <p className="reveal reveal-delay-1 font-sans font-light text-[1.05rem] leading-[1.9] text-[#c5c3be] mb-20 max-w-2xl max-sm:text-[0.95rem] max-sm:mb-14">
            endless founders is a 6-week residency where ambitious builders come together to do deep work. no pitch decks, no demo days — just the space, people, and focus to build something that matters.
          </p>

          {/* Key facts */}
          <div className="reveal grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-white/[0.08] pt-14 mb-20">
            {[
              { label: "duration", value: "6 weeks" },
              { label: "cohort", value: "12–16" },
              { label: "season", value: "summer 2026" },
              { label: "equity", value: "$0" },
              { label: "location", value: "tbd" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-sans font-light text-[0.6rem] tracking-[0.3em] text-[#807d78] mb-1.5">{s.label}</p>
                <p className="font-serif font-light text-[1.4rem] text-[#f0eeea] tracking-[-0.01em]">{s.value}</p>
              </div>
            ))}
          </div>

          {/* $0 equity callout */}
          <div className="reveal border-t border-white/[0.08] pt-14 mb-20">
            <p className="font-serif font-light text-[3rem] text-[#f0eeea] tracking-[-0.02em] mb-3 max-sm:text-[2rem]">$0 equity. ever.</p>
            <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be] max-w-lg">
              we don't take equity. we take your commitment. access to focus and community shouldn't cost your cap table.
            </p>
          </div>

          {/* Who it's for */}
          <div className="reveal border-t border-white/[0.08] pt-14">
            <h2 className="font-serif font-light text-[1.8rem] text-[#f0eeea] tracking-[-0.01em] mb-4 max-sm:text-[1.4rem]">
              who it's <em>for</em>
            </h2>
            <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be] max-w-2xl">
              we're open to anyone — whether you have an idea or are actively building your startup. solo or with a co-founder. what matters is conviction, a bias toward action, and the desire to go deep.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
