/**
 * Program section — numbered pillars (I–IV) with descriptions.
 */
export default function ProgramSection() {
  const pillars = [
    {
      num: "I.",
      title: "deep work",
      description:
        "dedicated time and space to focus on what matters most — your product, your vision, your craft. no meetings unless you want them.",
    },
    {
      num: "II.",
      title: "community",
      description:
        "a small group of founders who understand the weight of building something from nothing. shared meals, late-night conversations, and lasting bonds.",
    },
    {
      num: "III.",
      title: "mentorship",
      description:
        "access to seasoned founders and operators who've been where you are. not advisors — peers who've walked the path.",
    },
    {
      num: "IV.",
      title: "space",
      description:
        "a beautiful, intentional environment designed to help you think clearly. private workspace, communal areas, and room to breathe.",
    },
  ];

  return (
    <section id="program" className="relative z-20 bg-[#0a0a0a] py-32 px-8 max-sm:py-20 max-sm:px-6">
      <div className="max-w-5xl mx-auto">

        <h2 className="reveal reveal-delay-1 font-serif font-light text-[clamp(2.2rem,5vw,4rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-20 max-w-3xl max-sm:mb-14">
          what to expect
        </h2>

        <div className="reveal space-y-0">
          {pillars.map((pillar) => (
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
  );
}
