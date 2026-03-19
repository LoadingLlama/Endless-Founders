"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Application form — same form for everyone.
 * Fields marked required for "actively building" are optional for "idea" stage.
 * Dark themed, left sidebar nav, submits to /api/apply → Supabase.
 */

type FormData = Record<string, string | boolean | null>;
type Cofounder = { first_name: string; last_name: string; email: string; accomplishments: string };

const STAGES = ["i have an idea", "mvp built", "users but pre-revenue", "revenue"] as const;
const emptyCofounder = (): Cofounder => ({ first_name: "", last_name: "", email: "", accomplishments: "" });

const sections = [
  "your experience",
  "your idea",
  "your commitment",
  "how you found us",
];

const HOW_HEARD_OPTIONS = ["instagram", "twitter", "linkedin", "email", "word of mouth", "other"] as const;

const STORAGE_KEY = "ef_application_form";
const STORAGE_KEY_COFOUNDERS = "ef_application_cofounders";
const STORAGE_KEY_SUBMITTED = "ef_application_submitted";

/**
 * Loads saved form data from localStorage.
 * Returns empty object/default if nothing saved or parse fails.
 */
function loadSaved<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function ApplyPage() {
  const [activeSection, setActiveSection] = useState("your experience");
  const [form, setForm] = useState<FormData>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [cofounders, setCofounders] = useState<Cofounder[]>([emptyCofounder()]);
  const [saveLabel, setSaveLabel] = useState<"idle" | "saving" | "saved">("idle");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load saved data from localStorage after hydration
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY_SUBMITTED) === "true") {
        setSubmitted(true);
        setHydrated(true);
        return;
      }
    } catch { /* silent */ }
    const savedForm = loadSaved<FormData>(STORAGE_KEY, {});
    const savedCofounders = loadSaved<Cofounder[]>(STORAGE_KEY_COFOUNDERS, [emptyCofounder()]);
    if (Object.keys(savedForm).length > 0) setForm(savedForm);
    if (savedCofounders.length > 0) setCofounders(savedCofounders);
    requestAnimationFrame(() => { isFirstRender.current = false; });
    setHydrated(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save form to localStorage on every change (skip initial render)
  useEffect(() => {
    if (isFirstRender.current) return;
    setSaveLabel("saving");
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(form)); } catch { /* storage full — silent */ }
      setSaveLabel("saved");
    }, 400);
  }, [form]);

  useEffect(() => {
    if (isFirstRender.current) return;
    setSaveLabel("saving");
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY_COFOUNDERS, JSON.stringify(cofounders)); } catch { /* storage full — silent */ }
      setSaveLabel("saved");
    }, 400);
  }, [cofounders]);

  // Save before user leaves (tab close, navigate away)
  const saveToStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      localStorage.setItem(STORAGE_KEY_COFOUNDERS, JSON.stringify(cofounders));
    } catch { /* silent */ }
  }, [form, cofounders]);

  useEffect(() => {
    window.addEventListener("beforeunload", saveToStorage);
    document.addEventListener("visibilitychange", saveToStorage);
    return () => {
      window.removeEventListener("beforeunload", saveToStorage);
      document.removeEventListener("visibilitychange", saveToStorage);
    };
  }, [saveToStorage]);

  // Clear saved data after successful submission
  function clearSavedData() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY_COFOUNDERS);
    } catch { /* silent */ }
  }

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

  function updateCofounder(idx: number, field: keyof Cofounder, value: string) {
    setCofounders((prev) => prev.map((c, i) => i === idx ? { ...c, [field]: value } : c));
  }

  function addCofounder() {
    setCofounders((prev) => [...prev, emptyCofounder()]);
  }

  function removeCofounder(idx: number) {
    setCofounders((prev) => prev.filter((_, i) => i !== idx));
  }

  function scrollToSection(id: string) {
    setActiveSection(id);
    const el = document.getElementById(id.replace(/\s/g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }


  const requiredFields: { key: string; label: string; section: string }[] = [
    { key: "first_name", label: "first name", section: "your experience" },
    { key: "last_name", label: "last name", section: "your experience" },
    { key: "email", label: "email", section: "your experience" },
    { key: "age", label: "age", section: "your experience" },
    { key: "location", label: "location", section: "your experience" },
    { key: "linkedin", label: "linkedin", section: "your experience" },
    { key: "school", label: "school", section: "your experience" },
    { key: "major", label: "major", section: "your experience" },
    { key: "one_belief", label: "one thing only you believe", section: "your experience" },
    { key: "has_cofounder", label: "has cofounder", section: "your experience" },
    { key: "looking_for_cofounder", label: "looking for cofounder", section: "your experience" },
    { key: "accomplishments", label: "accomplishments", section: "your experience" },
    { key: "skills", label: "skills", section: "your experience" },
    { key: "stage", label: "stage", section: "your idea" },
    { key: "vision", label: "vision", section: "your idea" },
    { key: "building", label: "what you're building", section: "your idea" },
    { key: "problem", label: "problem you're solving", section: "your idea" },
    { key: "why_this_idea", label: "why this idea", section: "your idea" },
    { key: "world_needs", label: "how world needs this", section: "your idea" },
    { key: "why_you", label: "why you're the best person", section: "your idea" },
    { key: "target_user", label: "target user", section: "your idea" },
    { key: "talked_to_users", label: "talked to users", section: "your idea" },
    { key: "has_legal_entity", label: "legal entity", section: "your idea" },
    { key: "has_investment", label: "taken investment", section: "your idea" },
    { key: "fundraising", label: "fundraising", section: "your idea" },
    { key: "can_commit_6_weeks", label: "6-week commitment", section: "your commitment" },
    { key: "six_week_focus", label: "6-week focus", section: "your commitment" },
    { key: "other_commitments", label: "other summer plans", section: "your commitment" },
    { key: "how_heard", label: "how you heard about us", section: "how you found us" },
  ];

  function getMissingFields() {
    const missing = requiredFields.filter(({ key }) => {
      const val = form[key];
      if (val === null || val === undefined) return true;
      if (typeof val === "string" && val.trim() === "") return true;
      return false;
    });
    // Validate cofounder fields when has_cofounder is true
    if (form.has_cofounder === true) {
      for (const c of cofounders) {
        if (!c.first_name.trim() || !c.last_name.trim() || !c.email.trim() || !c.accomplishments.trim()) {
          missing.push({ key: "cofounders", label: "cofounder details", section: "your experience" });
          break;
        }
      }
      const howMet = form.cofounder_how_met;
      if (!howMet || (typeof howMet === "string" && !howMet.trim())) {
        missing.push({ key: "cofounder_how_met", label: "how you met cofounders", section: "your experience" });
      }
      const responsibilities = form.cofounder_responsibilities;
      if (!responsibilities || (typeof responsibilities === "string" && !responsibilities.trim())) {
        missing.push({ key: "cofounder_responsibilities", label: "cofounder responsibilities", section: "your experience" });
      }
    }
    return missing;
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
    handleConfirmedSubmit();
  }

  async function handleConfirmedSubmit() {
    setSubmitting(true);
    setFieldError({});
    setError("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...(form.has_cofounder === true ? { cofounders: JSON.stringify(cofounders) } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const err = data.error || "something went wrong";
        // Map API errors to specific fields
        if (err.includes("email")) {
          setFieldError({ email: err });
          scrollToSection("your experience");
        } else if (err.includes("name")) {
          setFieldError({ first_name: err });
          scrollToSection("your experience");
        } else {
          setFieldError({ _general: err });
        }
        setSubmitting(false);
        return;
      }
      clearSavedData();
      try { localStorage.setItem(STORAGE_KEY_SUBMITTED, "true"); } catch { /* silent */ }
      setSubmitted(true);
    } catch {
      setFieldError({ _general: "failed to submit. please try again." });
    }
    setSubmitting(false);
  }

  if (!hydrated) {
    return <div className="min-h-screen bg-black" />;
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-8 max-sm:px-5">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-green-400/60 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
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
        <p className={`mt-4 font-sans font-light text-[0.7rem] text-[#807d78] transition-opacity duration-300 ${saveLabel === "saved" ? "opacity-100" : "opacity-0"}`}>
          saved
        </p>
      </aside>

      {/* Right side — scrollable */}
      <div ref={contentRef} className="flex-1 h-screen overflow-y-auto px-12 pt-12 pb-20 max-sm:h-auto max-sm:px-5 max-sm:pt-8">
        <main className="max-w-xl">
            <div className="md:hidden mb-8">
              <a href="/" className="font-serif font-light text-[1rem] text-[#f0eeea] inline-flex items-center min-h-[44px]">endless founders</a>
            </div>

            <h1 className="font-serif font-light text-[2.2rem] text-[#f0eeea] tracking-[-0.02em] leading-none mb-1 max-sm:text-[1.6rem]">endless founder application</h1>
            <p className="font-sans font-light text-[0.85rem] text-[#b5b3ae] mb-2">early june to mid august · cohort I</p>
            <p className="font-sans font-light text-[0.78rem] text-[#b5b3ae] mb-12">note: please don&apos;t include links except where we specifically ask. part of what we&apos;re evaluating is how well you can explain your work without leaning on external references.</p>


            {/* ── 1. YOUR EXPERIENCE ── */}
            <Sec id="your-experience" title="your experience" onVisible={() => setActiveSection("your experience")}>
              <F label="first name" required invalid={isInvalid("first_name")} fieldError={fieldError.first_name}><In value={form.first_name as string} onChange={(v) => set("first_name", v)} invalid={isInvalid("first_name")} /></F>
              <F label="last name" required invalid={isInvalid("last_name")} fieldError={fieldError.last_name}><In value={form.last_name as string} onChange={(v) => set("last_name", v)} invalid={isInvalid("last_name")} /></F>
              <F label="email" required invalid={isInvalid("email")} fieldError={fieldError.email}><In type="email" value={form.email as string} onChange={(v) => set("email", v)} placeholder="you@example.com" invalid={isInvalid("email")} /></F>
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

              {form.has_cofounder === true && (
                <div className="border-l-2 border-white/[0.1] pl-6 flex flex-col gap-6">
                  <F label="cofounders" required invalid={isInvalid("cofounders")}>
                    <div className="flex flex-col gap-4">
                      {cofounders.map((c, i) => (
                        <div key={i} className="border border-white/[0.1] rounded-xl p-5">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-sans font-light text-[0.75rem] text-[#807d78]">cofounder {i + 1}</span>
                            {i > 0 && (
                              <button onClick={() => removeCofounder(i)} className="font-sans text-[0.75rem] text-red-400 hover:text-red-300 transition-colors">remove</button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4 max-sm:grid-cols-1">
                            <div>
                              <label className="block font-sans font-medium text-[0.85rem] text-[#c5c3be] mb-2 max-sm:text-[0.9rem]">first name <span className="text-red-400 ml-1">*</span></label>
                              <input value={c.first_name} onChange={(e) => updateCofounder(i, "first_name", e.target.value)}
                                className="w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.12] rounded-xl outline-none border border-white/[0.1] focus:border-white/[0.25] transition-colors placeholder:text-[#a09d98] max-sm:text-[1rem]" placeholder="type your answer here" />
                            </div>
                            <div>
                              <label className="block font-sans font-medium text-[0.85rem] text-[#c5c3be] mb-2 max-sm:text-[0.9rem]">last name <span className="text-red-400 ml-1">*</span></label>
                              <input value={c.last_name} onChange={(e) => updateCofounder(i, "last_name", e.target.value)}
                                className="w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.12] rounded-xl outline-none border border-white/[0.1] focus:border-white/[0.25] transition-colors placeholder:text-[#a09d98] max-sm:text-[1rem]" placeholder="type your answer here" />
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block font-sans font-medium text-[0.85rem] text-[#c5c3be] mb-2 max-sm:text-[0.9rem]">email <span className="text-red-400 ml-1">*</span></label>
                            <input type="email" value={c.email} onChange={(e) => updateCofounder(i, "email", e.target.value)}
                              className="w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.12] rounded-xl outline-none border border-white/[0.1] focus:border-white/[0.25] transition-colors placeholder:text-[#a09d98] max-sm:text-[1rem]" placeholder="cofounder@example.com" />
                          </div>
                          <div>
                            <label className="block font-sans font-medium text-[0.85rem] text-[#c5c3be] mb-2 max-sm:text-[0.9rem]">what are 2 things they are most proud of? (this is not the time to be humble, plz brag!) <span className="text-red-400 ml-1">*</span></label>
                            <textarea value={c.accomplishments} onChange={(e) => { if (e.target.value.length <= 350) updateCofounder(i, "accomplishments", e.target.value); }} rows={4}
                              className="w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.12] rounded-xl outline-none border border-white/[0.1] focus:border-white/[0.25] transition-colors resize-y placeholder:text-[#a09d98] max-sm:text-[1rem]" placeholder="type your answer here" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={addCofounder} className="font-sans text-[0.8rem] text-[#807d78] hover:text-[#f0eeea] transition-colors mt-1">+ add cofounder</button>
                  </F>

                  <F label="how long have you known each other and how did you meet?" required invalid={isInvalid("cofounder_how_met")}>
                    <Ta value={form.cofounder_how_met as string} onChange={(v) => set("cofounder_how_met", v)} invalid={isInvalid("cofounder_how_met")} />
                  </F>

                  <F label="how do you split responsibilities?" required invalid={isInvalid("cofounder_responsibilities")}>
                    <Ta value={form.cofounder_responsibilities as string} onChange={(v) => set("cofounder_responsibilities", v)} invalid={isInvalid("cofounder_responsibilities")} />
                  </F>
                </div>
              )}

              {form.has_cofounder === false && (
                <F label="are you looking for a cofounder?" required invalid={isInvalid("looking_for_cofounder")}>
                  <Toggle value={form.looking_for_cofounder as boolean | null} onChange={(v) => set("looking_for_cofounder", v)} invalid={isInvalid("looking_for_cofounder")} />
                </F>
              )}
            </Sec>

            {/* ── 2. YOUR IDEA ── */}
            <Sec id="your-idea" title="your idea" onVisible={() => setActiveSection("your idea")}>
              <F label="where are you at right now?" required invalid={isInvalid("stage")}>
                <div className={`flex flex-wrap gap-2 ${isInvalid("stage") ? "ring-1 ring-red-500/60 rounded-xl p-2 -m-2" : ""}`}>
                  {STAGES.map((s) => (
                    <button key={s} onClick={() => set("stage", s)}
                      className={`font-sans text-[0.8rem] px-4 py-2 rounded-lg border transition-colors min-h-[44px] max-sm:flex-1 max-sm:text-[0.78rem] ${
                        form.stage === s ? "bg-white text-black border-white" : "bg-white/[0.08] text-white border-white/[0.15] hover:border-white/[0.3]"
                      }`}>{s}</button>
                  ))}
                </div>
              </F>
              <F label="what's the ultimate vision you're building towards? 50 characters or less" required invalid={isInvalid("vision")}>
                <In value={form.vision as string} onChange={(v) => set("vision", v)} placeholder="e.g making life multiplanetary" invalid={isInvalid("vision")} maxLength={50} />
              </F>
              <F label="describe what you're building or investigating in 50 characters or less" required invalid={isInvalid("building")}>
                <In value={form.building as string} onChange={(v) => set("building", v)} placeholder="e.g. ai tool that automates student workflows" invalid={isInvalid("building")} maxLength={50} />
              </F>
              <F label="what problem are you solving?" required invalid={isInvalid("problem")}>
                <Ta value={form.problem as string} onChange={(v) => set("problem", v)} placeholder="what pain point or gap does your product address?" invalid={isInvalid("problem")} />
              </F>
              <F label="why did you pick this idea to work on?" required invalid={isInvalid("why_this_idea")}>
                <Ta value={form.why_this_idea as string} onChange={(v) => set("why_this_idea", v)} placeholder="what drew you to this problem specifically?" invalid={isInvalid("why_this_idea")} />
              </F>
              <F label="how do you know the world needs what you're making?" required invalid={isInvalid("world_needs")}>
                <Ta value={form.world_needs as string} onChange={(v) => set("world_needs", v)} placeholder="what have you seen, heard, or experienced that tells you this matters?" invalid={isInvalid("world_needs")} />
              </F>
              <F label="why are you the best person to build this?" required invalid={isInvalid("why_you")}>
                <Ta value={form.why_you as string} onChange={(v) => set("why_you", v)} placeholder="what unique experience, insight, or skill makes you the right founder for this?" invalid={isInvalid("why_you")} />
              </F>
              <F label="who is this for?" required invalid={isInvalid("target_user")}>
                <In value={form.target_user as string} onChange={(v) => set("target_user", v)} placeholder="e.g. college students juggling 3+ platforms for assignments, or freelance designers billing $5k+/mo" invalid={isInvalid("target_user")} />
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
              {form.has_investment === true && (
                <>
                  <F label="funding details">
                    <In value={form.funding_details as string} onChange={(v) => set("funding_details", v)} placeholder="e.g. pre-seed from angel investors" />
                  </F>
                  <F label="how much have you raised?">
                    <In value={form.funding_amount as string} onChange={(v) => set("funding_amount", v)} placeholder="e.g. $50k, $200k" />
                  </F>
                </>
              )}
              <F label="are you currently fundraising?" required invalid={isInvalid("fundraising")}>
                <Toggle value={form.fundraising as boolean | null} onChange={(v) => set("fundraising", v)} invalid={isInvalid("fundraising")} />
              </F>
              <F label="how long have you been working on this?">
                <In value={form.time_working as string} onChange={(v) => set("time_working", v)} placeholder="e.g. 3 months, 1 year" />
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
              <F label="are you working on this full-time?" required={isActive}>
                <Toggle value={form.full_time as boolean | null} onChange={(v) => set("full_time", v)} />
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
              <F label="how did you hear about the residency?" required invalid={isInvalid("how_heard")}>
                <select value={(form.how_heard as string) || ""} onChange={(e) => set("how_heard", e.target.value)}
                  className={`w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.12] rounded-xl outline-none transition-colors appearance-none max-sm:text-[1rem] max-sm:py-3.5 border ${
                    isInvalid("how_heard") ? "border-red-500/60" : "border-white/[0.1] focus:border-white/[0.25]"
                  }`}
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23807d78' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
                  <option value="" disabled>select</option>
                  {HOW_HEARD_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </F>
              <F label="anything else?">
                <Ta value={form.anything_else as string} onChange={(v) => set("anything_else", v)} maxChars={2000} />
              </F>
            </Sec>

            {/* Submit */}
            <div className="mt-16 mb-20 flex flex-col items-center gap-4">
              {fieldError._general && (
                <p className="font-sans font-light text-[0.85rem] text-red-400 mb-2">{fieldError._general}</p>
              )}
              <button onClick={handleSubmitClick} disabled={submitting}
                className="font-sans font-semibold text-[0.9rem] text-black bg-white px-10 py-3.5 rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed max-sm:w-full max-sm:py-4">
                {submitting ? "submitting..." : "submit application"}
              </button>
              <p className="font-sans font-light text-[0.7rem] text-[#807d78] max-sm:text-[0.65rem] max-sm:break-all">
                if you have any issues, email support@endlessfounder.live
              </p>
            </div>

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
  useEffect(() => {
    if (typeof window === "undefined") return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) onVisible(); }, { rootMargin: "-30% 0px -60% 0px" });
    const timer = setTimeout(() => { if (ref.current) obs.observe(ref.current); }, 100);
    return () => { clearTimeout(timer); obs.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div ref={ref} id={id} className="mb-16 scroll-mt-20">
      <h2 className="font-serif font-light text-[1.5rem] text-[#f0eeea] tracking-[-0.01em] mb-8">{title}</h2>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

function F({ label, required, invalid, fieldError, children }: { label: string; required?: boolean; invalid?: boolean; fieldError?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-sans font-medium text-[0.85rem] text-[#c5c3be] mb-2 max-sm:text-[0.9rem]">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {fieldError && <p className="mt-1.5 font-sans font-light text-[0.8rem] text-red-400">{fieldError}</p>}
      {!fieldError && invalid && <p className="mt-1.5 font-sans font-light text-[0.8rem] text-red-400/70">required</p>}
    </div>
  );
}

function In({ value, onChange, placeholder, type = "text", maxLength, invalid }: {
  value?: string; onChange: (v: string) => void; placeholder?: string; type?: string; maxLength?: number; invalid?: boolean;
}) {
  return (
    <div>
      <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={maxLength}
        className={`w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.12] rounded-xl outline-none transition-colors placeholder:text-[#a09d98] max-sm:text-[1rem] max-sm:py-3.5 border ${
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
        className={`w-full px-4 py-3 pb-7 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.12] rounded-xl outline-none transition-colors resize-y placeholder:text-[#a09d98] max-sm:text-[1rem] max-sm:py-3.5 max-sm:pb-7 border ${
          invalid ? "border-red-500/60" : over ? "border-amber-500/50" : "border-white/[0.1] focus:border-white/[0.25]"
        }`} />
      <span className={`absolute bottom-2.5 right-3.5 font-sans text-[0.7rem] pointer-events-none ${charCount > maxChars * 0.9 ? "text-amber-400/70" : "text-[#807d78]/40"}`}>{charCount}/{maxChars}</span>
    </div>
  );
}

function Toggle({ value, onChange, invalid }: { value: boolean | null; onChange: (v: boolean) => void; invalid?: boolean }) {
  const base = invalid ? "border-red-500/60" : "border-white/[0.15] hover:border-white/[0.3]";
  return (
    <div className="flex gap-2">
      <button onClick={() => onChange(true)}
        className={`font-sans text-[0.8rem] px-5 py-2 rounded-lg border transition-colors min-h-[44px] min-w-[44px] ${
          value === true ? "bg-white text-black border-white" : `bg-white/[0.08] text-white ${base}`}`}>yes</button>
      <button onClick={() => onChange(false)}
        className={`font-sans text-[0.8rem] px-5 py-2 rounded-lg border transition-colors min-h-[44px] min-w-[44px] ${
          value === false ? "bg-white text-black border-white" : `bg-white/[0.08] text-white ${base}`}`}>no</button>
    </div>
  );
}
