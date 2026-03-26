/**
 * "Who this is for" section — a large card with an image on the left
 * and descriptive text on the right, styled to match the site's dark theme.
 */
export default function WhoSection() {
  return (
    <section className="relative z-20 bg-black pt-6 pb-44 px-8 max-sm:pt-4 max-sm:pb-28 max-sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="reveal rounded-2xl border border-white/[0.25] overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-[#0f0f0f] shadow-[0_10px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.08)]">

          {/* Image */}
          <div className="relative min-h-[240px] md:min-h-[420px] overflow-hidden">
            <img
              src="/who-this-is-for.jpg"
              alt="Silhouettes in dramatic light"
              width={600}
              height={420}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center px-10 py-12 max-sm:px-7 max-sm:py-10">
            <h2 className="font-serif font-light text-[clamp(2.4rem,5vw,3.5rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-10 max-sm:mb-8">
              <em>who</em> this is for
            </h2>

            <div className="space-y-6">
              <p className="font-sans font-light text-[1.05rem] leading-[1.8] text-[#c5c3be] max-sm:text-[0.95rem]">
                founders who see what the world <em className="text-[#f0eeea]">could be.</em>
              </p>
              <p className="font-sans font-light text-[1.05rem] leading-[1.8] text-[#c5c3be] max-sm:text-[0.95rem]">
                the ones who won&apos;t wait for someone else to <em className="text-[#f0eeea]">build&nbsp;it.</em>
              </p>
              <p className="font-sans font-light text-[1.05rem] leading-[1.8] text-[#c5c3be] max-sm:text-[0.95rem]">
                ambitious, relentless, and ready to go <em className="text-[#f0eeea]">all&nbsp;in.</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
