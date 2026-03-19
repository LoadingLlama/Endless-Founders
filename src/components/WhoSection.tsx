/**
 * "Who this is for" section — a large card with an image on the left
 * and descriptive text on the right, styled to match the site's dark theme.
 */
export default function WhoSection() {
  return (
    <section className="relative z-20 bg-black py-32 px-8 max-sm:py-20 max-sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="reveal reveal-delay-1 rounded-2xl border border-white/[0.08] overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-[#0a0a0a]">

          {/* Image */}
          <div className="relative min-h-[240px] md:min-h-[420px] overflow-hidden">
            <img
              src="/who-this-is-for.jpg"
              alt="Silhouettes in dramatic light"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center px-10 py-12 max-sm:px-7 max-sm:py-10">
            <h2 className="font-serif font-light text-[clamp(2.4rem,5vw,3.5rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-10 max-sm:mb-8">
              <em>who</em> this is for
            </h2>

            <div className="space-y-6">
              <p className="font-sans font-light text-[1.25rem] leading-[1.8] text-[#c5c3be] max-sm:text-[1.1rem]">
                founders who can&apos;t stop <em className="text-[#f0eeea]">building.</em>
              </p>
              <p className="font-sans font-light text-[1.25rem] leading-[1.8] text-[#c5c3be] max-sm:text-[1.1rem]">
                the ones who see what&apos;s broken and <em className="text-[#f0eeea]">fix&nbsp;it.</em>
              </p>
              <p className="font-sans font-light text-[1.25rem] leading-[1.8] text-[#c5c3be] max-sm:text-[1.1rem]">
                ambitious, relentless, and ready to go <em className="text-[#f0eeea]">all in.</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
