"use client";

import { useState, useRef } from "react";

/**
 * Application form — same form for everyone.
 * Fields marked required for "actively building" are optional for "idea" stage.
 * Dark themed, left sidebar nav, submits to /api/apply → Supabase.
 */

type FormData = Record<string, string | boolean | null>;

const STAGES = ["i have an idea", "mvp built", "users but pre-revenue", "revenue"] as const;

const sections = [
  "your experience",
  "your idea",
  "your commitment",
];

export default function ApplyPage() {
  const [activeSection, setActiveSection] = useState("about you");
  const [form, setForm] = useState<FormData>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const contentRef = useRef<HTMLDivElement>(null);

  const isActive = form.stage !== undefined && form.stage !== "i have an idea";

  function isInvalid(key: string) {
    if (!touched.has(key)) return false;
    const val = form[key];
    if (val === null || val === undefined) return true;
    if (typeof val === "string" && val.trim() === "") return true;
    return false;
  }

  function set(key: string, value: string | boolean | null) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function scrollToSection(id: string) {
    setActiveSection(id);
    const el = document.getElementById(id.replace(/\s/g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const [showConfirm, setShowConfirm] = useState(false);

  const requiredFields: { key: string; label: string; section: string }[] = [
    { key: "first_name", label: "first name", section: "your experience" },
    { key: "last_name", label: "last name", section: "your experience" },
    { key: "email", label: "email", section: "your experience" },
    { key: "location", label: "location", section: "your experience" },
    { key: "linkedin", label: "linkedin", section: "your experience" },
    { key: "accomplishments", label: "accomplishments", section: "your experience" },
    { key: "skills", label: "skills", section: "your experience" },
    { key: "stage", label: "stage", section: "your idea" },
    { key: "problem", label: "problem you're solving", section: "your idea" },
    { key: "building", label: "your solution", section: "your idea" },
    { key: "why_this_idea", label: "why you're obsessed", section: "your idea" },
    { key: "target_user", label: "target user", section: "your idea" },
    { key: "why_ef", label: "why endless founders", section: "your idea" },
    { key: "can_commit_6_weeks", label: "6-week commitment", section: "your commitment" },
    { key: "six_week_focus", label: "6-week focus", section: "your commitment" },
    { key: "other_commitments", label: "other summer plans", section: "your commitment" },
  ];

  function getMissingFields() {
    return requiredFields.filter(({ key }) => {
      const val = form[key];
      if (val === null || val === undefined) return true;
      if (typeof val === "string" && val.trim() === "") return true;
      return false;
    });
  }

  function handleSubmitClick() {
    setError("");
    const missing = getMissingFields();
    if (missing.length > 0) {
      // Mark all required fields as touched so they show red outlines
      setTouched(new Set(requiredFields.map((f) => f.key)));
      scrollToSection(missing[0].section);
      return;
    }
    setShowConfirm(true);
  }

  async function handleConfirmedSubmit() {
    setShowConfirm(false);
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
          <a href="/" className="inline-flex items-center justify-center mt-8 font-sans font-medium text-[0.85rem] text-[#f0eeea] border-b border-white/30 pb-0.5 hover:border-white transition-colors min-h-[44px]">back to home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black h-screen flex max-sm:block max-sm:h-auto max-sm:overflow-y-auto">
      {/* Left sidebar — fixed, no scroll */}
      <aside className="hidden md:flex flex-col w-[280px] shrink-0 h-screen px-12 pt-12 border-r border-white/[0.04]">
        <a href="/" className="block font-serif font-light text-[1rem] text-[#f0eeea] tracking-[-0.02em] mb-8">endless founders</a>
        <nav className="flex flex-col gap-0.5">
          {sections.map((s) => (
            <button key={s} onClick={() => scrollToSection(s)}
              className={`text-left font-sans text-[0.8rem] px-0 py-2 transition-colors ${
                activeSection === s ? "font-semibold text-[#f0eeea]" : "font-light text-[#807d78] hover:text-[#f0eeea]"
              }`}>{s}</button>
          ))}
        </nav>
      </aside>

      {/* Right side — scrollable */}
      <div ref={contentRef} className="flex-1 h-screen overflow-y-auto px-12 pt-12 pb-20 max-sm:h-auto max-sm:px-5 max-sm:pt-8">
        <main className="max-w-xl">
            <div className="md:hidden mb-8">
              <a href="/" className="font-serif font-light text-[1rem] text-[#f0eeea] inline-flex items-center min-h-[44px]">endless founders</a>
            </div>

            <h1 className="font-serif font-light text-[1.6rem] text-[#f0eeea] tracking-[-0.02em] leading-none mb-1">the application</h1>
            <p className="font-sans font-light text-[0.85rem] text-[#807d78] mb-12">summer 2026 · takes about 10 minutes</p>

            {error && (
              <div className="mb-6 px-4 py-3 bg-red-900/20 border border-red-500/30 rounded-xl font-sans text-[0.85rem] text-red-400 hidden">{error}</div>
            )}

            {/* ── 1. YOUR EXPERIENCE ── */}
            <Sec id="your-experience" title="your experience" onVisible={() => setActiveSection("your experience")}>
              <F label="first name" required invalid={isInvalid("first_name")}><In value={form.first_name as string} onChange={(v) => set("first_name", v)} invalid={isInvalid("first_name")} /></F>
              <F label="last name" required invalid={isInvalid("last_name")}><In value={form.last_name as string} onChange={(v) => set("last_name", v)} invalid={isInvalid("last_name")} /></F>
              <F label="email" required invalid={isInvalid("email")}><In type="email" value={form.email as string} onChange={(v) => set("email", v)} placeholder="you@example.com" invalid={isInvalid("email")} /></F>
              <F label="where do you live currently?" required invalid={isInvalid("location")}><In value={form.location as string} onChange={(v) => set("location", v)} placeholder="e.g. san francisco, ca" invalid={isInvalid("location")} /></F>
              <F label="linkedin" required invalid={isInvalid("linkedin")}><In value={form.linkedin as string} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/in/..." invalid={isInvalid("linkedin")} /></F>
              <F label="x / twitter"><In value={form.twitter as string} onChange={(v) => set("twitter", v)} placeholder="https://x.com/..." /></F>
              <F label="what are your 2-3 most important accomplishments over the past 3 years?" required invalid={isInvalid("accomplishments")}>
                <Ta value={form.accomplishments as string} onChange={(v) => set("accomplishments", v)} placeholder="professional, personal, or academic — whatever you're most proud of" invalid={isInvalid("accomplishments")} />
              </F>
              <F label="what's your superpower? what skills do you bring?" required invalid={isInvalid("skills")}>
                <Ta value={form.skills as string} onChange={(v) => set("skills", v)} placeholder="e.g. full-stack engineer, designer, sales, domain expertise" invalid={isInvalid("skills")} />
              </F>
              <F label="past programs (accelerators, residencies, etc.)">
                <In value={form.past_programs as string} onChange={(v) => set("past_programs", v)} placeholder="e.g. Y Combinator, Techstars, none" />
              </F>
              <F label="do you have a cofounder?">
                <Toggle value={form.has_cofounder as boolean | null} onChange={(v) => set("has_cofounder", v)} />
              </F>
            </Sec>

            {/* ── 2. YOUR IDEA ── */}
            <Sec id="your-idea" title="your idea" onVisible={() => setActiveSection("your idea")}>
              <F label="where are you at right now?" required invalid={isInvalid("stage")}>
                <div className={`flex flex-wrap gap-2 ${isInvalid("stage") ? "ring-1 ring-red-500/60 rounded-xl p-2 -m-2" : ""}`}>
                  {STAGES.map((s) => (
                    <button key={s} onClick={() => set("stage", s)}
                      className={`font-sans text-[0.8rem] px-4 py-2 rounded-lg border transition-colors min-h-[44px] max-sm:flex-1 max-sm:text-[0.78rem] ${
                        form.stage === s ? "bg-white text-black border-white" : "bg-transparent text-[#807d78] border-white/[0.1] hover:border-white/[0.25]"
                      }`}>{s}</button>
                  ))}
                </div>
              </F>
              <F label="what problem are you solving?" required invalid={isInvalid("problem")}>
                <Ta value={form.problem as string} onChange={(v) => set("problem", v)} placeholder="what's broken, painful, or missing?" invalid={isInvalid("problem")} />
              </F>
              <F label="what's your solution? (even if rough)" required invalid={isInvalid("building")}>
                <Ta value={form.building as string} onChange={(v) => set("building", v)} placeholder="describe what you're building or want to build" invalid={isInvalid("building")} />
              </F>
              <F label="why are you obsessed with this?" required invalid={isInvalid("why_this_idea")}>
                <Ta value={form.why_this_idea as string} onChange={(v) => set("why_this_idea", v)} placeholder="what keeps you up at night about this problem?" invalid={isInvalid("why_this_idea")} />
              </F>
              <F label="who is this for?" required invalid={isInvalid("target_user")}>
                <In value={form.target_user as string} onChange={(v) => set("target_user", v)} placeholder="your target user or customer" invalid={isInvalid("target_user")} />
              </F>
              <F label="have you talked to potential users?">
                <Toggle value={form.talked_to_users as boolean | null} onChange={(v) => set("talked_to_users", v)} />
              </F>
              <F label="are people using it?">
                <Toggle value={form.has_users as boolean | null} onChange={(v) => set("has_users", v)} />
              </F>
              {form.has_users === true && (
                <F label="roughly how many?"><In value={form.user_count as string} onChange={(v) => set("user_count", v)} /></F>
              )}
              <F label="do you have revenue?">
                <Toggle value={form.has_revenue as boolean | null} onChange={(v) => set("has_revenue", v)} />
              </F>
              <F label="link to product, demo, or github">
                <In value={form.product_link as string} onChange={(v) => set("product_link", v)} placeholder="https://... (skip if n/a)" />
              </F>
              <F label="why do you want to live and build with other founders?" required invalid={isInvalid("why_ef")}>
                <Ta value={form.why_ef as string} onChange={(v) => set("why_ef", v)} placeholder="what about the residency appeals to you?" invalid={isInvalid("why_ef")} />
              </F>
            </Sec>

            {/* ── 3. YOUR COMMITMENT ── */}
            <Sec id="your-commitment" title="your commitment" onVisible={() => setActiveSection("your commitment")}>
              <F label="can you commit to the full 6 weeks?" required invalid={isInvalid("can_commit_6_weeks")}>
                <Toggle value={form.can_commit_6_weeks as boolean | null} onChange={(v) => set("can_commit_6_weeks", v)} invalid={isInvalid("can_commit_6_weeks")} />
              </F>
              <F label="are you working on this full-time?" required={isActive}>
                <Toggle value={form.full_time as boolean | null} onChange={(v) => set("full_time", v)} />
              </F>
              <F label="are you doing anything else this summer? (e.g. internship, job)" required invalid={isInvalid("other_commitments")}>
                <Ta value={form.other_commitments as string} onChange={(v) => set("other_commitments", v)} placeholder="e.g. no — this is my full focus / yes, part-time internship at X" invalid={isInvalid("other_commitments")} />
              </F>
              <F label="what would you focus on during the 6 weeks?" required invalid={isInvalid("six_week_focus")}>
                <Ta value={form.six_week_focus as string} onChange={(v) => set("six_week_focus", v)} placeholder="specific milestones or goals you'd work towards" invalid={isInvalid("six_week_focus")} />
              </F>
              <F label="how did you hear about us?">
                <In value={form.how_heard as string} onChange={(v) => set("how_heard", v)} placeholder="e.g. linkedin, friend, twitter" />
              </F>
              <F label="anything else?">
                <Ta value={form.anything_else as string} onChange={(v) => set("anything_else", v)} />
              </F>
            </Sec>

            {/* Submit */}
            <div className="mt-16 mb-20 flex flex-col items-center gap-4">
              <button onClick={handleSubmitClick} disabled={submitting}
                className="font-sans font-semibold text-[0.9rem] text-black bg-white px-10 py-3.5 rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed max-sm:w-full max-sm:py-4">
                {submitting ? "submitting..." : "submit application"}
              </button>
              <p className="font-sans font-light text-[0.7rem] text-[#807d78] max-sm:text-[0.65rem] max-sm:break-all">
                if you have any issues, email support@endlessfounder.live
              </p>
            </div>

            {/* Confirmation modal */}
            {showConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
                <div className="bg-[#111] border border-white/[0.1] rounded-2xl p-8 max-w-md w-full text-center">
                  <h3 className="font-serif font-light text-[1.4rem] text-[#f0eeea] mb-3">ready to submit?</h3>
                  <p className="font-sans font-light text-[0.85rem] text-[#c5c3be] leading-[1.7] mb-8">
                    please make sure everything looks good — you won&apos;t be able to edit after submitting.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => setShowConfirm(false)}
                      className="font-sans text-[0.85rem] text-[#807d78] px-6 py-2.5 rounded-full border border-white/[0.1] hover:border-white/[0.2] transition-colors">
                      go back
                    </button>
                    <button onClick={handleConfirmedSubmit} disabled={submitting}
                      className="font-sans font-semibold text-[0.85rem] text-black bg-white px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors disabled:opacity-50">
                      {submitting ? "submitting..." : "confirm & submit"}
                    </button>
                  </div>
                </div>
              </div>
            )}
        </main>
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

function F({ label, required, invalid, children }: { label: string; required?: boolean; invalid?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-sans font-medium text-[0.8rem] text-[#c5c3be] mb-2">
        {label}{required && <span className="text-white/40 ml-1">*</span>}
      </label>
      {children}
      {invalid && <p className="mt-1.5 font-sans font-light text-[0.7rem] text-red-400/70">required</p>}
    </div>
  );
}

function In({ value, onChange, placeholder, type = "text", maxLength, invalid }: {
  value?: string; onChange: (v: string) => void; placeholder?: string; type?: string; maxLength?: number; invalid?: boolean;
}) {
  return (
    <div>
      <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={maxLength}
        className={`w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.04] rounded-xl outline-none transition-colors placeholder:text-[#807d78] max-sm:text-[1rem] max-sm:py-3.5 border ${
          invalid ? "border-red-500/60" : "border-white/[0.1] focus:border-white/[0.25]"
        }`} />
      {maxLength && <p className="mt-1 font-sans text-[0.7rem] text-[#807d78]">{(value || "").length}/{maxLength}</p>}
    </div>
  );
}

function Ta({ value, onChange, placeholder, invalid }: {
  value?: string; onChange: (v: string) => void; placeholder?: string; invalid?: boolean;
}) {
  return (
    <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4}
      className={`w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.04] rounded-xl outline-none transition-colors resize-y placeholder:text-[#807d78] max-sm:text-[1rem] max-sm:py-3.5 border ${
        invalid ? "border-red-500/60" : "border-white/[0.1] focus:border-white/[0.25]"
      }`} />
  );
}

function Toggle({ value, onChange, invalid }: { value: boolean | null; onChange: (v: boolean) => void; invalid?: boolean }) {
  const base = invalid ? "border-red-500/60" : "border-white/[0.1] hover:border-white/[0.25]";
  return (
    <div className="flex gap-2">
      <button onClick={() => onChange(true)}
        className={`font-sans text-[0.8rem] px-5 py-2 rounded-lg border transition-colors min-h-[44px] min-w-[44px] ${
          value === true ? "bg-white text-black border-white" : `bg-transparent text-[#807d78] ${base}`}`}>yes</button>
      <button onClick={() => onChange(false)}
        className={`font-sans text-[0.8rem] px-5 py-2 rounded-lg border transition-colors min-h-[44px] min-w-[44px] ${
          value === false ? "bg-white text-black border-white" : `bg-transparent text-[#807d78] ${base}`}`}>no</button>
    </div>
  );
}
