/**
 * "What to expect" section — lists what founders get during the residency.
 */
const items = [
  "shared meals and a tight-knit community of founders going through the same thing.",
  "tracks, mentors, and tailored resources \u2014 available if you want them, never forced.",
  "dedicated workspace and housing so you can do your best work.",
  "a demo day at the end to show the world what you\u2019ve built.",
];

export default function ExpectSection() {
  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 px-8 max-sm:py-20 max-sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="reveal reveal-delay-1 font-serif font-light text-[clamp(2.2rem,5vw,4rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-20 max-sm:mb-14">
          what to expect
        </h2>

        <div className="reveal reveal-delay-2 space-y-0">
          {items.map((item) => (
            <div
              key={item}
              className="border-t border-white/[0.08] py-8 md:py-10"
            >
              <p className="font-sans font-light text-[1.05rem] leading-[1.8] text-[#c5c3be] max-w-3xl">
                {item}
              </p>
            </div>
          ))}
          <div className="border-t border-white/[0.08]" />
        </div>
      </div>
    </section>
  );
}
