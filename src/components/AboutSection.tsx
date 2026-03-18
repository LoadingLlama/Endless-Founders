/**
 * About section — explains what Endless Founders is.
 * Renders a two-column layout with mission text and key details.
 */
export default function AboutSection() {
  return (
    <section id="about" className="relative z-20 bg-black py-32 px-8 max-sm:py-20 max-sm:px-6">
      <div className="max-w-5xl mx-auto">

        <h2 className="reveal reveal-delay-1 font-serif font-light text-[clamp(2.2rem,5vw,4rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-12 max-w-3xl">
          a residency for founders <em><strong>building the future.</strong></em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-sm:gap-10">
          <div className="reveal reveal-delay-2">
            <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be]">
              endless founders brings together a small cohort of exceptional founders
              for six weeks of deep work, shared meals, and honest conversation.
              no pitch decks, no demo days — just the space and support to build
              something that matters.
            </p>
          </div>

          <div className="reveal reveal-delay-3">
            <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be]">
              we believe the best companies are built by founders who have room to
              think clearly. the residency strips away distraction and replaces it
              with community, craft, and conviction.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="reveal reveal-delay-4 mt-20 pt-16 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 max-sm:gap-6">
            {[
              { label: "duration", value: "6 weeks" },
              { label: "cohort size", value: "12–16 founders" },
              { label: "season", value: "summer 2026" },
              { label: "location", value: "tbd" },
              { label: "equity", value: "$0" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-sans font-light text-[0.65rem] tracking-[0.3em] text-[#807d78] mb-2">
                  {item.label}
                </p>
                <p className="font-serif font-light text-[1.4rem] text-[#f0eeea] tracking-[-0.01em]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
