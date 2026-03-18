"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

/**
 * Advisors page — list of advisors and mentors supporting the residency.
 */

const advisors = [
  {
    name: "coming soon",
    role: "advisor announcements dropping soon",
    bio: "we're assembling a world-class group of founders, operators, and investors who've built companies from zero. stay tuned.",
  },
];

export default function AdvisorsPage() {
  useReveal();

  return (
    <>
      <Navbar />

      <section className="relative z-20 bg-black pt-40 pb-20 px-8 max-sm:pt-28 max-sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="reveal font-serif font-light text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-8">
            <em>advisors</em>
          </h1>

          <p className="reveal reveal-delay-1 font-sans font-light text-[1.1rem] leading-[1.9] text-[#c5c3be] mb-16 max-w-3xl">
            the people behind endless founders. seasoned founders, operators, and investors who've been where you are — not advisors in title, but peers who've walked the path.
          </p>
        </div>
      </section>

      <section className="relative z-20 bg-black pb-32 px-8 max-sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="reveal border-t border-white/[0.08]">
            {advisors.map((advisor) => (
              <div
                key={advisor.name}
                className="border-b border-white/[0.08] py-10 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-16"
              >
                <div>
                  <h3 className="font-serif font-light text-[1.6rem] text-[#f0eeea] tracking-[-0.01em]">
                    {advisor.name}
                  </h3>
                  <p className="font-sans font-light text-[0.8rem] text-[#807d78] mt-1">
                    {advisor.role}
                  </p>
                </div>
                <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be]">
                  {advisor.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
