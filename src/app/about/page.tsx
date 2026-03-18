"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

/**
 * About page — mission, vision, and what endless founders is about.
 */
export default function AboutPage() {
  useReveal();

  return (
    <>
      <Navbar />

      <section className="relative z-20 bg-black pt-40 pb-20 px-8 max-sm:pt-28 max-sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="reveal font-serif font-light text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-8">
            about <em>endless founders</em>
          </h1>

          <p className="reveal reveal-delay-1 font-sans font-light text-[1.1rem] leading-[1.9] text-[#c5c3be] mb-12 max-w-3xl">
            endless founders is a 6-week residency for early-stage founders who want to build with focus, surrounded by community. no distractions, no fluff — just the space and people to do your best work.
          </p>
        </div>
      </section>

      <section className="relative z-20 bg-black pb-32 px-8 max-sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="font-serif font-light text-[1.8rem] text-[#f0eeea] tracking-[-0.01em] mb-4">
                <em>why</em> we exist
              </h2>
              <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be]">
                the best companies are built by founders who have room to think clearly. most early-stage founders don't have that luxury — they're drowning in noise, isolated, and burning out. we built endless founders to change that.
              </p>
            </div>

            <div>
              <h2 className="font-serif font-light text-[1.8rem] text-[#f0eeea] tracking-[-0.01em] mb-4">
                <em>what</em> we believe
              </h2>
              <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be]">
                focus is a superpower. community is a multiplier. when you put ambitious founders in a room with nothing but time and each other, extraordinary things happen. we believe in depth over breadth, craft over speed.
              </p>
            </div>
          </div>

          <div className="reveal border-t border-white/[0.08] pt-16 mb-20">
            <h2 className="font-serif font-light text-[1.8rem] text-[#f0eeea] tracking-[-0.01em] mb-4">
              <em><strong>investment</strong></em>
            </h2>
            <p className="font-serif font-light text-[3.5rem] text-[#f0eeea] tracking-[-0.02em] mb-3">
              $0
            </p>
            <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be] max-w-md">
              we don't take equity. we take your commitment. endless founders is free — we believe access to community and focus shouldn't come at the cost of your cap table.
            </p>
          </div>

          <div className="reveal border-t border-white/[0.08] pt-16">
            <h2 className="font-serif font-light text-[1.8rem] text-[#f0eeea] tracking-[-0.01em] mb-8">
              the <em><strong>residency</strong></em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <p className="font-sans font-light text-[0.65rem] tracking-[0.3em] text-[#807d78] mb-2">
                  format
                </p>
                <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be]">
                  6 weeks of co-living and co-working. shared meals, weekly dinners, optional workshops, and access to mentors. your time is yours — we just create the conditions.
                </p>
              </div>

              <div>
                <p className="font-sans font-light text-[0.65rem] tracking-[0.3em] text-[#807d78] mb-2">
                  who it's for
                </p>
                <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be]">
                  early-stage founders — solo or with a co-founder — actively building a product or company. strong conviction, bias toward action, and a desire to go deep.
                </p>
              </div>

              <div>
                <p className="font-sans font-light text-[0.65rem] tracking-[0.3em] text-[#807d78] mb-2">
                  cohort
                </p>
                <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be]">
                  12–16 founders per cohort. small enough to build real relationships, large enough to have diverse perspectives. inaugural cohort: summer 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
