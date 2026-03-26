/**
 * Benefits section — numbered cards over shared marble background.
 */

const benefits = [
  {
    num: "01",
    title: "deep work",
    description:
      "six weeks of uninterrupted focus on your startup. no distractions, no noise. just you and your company.",
  },
  {
    num: "02",
    title: "mentorship",
    description:
      "1:1 sessions with founders who've built and exited, industry operators, and investors who get it.",
  },
  {
    num: "03",
    title: "community",
    description:
      "live and work alongside ambitious builders. shared meals, late nights, and friendships that last beyond the program.",
  },
  {
    num: "04",
    title: "fully covered",
    description:
      "flights, housing, and food are on us. zero equity taken. we invest in you with no strings attached.",
  },
  {
    num: "05",
    title: "investor access",
    description:
      "demo day in front of top VCs and angels. plus warm introductions throughout the residency to the people who fund what comes next.",
  },
];

export default function ProgramSection() {
  return (
    <section id="program" className="relative z-0 overflow-hidden">
      {/* Dark overlay — shared fixed marble shows through behind */}
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* Top fade — black to transparent so it blends from the section above */}
      <div className="absolute top-0 left-0 w-full h-[30%] z-[1] pointer-events-none [background:linear-gradient(to_bottom,rgb(0,0,0)_0%,rgba(0,0,0,0.7)_40%,transparent_100%)]" />

      {/* Bottom fade — transparent to black so it blends into next section */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] z-[1] pointer-events-none [background:linear-gradient(to_top,rgb(0,0,0)_0%,rgba(0,0,0,0.7)_40%,transparent_100%)]" />

      <div className="relative z-10 py-32 px-8 max-sm:py-20 max-sm:px-5">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <h2 className="reveal font-serif font-light text-[clamp(3rem,7vw,5.5rem)] tracking-[-0.03em] leading-[1.05] text-white mb-16 max-sm:text-[clamp(2.2rem,10vw,3.5rem)] max-sm:mb-10 [text-shadow:0_4px_40px_rgba(0,0,0,0.5)]">
            benefits
          </h2>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {benefits.slice(0, 3).map((b) => (
              <BenefitCard key={b.num} benefit={b} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {benefits.slice(3).map((b) => (
              <BenefitCard key={b.num} benefit={b} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ benefit }: { benefit: { num: string; title: string; description: string } }) {
  return (
    <div className="reveal bg-[#111] border border-white/[0.15] rounded-2xl p-7 max-sm:p-5 shadow-[0_10px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/[0.25] hover:shadow-[0_14px_60px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300">
      <div className="flex items-start justify-between mb-5">
        <h3 className="font-sans font-bold text-[1.4rem] text-white tracking-[-0.01em] max-sm:text-[1.2rem]">
          {benefit.title}
        </h3>
        <span className="font-sans font-medium text-[0.8rem] text-white/20 shrink-0 ml-4">
          {benefit.num}
        </span>
      </div>
      <p className="font-sans font-light text-[0.9rem] leading-[1.7] text-white/50 max-sm:text-[0.85rem]">
        {benefit.description}
      </p>
    </div>
  );
}
