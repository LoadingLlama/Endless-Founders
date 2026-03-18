"use client";

import { useState, useRef } from "react";

/**
 * Application form — same form for everyone.
 * Fields marked required for "actively building" are optional for "idea" stage.
 * Dark themed, left sidebar nav, submits to /api/apply → Supabase.
 */

type FormData = Record<string, string | boolean | null>;

const STAGES = ["i have an idea", "i'm actively building"] as const;

const sections = [
  "about you",
  "your stage",
  "the idea",
  "your work",
  "traction",
  "equity",
  "logistics",
  "how you found us",
];

export default function ApplyPage() {
  const [activeSection, setActiveSection] = useState("about you");
  const [form, setForm] = useState<FormData>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  const isActive = form.stage === "i'm actively building";

  function set(key: string, value: string | boolean | null) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function scrollToSection(id: string) {
    setActiveSection(id);
    const el = document.getElementById(id.replace(/\s/g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit() {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "something went wrong"); setSubmitting(false); return; }
      setSubmitted(true);
    } catch {
      setError("failed to submit. please try again.");
    }
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-8 max-sm:px-5">
        <div className="text-center max-w-md">
          <h1 className="font-serif font-light text-[2.5rem] text-[#f0eeea] tracking-[-0.02em] mb-4 max-sm:text-[1.8rem]">application submitted</h1>
          <p className="font-sans font-light text-[1rem] text-[#c5c3be] leading-[1.7]">
            thanks for applying to endless founders. we&apos;ll review your application and get back to you soon.
          </p>
          <a href="/" className="inline-block mt-8 font-sans font-medium text-[0.85rem] text-[#f0eeea] border-b border-white/30 pb-0.5 hover:border-white transition-colors">back to home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black">
      <div className="pb-20 px-8 max-sm:pt-8 max-sm:px-5">
        <div className="flex w-full gap-16 max-sm:gap-0">

          {/* Sidebar */}
          <aside className="hidden md:flex flex-col w-[200px] shrink-0 sticky top-0 self-start pt-10">
            <a href="/" className="font-serif font-light text-[1rem] text-[#f0eeea] tracking-[-0.02em] mb-10">endless founders</a>
            <nav className="flex flex-col gap-0.5">
              {sections.map((s) => (
                <button key={s} onClick={() => scrollToSection(s)}
                  className={`text-left font-sans text-[0.8rem] px-3 py-2 rounded-lg transition-colors ${
                    activeSection === s ? "font-medium text-[#f0eeea] bg-white/[0.06]" : "font-light text-[#807d78] hover:text-[#f0eeea]"
                  }`}>{s}</button>
              ))}
            </nav>
          </aside>

          {/* Form */}
          <main ref={contentRef} className="flex-1 max-w-xl pt-10 max-sm:max-w-full max-sm:w-full max-sm:pt-0">
            <div className="md:hidden mb-8">
              <a href="/" className="font-serif font-light text-[1rem] text-[#f0eeea]">endless founders</a>
            </div>

            <h1 className="font-serif font-light text-[2rem] text-[#f0eeea] tracking-[-0.02em] mb-1">the application</h1>
            <p className="font-sans font-light text-[0.85rem] text-[#807d78] mb-12">summer 2026 · takes about 10 minutes</p>

            {error && (
              <div className="mb-6 px-4 py-3 bg-red-900/20 border border-red-500/30 rounded-xl font-sans text-[0.85rem] text-red-400">{error}</div>
            )}

            {/* ── about you ── */}
            <Sec id="about-you" title="about you" onVisible={() => setActiveSection("about you")}>
              <F label="first name" required><In value={form.first_name as string} onChange={(v) => set("first_name", v)} /></F>
              <F label="last name" required><In value={form.last_name as string} onChange={(v) => set("last_name", v)} /></F>
              <F label="email" required><In type="email" value={form.email as string} onChange={(v) => set("email", v)} placeholder="you@example.com" /></F>
              <F label="where do you live currently?" required><In value={form.location as string} onChange={(v) => set("location", v)} placeholder="e.g. san francisco, ca" /></F>
              <F label="linkedin" required><In value={form.linkedin as string} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/in/..." /></F>
              <F label="x / twitter"><In value={form.twitter as string} onChange={(v) => set("twitter", v)} placeholder="https://x.com/..." /></F>
              <F label="personal or project website"><In value={form.website as string} onChange={(v) => set("website", v)} placeholder="https://..." /></F>
              <F label="do you have a cofounder?" required><Toggle value={form.has_cofounder as boolean | null} onChange={(v) => set("has_cofounder", v)} /></F>
              <F label="are you looking for a cofounder?"><Toggle value={form.looking_for_cofounder as boolean | null} onChange={(v) => set("looking_for_cofounder", v)} /></F>
              <F label="what are your 2-3 most important accomplishments over the past 3 years?" required>
                <Ta value={form.accomplishments as string} onChange={(v) => set("accomplishments", v)} />
              </F>
              <F label="what is one thing only you believe?" required>
                <Ta value={form.one_belief as string} onChange={(v) => set("one_belief", v)} />
              </F>
            </Sec>

            {/* ── your stage ── */}
            <Sec id="your-stage" title="your stage" onVisible={() => setActiveSection("your stage")}>
              <F label="where are you at right now?" required>
                <div className="flex flex-wrap gap-2">
                  {STAGES.map((s) => (
                    <button key={s} onClick={() => set("stage", s)}
                      className={`font-sans text-[0.8rem] px-4 py-2 rounded-lg border transition-colors min-h-[44px] max-sm:flex-1 max-sm:text-[0.78rem] ${
                        form.stage === s ? "bg-white text-black border-white" : "bg-transparent text-[#807d78] border-white/[0.1] hover:border-white/[0.25]"
                      }`}>{s}</button>
                  ))}
                </div>
              </F>
              <F label="are you working on this full-time?" required>
                <Toggle value={form.full_time as boolean | null} onChange={(v) => set("full_time", v)} />
              </F>
              <F label="how long have you been working on this?" required={isActive}>
                <In value={form.time_working as string} onChange={(v) => set("time_working", v)} placeholder="e.g. 3 months, just started, 1 year" />
              </F>
            </Sec>

            {/* ── the idea ── */}
            <Sec id="the-idea" title="the idea" onVisible={() => setActiveSection("the idea")}>
              <F label="what problem are you solving?" required>
                <Ta value={form.problem as string} onChange={(v) => set("problem", v)} placeholder="what's broken, painful, or missing?" />
              </F>
              <F label="what's your solution? (even if rough)" required>
                <Ta value={form.building as string} onChange={(v) => set("building", v)} placeholder="describe what you're building or want to build" />
              </F>
              <F label="what's the big vision? where does this go in 10 years?" required>
                <Ta value={form.vision as string} onChange={(v) => set("vision", v)} />
              </F>
              <F label="why you? what makes you the right person to build this?" required>
                <Ta value={form.why_you as string} onChange={(v) => set("why_you", v)} />
              </F>
              <F label="who is your target user?" required>
                <Ta value={form.target_user as string} onChange={(v) => set("target_user", v)} />
              </F>
              <F label="who are your competitors? what do you understand that they don't?">
                <Ta value={form.competitors as string} onChange={(v) => set("competitors", v)} />
              </F>
              <F label="have you talked to potential users about this problem?">
                <Toggle value={form.talked_to_users as boolean | null} onChange={(v) => set("talked_to_users", v)} />
              </F>
            </Sec>

            {/* ── your work ── */}
            <Sec id="your-work" title="your work" onVisible={() => setActiveSection("your work")}>
              <p className="font-sans font-light text-[0.8rem] text-[#807d78] -mt-4 mb-6">skip any that don&apos;t apply yet — no pressure.</p>
              <F label="link to your product"><In value={form.product_link as string} onChange={(v) => set("product_link", v)} placeholder="https://..." /></F>
              <F label="demo video"><In value={form.demo_link as string} onChange={(v) => set("demo_link", v)} placeholder="https://loom.com/..." /></F>
              <F label="github"><In value={form.github as string} onChange={(v) => set("github", v)} placeholder="https://github.com/..." /></F>
              <F label="anything else you want us to see?">
                <Ta value={form.building_details as string} onChange={(v) => set("building_details", v)} placeholder="additional context, links, pitch deck, etc." />
              </F>
            </Sec>

            {/* ── traction ── */}
            <Sec id="traction" title="traction" onVisible={() => setActiveSection("traction")}>
              <p className="font-sans font-light text-[0.8rem] text-[#807d78] -mt-4 mb-6">it&apos;s ok if you don&apos;t have traction yet — just tell us where you&apos;re at.</p>
              <F label="are people using what you're building?">
                <Toggle value={form.has_users as boolean | null} onChange={(v) => set("has_users", v)} />
              </F>
              {form.has_users === true && (
                <F label="roughly how many?"><In value={form.user_count as string} onChange={(v) => set("user_count", v)} /></F>
              )}
              <F label="key metrics (if any) — bullet points">
                <Ta value={form.traction as string} onChange={(v) => set("traction", v)} placeholder="e.g. 500 users, $2k mrr, 40% wow growth" />
              </F>
              <F label="do you have revenue?">
                <Toggle value={form.has_revenue as boolean | null} onChange={(v) => set("has_revenue", v)} />
              </F>
              {form.has_revenue === true && (
                <F label="current mrr/arr?"><In value={form.revenue_amount as string} onChange={(v) => set("revenue_amount", v)} placeholder="e.g. $2k mrr" /></F>
              )}
            </Sec>

            {/* ── equity ── */}
            <Sec id="equity" title="equity" onVisible={() => setActiveSection("equity")}>
              <F label="have you formed a legal entity?">
                <Toggle value={form.has_legal_entity as boolean | null} onChange={(v) => set("has_legal_entity", v)} />
              </F>
              <F label="equity breakdown among founders">
                <Ta value={form.equity_breakdown as string} onChange={(v) => set("equity_breakdown", v)} placeholder="e.g. 50/50, 100% me, n/a" />
              </F>
              <F label="have you taken any investment?">
                <Toggle value={form.has_investment as boolean | null} onChange={(v) => set("has_investment", v)} />
              </F>
              {form.has_investment === true && (
                <F label="how much and from whom?"><Ta value={form.funding_details as string} onChange={(v) => set("funding_details", v)} /></F>
              )}
              <F label="are you currently fundraising?">
                <Toggle value={form.fundraising as boolean | null} onChange={(v) => set("fundraising", v)} />
              </F>
            </Sec>

            {/* ── logistics ── */}
            <Sec id="logistics" title="logistics" onVisible={() => setActiveSection("logistics")}>
              <F label="have you participated in any incubators, accelerators, or residencies?">
                <Ta value={form.past_programs as string} onChange={(v) => set("past_programs", v)} placeholder="e.g. Y Combinator, Techstars, none" />
              </F>
              <F label="have you had roommates before (besides family)?" required>
                <Toggle value={form.had_roommates as boolean | null} onChange={(v) => set("had_roommates", v)} />
              </F>
              <F label="any dietary restrictions or accessibility needs?">
                <In value={form.dietary as string} onChange={(v) => set("dietary", v)} placeholder="e.g. vegetarian, none" />
              </F>
            </Sec>

            {/* ── how you found us ── */}
            <Sec id="how-you-found-us" title="how you found us" onVisible={() => setActiveSection("how you found us")}>
              <F label="how did you hear about endless founders?" required>
                <In value={form.how_heard as string} onChange={(v) => set("how_heard", v)} placeholder="e.g. linkedin, friend, twitter" />
              </F>
              <F label="who or what inspired you to apply?">
                <Ta value={form.inspired_by as string} onChange={(v) => set("inspired_by", v)} />
              </F>
              <F label="anything else you want us to know?">
                <Ta value={form.anything_else as string} onChange={(v) => set("anything_else", v)} />
              </F>
            </Sec>

            {/* Submit */}
            <div className="mt-16 mb-20 flex flex-col items-center gap-4">
              <button onClick={handleSubmit} disabled={submitting}
                className="font-sans font-semibold text-[0.9rem] text-black bg-white px-10 py-3.5 rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed max-sm:w-full max-sm:py-4">
                {submitting ? "submitting..." : "submit application"}
              </button>
              <p className="font-sans font-light text-[0.7rem] text-[#807d78]">
                if you have any issues, email support@endlessfounder.live
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Sec({ id, title, children, onVisible }: {
  id: string; title: string; children: React.ReactNode; onVisible: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useState(() => {
    if (typeof window === "undefined") return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) onVisible(); }, { rootMargin: "-30% 0px -60% 0px" });
    setTimeout(() => { if (ref.current) obs.observe(ref.current); }, 100);
  });
  return (
    <div ref={ref} id={id} className="mb-16 scroll-mt-20">
      <h2 className="font-serif font-light text-[1.5rem] text-[#f0eeea] tracking-[-0.01em] mb-8">{title}</h2>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

function F({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-sans font-medium text-[0.8rem] text-[#c5c3be] mb-2">
        {label}{required && <span className="text-white/40 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function In({ value, onChange, placeholder, type = "text", maxLength }: {
  value?: string; onChange: (v: string) => void; placeholder?: string; type?: string; maxLength?: number;
}) {
  return (
    <div>
      <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={maxLength}
        className="w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.04] border border-white/[0.1] rounded-xl outline-none focus:border-white/[0.25] transition-colors placeholder:text-[#807d78]" />
      {maxLength && <p className="mt-1 font-sans text-[0.7rem] text-[#807d78]">{(value || "").length}/{maxLength}</p>}
    </div>
  );
}

function Ta({ value, onChange, placeholder }: {
  value?: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4}
      className="w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.04] border border-white/[0.1] rounded-xl outline-none focus:border-white/[0.25] transition-colors resize-y placeholder:text-[#807d78]" />
  );
}

function Toggle({ value, onChange }: { value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => onChange(true)}
        className={`font-sans text-[0.8rem] px-5 py-2 rounded-lg border transition-colors min-h-[44px] min-w-[44px] ${
          value === true ? "bg-white text-black border-white" : "bg-transparent text-[#807d78] border-white/[0.1] hover:border-white/[0.25]"}`}>yes</button>
      <button onClick={() => onChange(false)}
        className={`font-sans text-[0.8rem] px-5 py-2 rounded-lg border transition-colors min-h-[44px] min-w-[44px] ${
          value === false ? "bg-white text-black border-white" : "bg-transparent text-[#807d78] border-white/[0.1] hover:border-white/[0.25]"}`}>no</button>
    </div>
  );
}
