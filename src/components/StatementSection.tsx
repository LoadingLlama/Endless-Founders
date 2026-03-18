/**
 * Big statement section — large serif typography with italic emphasis
 * and a dashed "apply now" text link. Inspired by The Residency layout.
 */
export default function StatementSection() {
  return (
    <section className="relative z-20 bg-[#f5f4f1] py-40 px-8 text-center max-sm:py-24 max-sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Brand mark */}
        <p className="reveal font-sans font-medium text-[0.95rem] tracking-[0.02em] text-[#1a1a1a] mb-10">
          endless founders
        </p>

        {/* Giant statement */}
        <h2 className="reveal reveal-delay-1 font-serif font-normal text-[clamp(2.8rem,7vw,6.5rem)] tracking-[-0.03em] leading-[1.05] text-[#1a1a1a] mb-14 max-sm:mb-10 max-sm:text-[clamp(2rem,10vw,3.5rem)]">
          <em>build and launch</em> with<br className="max-sm:hidden" />{" "}
          the ambitious
        </h2>

      </div>
    </section>
  );
}
