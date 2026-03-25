"use client";

import MarbleBackground from "@/components/MarbleBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

/**
 * Backing page — funding partner value prop, matching home page design language.
 */
export default function BackingPage() {
  useReveal();

  return (
    <>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative h-[70vh] overflow-hidden max-sm:h-[60vh]" style={{ willChange: "transform" }}>
        <MarbleBackground className="absolute top-0 left-0 w-full h-full z-0" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-[45%] z-[3] pointer-events-none [background:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.9)_80%,rgb(0,0,0)_100%)]" />

        {/* Center content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8 max-sm:px-6">
          <h1 className="reveal font-serif font-light text-[clamp(3rem,8vw,6.5rem)] tracking-[-0.02em] leading-none text-[#f0eeea] mb-[1.5rem] [text-shadow:0_4px_80px_rgba(0,0,0,0.9),0_2px_30px_rgba(0,0,0,0.7)] max-sm:text-[clamp(2.2rem,12vw,3.5rem)]">
            <em>the</em> backing
          </h1>
          <p className="reveal reveal-delay-1 font-sans font-light text-[clamp(0.85rem,1.6vw,1.15rem)] tracking-[0.02em] text-[#d5d3ce] mb-8 [text-shadow:0_2px_20px_rgba(0,0,0,0.8)] max-sm:text-[0.85rem]">
            partnering with those who believe in what comes next
          </p>
          <div className="reveal reveal-delay-2">
            <a
              href="/contact"
              className="inline-flex items-center justify-center font-sans font-medium text-[1rem] tracking-[0.01em] text-white border-b-2 border-white/40 pb-px hover:border-white hover:-translate-y-[2px] transition-all duration-300 max-sm:text-[0.9rem] max-sm:min-h-[44px]"
            >
              get in touch
            </a>
          </div>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="relative z-20 bg-black py-32 px-8 max-sm:py-20 max-sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="reveal reveal-delay-1 font-serif font-light text-[clamp(2.2rem,5vw,4rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-12 max-w-3xl">
            the best founders start <em><strong>before anyone is watching.</strong></em>
          </h2>

          <div className="reveal reveal-delay-2 max-w-3xl">
            <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be] mb-8">
              endless founders exists to find them early. we partner with individuals and organizations
              who want to be at the table when the next generation of companies is born — not as spectators,
              but as participants in the process.
            </p>
          </div>
        </div>
      </section>

      {/* ─── THE OPPORTUNITY (numbered pillars, matching ProgramSection) ─── */}
      <section className="relative z-20 bg-[#0a0a0a] py-32 px-8 max-sm:py-20 max-sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="reveal reveal-delay-1 font-serif font-light text-[clamp(2.2rem,5vw,4rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-20 max-w-3xl max-sm:mb-14">
            the opportunity
          </h2>

          <div className="reveal space-y-0">
            {[
              {
                num: "I.",
                title: "shape the next generation",
                description:
                  "directly support and mentor young entrepreneurs at the earliest stage of their journey. your involvement helps them avoid common mistakes and accelerate their path to building something real.",
              },
              {
                num: "II.",
                title: "source the next great ideas",
                description:
                  "get preferred access to every idea built through the program. endless founders is a pipeline to the next wave of startups — a sourcing advantage before anyone else sees them.",
              },
              {
                num: "III.",
                title: "give back to the community",
                description:
                  "invest in the ecosystem that creates success. backing endless founders means creating opportunity for the next generation the same way someone once created it for you.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="border-t border-white/[0.08] py-10 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-16"
              >
                <h3 className="font-serif font-light text-[1.6rem] text-[#f0eeea] tracking-[-0.01em] max-sm:text-[1.35rem]">
                  <span className="text-[#807d78] mr-3 text-[1rem]">{pillar.num}</span>
                  {pillar.title}
                </h3>
                <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT PARTNERS RECEIVE (key facts grid, matching AboutSection) ─── */}
      <section className="relative z-20 bg-black py-32 px-8 max-sm:py-20 max-sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="reveal reveal-delay-1 font-serif font-light text-[clamp(2.2rem,5vw,4rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-20 max-w-3xl max-sm:mb-14">
            what partners receive
          </h2>

          <div className="reveal-scale mt-20 pt-16 border-t border-white/[0.08]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-14 max-sm:gap-y-10">
              {[
                { label: "access", value: "preferred visibility", detail: "first look at every idea built through the program" },
                { label: "relationships", value: "direct access", detail: "meet and mentor founders during the residency" },
                { label: "showcase", value: "demo day", detail: "exclusive seat at the end-of-program presentations" },
                { label: "recognition", value: "brand presence", detail: "featured across endless founders as a founding partner" },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-white/[0.1] pl-5">
                  <p className="font-sans font-light text-[0.75rem] tracking-[0.2em] text-[#c5c3be] mb-3">
                    {item.label}
                  </p>
                  <p className="font-serif font-light text-[2rem] text-[#f0eeea] tracking-[-0.02em] mb-2 max-sm:text-[1.6rem]">
                    {item.value}
                  </p>
                  <p className="font-sans font-light text-[0.8rem] text-[#c5c3be] leading-[1.6]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative z-20 bg-black px-8 py-20 max-sm:px-4 max-sm:py-12">
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden min-h-[320px] flex items-center justify-center max-sm:min-h-[260px]">
          <MarbleBackground className="absolute top-0 left-0 w-full h-full z-0" />
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.2)_50%,transparent_80%)]" />
          <div className="relative z-10 text-center px-8 py-16 max-sm:px-6 max-sm:py-12">
            <h2 className="reveal font-serif font-light text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-5 [text-shadow:0_4px_40px_rgba(0,0,0,0.8)]">
              interested in partnering?
            </h2>
            <p className="reveal reveal-delay-1 font-sans font-light text-[0.95rem] leading-[1.8] text-[#d5d3ce] mb-10 [text-shadow:0_2px_15px_rgba(0,0,0,0.8)] max-sm:text-[0.85rem]">
              we&apos;d love to hear from you.
            </p>
            <div className="reveal reveal-delay-2">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-3 font-sans font-semibold text-[0.9rem] tracking-[0.02em] text-[#0a0a0a] bg-white rounded-full transition-all duration-300 hover:bg-white/90 active:scale-[0.97] min-h-[44px] max-sm:px-7 max-sm:py-3"
              >
                get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
