"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

/**
 * About page — mission intro and team listing.
 */

const founders = [
  { name: "Henry Kiamilev", title: "Carnegie Mellon", img: "/team/henry.jpg", linkedin: "https://www.linkedin.com/in/henry-kiamilev-453085372/" },
  { name: "William Mirhashemi", title: "Northwestern", img: "/team/will.jpg", linkedin: "https://www.linkedin.com/in/william-mirhashemi-1b9b0a335/" },
  { name: "Caden Chiang", title: "Berkeley", img: "/team/caden.jpg", linkedin: "https://www.linkedin.com/in/cadenchiang/" },
];

const advisors = [
  { name: "Andres Perez Soderi", title: "Carya Ventures", img: "/team/andres.jpg", linkedin: "https://www.linkedin.com/in/andresperezsoderi/" },
  { name: "Ahmed Alsubai", title: "Breakthrough Ventures", img: "/team/ahmed.jpg", linkedin: "https://www.linkedin.com/in/ahmed-alsubai/" },
];

/**
 * Renders a person card with photo, name, and optional LinkedIn link.
 *
 * @param person - Object with name, img path, and linkedin URL.
 * @returns A card element with grayscale photo and name.
 */
function PersonCard({ person }: { person: { name: string; title: string; img: string; linkedin: string } }) {
  return (
    <div>
      <div className="relative aspect-square rounded-xl overflow-hidden bg-[#1a1a1a] mb-3">
        <img
          src={person.img}
          alt={person.name}
          className="absolute inset-0 w-full h-full object-cover object-top grayscale brightness-110 contrast-[1.1] hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="font-serif font-light text-[1.1rem] text-[#f0eeea] tracking-[-0.01em] max-sm:text-[0.85rem]">
            {person.name}
          </p>
          <p className="font-sans font-light text-[0.75rem] text-[#807d78] tracking-[0.01em] max-sm:text-[0.65rem]">
            {person.title}
          </p>
        </div>
        {person.linkedin && (
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} LinkedIn`} className="text-[#807d78] hover:text-white transition-colors shrink-0">
            <svg className="w-4 h-4 max-sm:w-3.5 max-sm:h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  useReveal();

  return (
    <>
      <Navbar />

      <section className="relative z-20 bg-black pt-40 pb-32 px-8 max-sm:pt-28 max-sm:px-5">
        <div className="max-w-4xl mx-auto">
          <h1 className="reveal font-serif font-light text-[clamp(2rem,6vw,4.5rem)] tracking-[-0.02em] leading-[1.1] text-[#f0eeea] mb-10">
            <em>focus</em> is a superpower.<br />community is a <em>multiplier.</em>
          </h1>

          <p className="reveal reveal-delay-1 font-sans font-light text-[1.05rem] leading-[1.9] text-[#c5c3be] mb-20 max-w-2xl max-sm:text-[0.9rem] max-sm:mb-14">
            in a world that&apos;s moving online, real connection is disappearing.
            too many founders build alone. we created endless founders to bring
            people back together — a fully funded residency where builders live
            side by side, go deep, and make something that lasts. six weeks, no
            equity, no strings.
          </p>

          {/* Founders */}
          <div className="reveal border-t border-white/[0.08] pt-14 mb-20 max-sm:mb-14">
            <p className="font-serif font-light text-[1.6rem] text-[#f0eeea] tracking-[-0.01em] mb-8 max-sm:text-[1.3rem] max-sm:mb-6">
              Founders
            </p>
            <div className="grid grid-cols-3 gap-6 max-sm:gap-3">
              {founders.map((person) => (
                <PersonCard key={person.name} person={person} />
              ))}
            </div>
          </div>

          {/* Advisors */}
          <div className="reveal border-t border-white/[0.08] pt-14">
            <p className="font-serif font-light text-[1.6rem] text-[#f0eeea] tracking-[-0.01em] mb-8 max-sm:text-[1.3rem] max-sm:mb-6">
              Advisors
            </p>
            <div className="grid grid-cols-3 gap-6 max-sm:gap-3">
              {advisors.map((person) => (
                <PersonCard key={person.name} person={person} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
