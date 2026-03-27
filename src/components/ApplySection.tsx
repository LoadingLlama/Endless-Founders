/**
 * Final CTA section — rounded card with dark gradient background.
 */
export default function ApplySection() {
  return (
    <section className="relative z-20 bg-black px-8 pt-8 pb-20 max-sm:px-4 max-sm:pt-4 max-sm:pb-12">
      <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden min-h-[380px] flex items-center justify-center max-sm:min-h-[320px]">
        {/* Dark marble-like gradient — replaces WebGL canvas for performance */}
        <div className="absolute inset-0 z-0 [background:radial-gradient(ellipse_at_30%_40%,#2a2725_0%,#1a1917_30%,#111010_60%,#0a0a09_100%)]" />
        <div className="absolute inset-0 z-0 [background:radial-gradient(ellipse_at_70%_60%,rgba(60,55,50,0.3)_0%,transparent_50%)]" />

        {/* Content */}
        <div className="relative z-10 text-center px-8 py-16 max-sm:px-6 max-sm:py-12">
          <h2 className="reveal font-serif font-light text-[clamp(2rem,5vw,3.8rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-5 [text-shadow:0_4px_40px_rgba(0,0,0,0.8)]">
            join the <em><strong>inaugural</strong></em> cohort
          </h2>

          <p className="reveal reveal-delay-1 font-sans font-light text-[0.95rem] leading-[1.8] text-[#d5d3ce] mb-10 max-w-lg mx-auto [text-shadow:0_2px_15px_rgba(0,0,0,0.8)]">
            the first class of <strong>endless founders</strong> kicks off summer 2026. apply now to be part of something built to last.
          </p>

          <div className="reveal reveal-delay-2">
            <a
              href="/apply"
              className="inline-flex items-center px-8 py-3 font-sans font-semibold text-[0.9rem] tracking-[0.02em] text-[#0a0a0a] bg-white rounded-full transition-all duration-300 hover:bg-white/90 active:scale-[0.97] min-h-[44px] max-sm:px-7 max-sm:py-3"
            >
              apply now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
