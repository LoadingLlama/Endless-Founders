/**
 * Statement section — full-width white break with large serif typography.
 * GSE Partners-style contrast section between dark sections.
 */
export default function StatementSection() {
  return (
    <section className="relative z-20 bg-[#f5f4f1] py-44 px-8 max-sm:py-28 max-sm:px-6 overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Small label */}
        <p className="reveal font-sans font-medium text-[0.8rem] tracking-[0.15em] text-[#1a1a1a]/40 mb-12 max-sm:mb-8">
          endless founders
        </p>

        {/* Giant statement */}
        <h2 className="reveal reveal-delay-1 font-serif font-normal text-[clamp(2.8rem,7vw,6rem)] tracking-[-0.03em] leading-[1.08] text-[#1a1a1a] mb-16 max-sm:mb-10 max-sm:text-[clamp(2rem,9vw,3.2rem)]">
          we believe the best companies<br className="max-sm:hidden" />{" "}
          are built by people who{" "}
          <em>refuse to wait</em>
        </h2>

        {/* Stats row */}
        <div className="reveal reveal-delay-2 flex items-center justify-center gap-16 max-sm:gap-8 max-sm:flex-wrap">
          {[
            { value: "6", label: "weeks" },
            { value: "100%", label: "covered" },
            { value: "0%", label: "equity taken" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif font-light text-[2.8rem] text-[#1a1a1a] tracking-[-0.02em] leading-none mb-1 max-sm:text-[2rem]">
                {stat.value}
              </p>
              <p className="font-sans font-light text-[0.75rem] tracking-[0.1em] text-[#1a1a1a]/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
