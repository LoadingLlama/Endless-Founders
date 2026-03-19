/**
 * Footer — location, socials, and bottom mark.
 * Static footer at the bottom of the scrollable page.
 */
export default function Footer() {
  return (
    <footer className="relative z-20 bg-black border-t border-white/[0.06] py-10 px-8 max-sm:px-6 mb-0">
      <div className="max-w-5xl mx-auto flex items-center justify-between max-sm:flex-col max-sm:items-center max-sm:text-center max-sm:gap-5">
        {/* Location */}
        <div className="font-sans font-light text-[0.75rem] tracking-[0.06em] text-[#b0ada8]">
          <svg
            style={{ width: 10, height: 10, marginRight: 5, verticalAlign: -1, opacity: 0.7, display: "inline" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          location tbd
        </div>

        {/* Center mark */}
        <div className="flex items-center gap-2 max-sm:order-last">
          <span className="font-sans font-light text-[0.7rem] tracking-[0.3em] text-[#807d78]">
            endless founders
          </span>
          <div className="w-[3px] h-[3px] rounded-full bg-[#807d78]" />
          <span className="font-sans font-light text-[0.7rem] tracking-[0.3em] text-[#807d78]">
            2026
          </span>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/company/endless-founder/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#b0ada8] hover:text-[#f0eeea] transition-colors max-sm:min-w-[44px] max-sm:min-h-[44px] max-sm:flex max-sm:items-center max-sm:justify-center"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
