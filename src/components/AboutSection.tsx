/**
 * About section — mission intro and team listing.
 */
export default function AboutSection() {
  return (
    <section id="about" className="relative z-20 bg-black py-32 px-8 max-sm:py-20 max-sm:px-6">
      <div className="max-w-5xl mx-auto">

        <h2 className="reveal reveal-delay-1 font-serif font-light text-[clamp(2.2rem,5vw,4rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-12 max-w-3xl">
          a residency for founders <em><strong>building the future.</strong></em>
        </h2>

        <div className="reveal reveal-delay-2 max-w-3xl">
          <p className="font-sans font-light text-[0.95rem] leading-[1.8] text-[#c5c3be] mb-8">
            six weeks. a small group of founders. one goal — build something real.
            whether you have an idea or are already building, we cover flights, housing,
            and food so you can focus entirely on your company.
          </p>
        </div>

        {/* Team */}
        <div className="reveal reveal-delay-3 mt-20 pt-16 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-sm:gap-10">
            <div>
              <p className="font-sans font-light text-[0.65rem] tracking-[0.3em] text-[#807d78] mb-4">
                organizers
              </p>
              <div className="space-y-2">
                {["Henry", "Will", "Caden"].map((name) => (
                  <p key={name} className="font-serif font-light text-[1.2rem] text-[#f0eeea] tracking-[-0.01em]">
                    {name}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="font-sans font-light text-[0.65rem] tracking-[0.3em] text-[#807d78] mb-4">
                advisors
              </p>
              <div className="space-y-2">
                {["Andres Perez Soderi", "Ahmed"].map((name) => (
                  <p key={name} className="font-serif font-light text-[1.2rem] text-[#f0eeea] tracking-[-0.01em]">
                    {name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
