"use client";

import { useState } from "react";

/**
 * FAQ accordion section. Each question expands/collapses on click.
 *
 * @returns FAQ section with collapsible items.
 */

const faqs = [
  {
    q: "who is this for?",
    a: "early-stage founders — solo or with a co-founder — who are actively building a product or company. we're looking for people with strong conviction and a bias toward action.",
  },
  {
    q: "how long is the residency?",
    a: "six weeks. long enough to make real progress, short enough to stay focused. the inaugural cohort runs summer 2026.",
  },
  {
    q: "what does it cost?",
    a: "details on pricing and any available fellowships will be shared during the application process.",
  },
  {
    q: "where is it located?",
    a: "location will be announced soon. we're selecting a space that balances focus with inspiration — expect somewhere beautiful, intentional, and away from the noise.",
  },
  {
    q: "how many founders per cohort?",
    a: "12 to 16. small enough to build real relationships, large enough to have diverse perspectives in the room.",
  },
  {
    q: "what happens during the six weeks?",
    a: "your time is yours. we provide the space, community, and structure — shared meals, weekly dinners, optional workshops, and access to mentors. the rest is deep work on your company.",
  },
  {
    q: "how do I apply?",
    a: "applications are open now. click 'apply' to start the process. we review applications on a rolling basis.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-white/[0.08]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
      >
        <span className="font-sans font-light text-[1rem] text-[#f0eeea] tracking-wide group-hover:text-white transition-colors pr-8">
          {q}
        </span>
        <span
          className={`font-sans font-light text-[1.2rem] text-[#807d78] transition-transform duration-300 shrink-0 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "max-h-[300px] pb-6" : "max-h-0"
        }`}
      >
        <p className="font-sans font-light text-[0.9rem] leading-[1.8] text-[#c5c3be] max-w-2xl">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="relative z-20 bg-black py-32 px-8 max-sm:py-20 max-sm:px-6">
      <div className="max-w-3xl mx-auto">

        <h2 className="reveal reveal-delay-1 font-serif font-light text-[clamp(2.2rem,5vw,4rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-16 max-sm:mb-10">
          questions?
        </h2>

        <div className="reveal reveal-delay-2">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
          <div className="border-t border-white/[0.08]" />
        </div>
      </div>
    </section>
  );
}
