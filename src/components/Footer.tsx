/**
 * Footer — distinct section with white text and linkedin.
 */
export default function Footer() {
  return (
    <footer className="relative z-20 bg-[#111] border-t border-white/[0.1] py-12 px-8 max-sm:px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between max-sm:flex-col max-sm:items-center max-sm:text-center max-sm:gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="font-sans font-light text-[0.8rem] tracking-[0.2em] text-white">
            endless founders
          </span>
          <div className="w-[3px] h-[3px] rounded-full bg-white/40" />
          <span className="font-sans font-light text-[0.8rem] tracking-[0.2em] text-white">
            2026
          </span>
        </div>

        {/* Socials */}
        <a
          href="https://www.linkedin.com/company/endless-founder/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-white/70 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
