"use client";

import { useState, useRef, useEffect } from "react";

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
  "how you found us",
];

export default function ApplyPage() {
  const [activeSection, setActiveSection] = useState("about you");
  const [form, setForm] = useState<FormData>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState<"" | "saving" | "saved">("");
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const contentRef = useRef<HTMLDivElement>(null);

  const isActive = form.stage !== undefined && form.stage !== "i have an idea";

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ef-application");
    if (saved) { try { setForm(JSON.parse(saved)); } catch {} }
  }, []);

  // Autosave to localStorage on change
  useEffect(() => {
    if (Object.keys(form).length === 0) return;
    setSaveStatus("saving");
    const t = setTimeout(() => {
      localStorage.setItem("ef-application", JSON.stringify(form));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 2000);
    }, 500);
    return () => clearTimeout(t);
  }, [form]);

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
    { key: "age", label: "age", section: "your experience" },
    { key: "location", label: "location", section: "your experience" },
    { key: "linkedin", label: "linkedin", section: "your experience" },
    { key: "school", label: "school", section: "your experience" },
    { key: "major", label: "major", section: "your experience" },
    { key: "has_cofounder", label: "cofounder", section: "your experience" },
    { key: "one_belief", label: "one thing only you believe", section: "your experience" },
    { key: "looking_for_cofounder", label: "looking for cofounder", section: "your experience" },
    { key: "accomplishments", label: "accomplishments", section: "your experience" },
    { key: "skills", label: "skills", section: "your experience" },
    { key: "stage", label: "stage", section: "your idea" },
    { key: "problem", label: "problem you're solving", section: "your idea" },
    { key: "building", label: "your solution", section: "your idea" },
    { key: "world_needs", label: "how world needs this", section: "your idea" },
    { key: "why_you", label: "why you're the best person", section: "your idea" },
    { key: "target_user", label: "target user", section: "your idea" },
    { key: "talked_to_users", label: "talked to users", section: "your idea" },
    { key: "why_ef", label: "why endless founders", section: "your idea" },
    { key: "has_investment", label: "taken investment", section: "your idea" },
    { key: "has_legal_entity", label: "legal entity", section: "your idea" },
    { key: "fundraising", label: "fundraising", section: "your idea" },
    { key: "how_heard", label: "how you heard about us", section: "your commitment" },
    { key: "inspired_by", label: "who inspired you", section: "your commitment" },
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
      // Scroll to the first missing field's section
      const sectionId = missing[0].section.replace(/\s/g, "-");
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
              className={`text-left font-sans text-[0.85rem] px-0 py-2 transition-colors ${
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

            <h1 className="font-serif font-light text-[2.2rem] text-[#f0eeea] tracking-[-0.02em] leading-none mb-1">endless founders application</h1>
            <p className="font-sans font-light text-[0.85rem] text-[#807d78] mb-3">early june to mid august · cohort I</p>
            <p className="font-sans font-light text-[0.75rem] text-[#807d78]/60 mb-12">note: please don&apos;t include links except where we specifically ask. part of what we&apos;re evaluating is how well you can explain your work without leaning on external references.</p>

            {error && (
              <div className="mb-6 px-4 py-3 bg-red-900/20 border border-red-500/30 rounded-lg font-sans text-[0.85rem] text-red-400 hidden">{error}</div>
            )}

            {/* ── 1. YOUR EXPERIENCE ── */}
            <Sec id="your-experience" title="your experience" onVisible={() => setActiveSection("your experience")}>
              <F label="first name" required invalid={isInvalid("first_name")}><In value={form.first_name as string} onChange={(v) => set("first_name", v)} invalid={isInvalid("first_name")} /></F>
              <F label="last name" required invalid={isInvalid("last_name")}><In value={form.last_name as string} onChange={(v) => set("last_name", v)} invalid={isInvalid("last_name")} /></F>
              <F label="email" required invalid={isInvalid("email")}><In type="email" value={form.email as string} onChange={(v) => set("email", v)} placeholder="you@example.com" invalid={isInvalid("email")} /></F>
              <F label="age" required invalid={isInvalid("age")}><In value={form.age as string} onChange={(v) => set("age", v)} placeholder="e.g. 21" invalid={isInvalid("age")} /></F>
              <F label="school" required invalid={isInvalid("school")}><In value={form.school as string} onChange={(v) => set("school", v)} placeholder="e.g. uc berkeley, n/a" invalid={isInvalid("school")} /></F>
              <F label="major" required invalid={isInvalid("major")}><In value={form.major as string} onChange={(v) => set("major", v)} placeholder="e.g. computer science, n/a" invalid={isInvalid("major")} /></F>
              <F label="where do you live currently?" required invalid={isInvalid("location")}><In value={form.location as string} onChange={(v) => set("location", v)} placeholder="e.g. san francisco, ca" invalid={isInvalid("location")} /></F>
              <F label="linkedin" required invalid={isInvalid("linkedin")}><In value={form.linkedin as string} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/in/..." invalid={isInvalid("linkedin")} /></F>
              <F label="x / twitter"><In value={form.twitter as string} onChange={(v) => set("twitter", v)} placeholder="https://x.com/..." /></F>
              <F label="what are your 2-3 most important accomplishments over the past 3 years?" required invalid={isInvalid("accomplishments")}>
                <Ta value={form.accomplishments as string} onChange={(v) => set("accomplishments", v)} placeholder="professional, personal, or academic — whatever you're most proud of" invalid={isInvalid("accomplishments")} maxChars={350} />
              </F>
              <F label="what's your superpower? what skills do you bring?" required invalid={isInvalid("skills")}>
                <Ta value={form.skills as string} onChange={(v) => set("skills", v)} placeholder="e.g. full-stack engineer, designer, sales, domain expertise" invalid={isInvalid("skills")} />
              </F>
              <F label="what is one thing only you believe?" required invalid={isInvalid("one_belief")}>
                <Ta value={form.one_belief as string} onChange={(v) => set("one_belief", v)} placeholder="e.g. most productivity tools fail because they add complexity instead of removing it" invalid={isInvalid("one_belief")} />
              </F>
              <F label="past programs (accelerators, residencies, etc.)">
                <In value={form.past_programs as string} onChange={(v) => set("past_programs", v)} placeholder="e.g. Y Combinator, Techstars, none" />
              </F>
              <F label="do you have a cofounder?" required invalid={isInvalid("has_cofounder")}>
                <Toggle value={form.has_cofounder as boolean | null} onChange={(v) => set("has_cofounder", v)} invalid={isInvalid("has_cofounder")} />
              </F>
              <F label="are you looking for a cofounder?" required invalid={isInvalid("looking_for_cofounder")}>
                <Toggle value={form.looking_for_cofounder as boolean | null} onChange={(v) => set("looking_for_cofounder", v)} invalid={isInvalid("looking_for_cofounder")} />
              </F>
            </Sec>

            {/* ── 2. YOUR IDEA ── */}
            <Sec id="your-idea" title="your idea" onVisible={() => setActiveSection("your idea")}>
              <F label="where are you at right now?" required invalid={isInvalid("stage")}>
                <div className={`flex flex-wrap gap-2 ${isInvalid("stage") ? "ring-1 ring-red-500/60 rounded-lg p-2 -m-2" : ""}`}>
                  {STAGES.map((s) => (
                    <button key={s} onClick={() => set("stage", s)}
                      className={`font-sans text-[0.8rem] px-4 py-2 rounded-lg border transition-colors min-h-[44px] max-sm:flex-1 max-sm:text-[0.78rem] ${
                        form.stage === s ? "bg-white text-black border-white" : "bg-transparent text-[#807d78] border-white/[0.1] hover:border-white/[0.25]"
                      }`}>{s}</button>
                  ))}
                </div>
              </F>
              <F label="what's the ultimate vision you're building towards? 50 characters or less" required invalid={isInvalid("problem")}>
                <In value={form.problem as string} onChange={(v) => set("problem", v)} placeholder="e.g making life multiplanetary" invalid={isInvalid("problem")} maxLength={50} />
              </F>
              <F label="describe what you're building or investigating in 50 characters or less" required invalid={isInvalid("building")}>
                <In value={form.building as string} onChange={(v) => set("building", v)} placeholder="e.g. ai tool that automates student workflows" invalid={isInvalid("building")} maxLength={50} />
              </F>
              <F label="how do you know the world needs what you're making?" required invalid={isInvalid("world_needs")}>
                <Ta value={form.world_needs as string} onChange={(v) => set("world_needs", v)} placeholder="what have you seen, heard, or experienced that tells you this matters?" invalid={isInvalid("world_needs")} />
              </F>
              <F label="why are you the best person to build this?" required invalid={isInvalid("why_you")}>
                <Ta value={form.why_you as string} onChange={(v) => set("why_you", v)} placeholder="what unique experience, insight, or skill makes you the right founder for this?" invalid={isInvalid("why_you")} />
              </F>
              <F label="who is this for?" required invalid={isInvalid("target_user")}>
                <In value={form.target_user as string} onChange={(v) => set("target_user", v)} placeholder="e.g. freelance designers, college students" invalid={isInvalid("target_user")} />
              </F>
              <F label="have you talked to potential users?" required invalid={isInvalid("talked_to_users")}>
                <Toggle value={form.talked_to_users as boolean | null} onChange={(v) => set("talked_to_users", v)} invalid={isInvalid("talked_to_users")} />
              </F>
              <F label="have you formed any legal entity yet?" required invalid={isInvalid("has_legal_entity")}>
                <p className="font-sans font-light text-[0.7rem] text-[#807d78] mb-2">this may be in the united states or another country.</p>
                <Toggle value={form.has_legal_entity as boolean | null} onChange={(v) => set("has_legal_entity", v)} invalid={isInvalid("has_legal_entity")} />
              </F>
              <F label="have you taken any investment?" required invalid={isInvalid("has_investment")}>
                <Toggle value={form.has_investment as boolean | null} onChange={(v) => set("has_investment", v)} invalid={isInvalid("has_investment")} />
              </F>
              <F label="are you currently fundraising?" required invalid={isInvalid("fundraising")}>
                <Toggle value={form.fundraising as boolean | null} onChange={(v) => set("fundraising", v)} invalid={isInvalid("fundraising")} />
              </F>
              <F label="link to product, demo, or github">
                <In value={form.product_link as string} onChange={(v) => set("product_link", v)} placeholder="https://... (skip if n/a)" />
              </F>
            </Sec>

            {/* ── 3. YOUR COMMITMENT ── */}
            <Sec id="your-commitment" title="your commitment" onVisible={() => setActiveSection("your commitment")}>
              <F label="can you commit to the full 6 weeks? (early june – mid august)" required invalid={isInvalid("can_commit_6_weeks")}>
                <Toggle value={form.can_commit_6_weeks as boolean | null} onChange={(v) => set("can_commit_6_weeks", v)} invalid={isInvalid("can_commit_6_weeks")} />
              </F>
              <F label="are you doing anything else this summer? (e.g. internship, job)" required invalid={isInvalid("other_commitments")}>
                <Ta value={form.other_commitments as string} onChange={(v) => set("other_commitments", v)} placeholder="e.g. no — this is my full focus / yes, part-time internship at X" invalid={isInvalid("other_commitments")} />
              </F>
              <F label="what would you focus on during the 6 weeks?" required invalid={isInvalid("six_week_focus")}>
                <Ta value={form.six_week_focus as string} onChange={(v) => set("six_week_focus", v)} placeholder="specific milestones or goals you'd work towards" invalid={isInvalid("six_week_focus")} />
              </F>
            </Sec>

            {/* ── 4. HOW YOU FOUND US ── */}
            <Sec id="how-you-found-us" title="how you found us" onVisible={() => setActiveSection("how you found us")}>
              <F label="how did you hear about endless founders?" required invalid={isInvalid("how_heard")}>
                <select value={(form.how_heard as string) || ""} onChange={(e) => set("how_heard", e.target.value)}
                  className={`w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.08] rounded-lg outline-none transition-colors appearance-none cursor-pointer max-sm:text-[1rem] border ${
                    isInvalid("how_heard") ? "border-red-500/60" : "border-white/[0.1] focus:border-white/[0.25]"
                  }`}>
                  <option value="" className="bg-[#1a1a1a]">select</option>
                  <option value="instagram" className="bg-[#1a1a1a]">instagram</option>
                  <option value="twitter" className="bg-[#1a1a1a]">twitter</option>
                  <option value="linkedin" className="bg-[#1a1a1a]">linkedin</option>
                  <option value="email" className="bg-[#1a1a1a]">email</option>
                  <option value="word of mouth" className="bg-[#1a1a1a]">word of mouth</option>
                  <option value="other" className="bg-[#1a1a1a]">other</option>
                </select>
              </F>
              <F label="who or what inspired you to apply?" required invalid={isInvalid("inspired_by")}>
                <Ta value={form.inspired_by as string} onChange={(v) => set("inspired_by", v)} invalid={isInvalid("inspired_by")} />
              </F>
              <F label="anything else?">
                <Ta value={form.anything_else as string} onChange={(v) => set("anything_else", v)} maxChars={2000} />
              </F>
            </Sec>

            {/* Save status */}
            {saveStatus && (
              <p className={`text-center font-sans text-[0.7rem] mb-6 transition-opacity duration-500 ${saveStatus === "saved" ? "text-[#807d78]/60" : "text-[#807d78]/30"}`}>
                {saveStatus === "saving" ? "saving..." : "saved"}
              </p>
            )}

            {/* Submit */}
            <div className="mt-10 mb-20 flex flex-col items-center gap-4">
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
        {label}{required && <span className="text-red-400 ml-1">*</span>}
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
        className={`w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.08] rounded-lg outline-none transition-colors placeholder:text-[#807d78] max-sm:text-[1rem] max-sm:py-3.5 border ${
          invalid ? "border-red-500/60" : "border-white/[0.1] focus:border-white/[0.25]"
        }`} />
      {maxLength && <p className="mt-1 font-sans text-[0.7rem] text-[#807d78]">{(value || "").length}/{maxLength}</p>}
    </div>
  );
}

function Ta({ value, onChange, placeholder, invalid, maxChars = 350 }: {
  value?: string; onChange: (v: string) => void; placeholder?: string; invalid?: boolean; maxChars?: number;
}) {
  const charCount = (value || "").length;
  const over = charCount > maxChars;

  return (
    <div className="relative">
      <textarea value={value || ""} onChange={(e) => { if (e.target.value.length <= maxChars) onChange(e.target.value); }} placeholder={placeholder} rows={4}
        className={`w-full px-4 py-3 pb-7 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.08] rounded-lg outline-none transition-colors resize-y placeholder:text-[#807d78] max-sm:text-[1rem] max-sm:py-3.5 max-sm:pb-7 border ${
          invalid ? "border-red-500/60" : over ? "border-amber-500/50" : "border-white/[0.1] focus:border-white/[0.25]"
        }`} />
      <span className={`absolute bottom-2.5 right-3.5 font-sans text-[0.6rem] pointer-events-none ${charCount > maxChars * 0.9 ? "text-amber-400/70" : "text-[#807d78]/40"}`}>{charCount}/{maxChars}</span>
    </div>
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
