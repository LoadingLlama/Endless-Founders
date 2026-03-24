"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Simplified application form for Endless Founders.
 * Fields: name, school, linkedin, what you're building (500 words),
 * and 6-week commitment confirmation (June – mid/end July).
 */

type FormData = Record<string, string | boolean | null>;

const STORAGE_KEY = "ef_application_form";
const STORAGE_KEY_SUBMITTED = "ef_application_submitted";

/**
 * Loads saved form data from localStorage.
 * Returns fallback if nothing saved or parse fails.
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
  const [form, setForm] = useState<FormData>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState<Record<string, string>>({});
  const [saveLabel, setSaveLabel] = useState<"idle" | "saving" | "saved">("idle");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

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
    if (Object.keys(savedForm).length > 0) setForm(savedForm);
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

  // Save before user leaves (tab close, navigate away)
  const saveToStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch { /* silent */ }
  }, [form]);

  useEffect(() => {
    window.addEventListener("beforeunload", saveToStorage);
    document.addEventListener("visibilitychange", saveToStorage);
    return () => {
      window.removeEventListener("beforeunload", saveToStorage);
      document.removeEventListener("visibilitychange", saveToStorage);
    };
  }, [saveToStorage]);

  function clearSavedData() {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* silent */ }
  }

  function set(key: string, value: string | boolean | null) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  /**
   * Returns list of missing required fields.
   */
  function getMissingFields() {
    const required = [
      { key: "first_name", label: "first name" },
      { key: "last_name", label: "last name" },
      { key: "school", label: "school" },
      { key: "linkedin", label: "linkedin" },
      { key: "building", label: "what you're building" },
      { key: "can_commit_6_weeks", label: "6-week commitment" },
    ];
    return required.filter(({ key }) => {
      const val = form[key];
      if (val === null || val === undefined) return true;
      if (typeof val === "string" && val.trim() === "") return true;
      return false;
    });
  }

  function handleSubmitClick() {
    setError("");
    setFieldError({});
    const missing = getMissingFields();
    if (missing.length > 0) {
      setFieldError({ _general: `please fill in: ${missing.map((m) => m.label).join(", ")}` });
      return;
    }
    handleConfirmedSubmit();
  }

  /**
   * Submits the application to /api/apply.
   */
  async function handleConfirmedSubmit() {
    setSubmitting(true);
    setFieldError({});
    setError("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        const err = data.error || "something went wrong";
        setFieldError({ _general: err });
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
    <div className="bg-black min-h-screen flex items-center justify-center px-8 max-sm:px-5 py-16">
      <main className="max-w-xl w-full">
        <div className="mb-12">
          <a href="/" className="font-serif font-light text-[1rem] text-[#f0eeea] inline-flex items-center min-h-[44px]">endless founders</a>
        </div>

        <h1 className="font-serif font-light text-[2.2rem] text-[#f0eeea] tracking-[-0.02em] leading-none mb-1 max-sm:text-[1.6rem]">apply to endless founders</h1>
        <p className="font-sans font-light text-[0.85rem] text-[#b5b3ae] mb-12">june – mid/end july · cohort I</p>

        <div className="flex flex-col gap-8">
          {/* Name */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <F label="first name" required>
              <In value={form.first_name as string} onChange={(v) => set("first_name", v)} placeholder="jane" />
            </F>
            <F label="last name" required>
              <In value={form.last_name as string} onChange={(v) => set("last_name", v)} placeholder="doe" />
            </F>
          </div>

          {/* School */}
          <F label="school" required>
            <In value={form.school as string} onChange={(v) => set("school", v)} placeholder="e.g. uc berkeley, n/a" />
          </F>

          {/* LinkedIn */}
          <F label="linkedin" required>
            <In value={form.linkedin as string} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/in/..." />
          </F>

          {/* What you're building / your idea — 500 words */}
          <F label="what are you building, or what's your idea?" required>
            <Ta value={form.building as string} onChange={(v) => set("building", v)} placeholder="tell us about the problem you're solving, what you're building, and why you're the right person to build it." maxChars={3000} rows={10} />
            <p className="mt-1 font-sans font-light text-[0.7rem] text-[#807d78]">~500 words max</p>
          </F>

          {/* 6-week commitment */}
          <F label="can you commit to the full 6 weeks? (june – mid/end july)" required>
            <Toggle value={form.can_commit_6_weeks as boolean | null} onChange={(v) => set("can_commit_6_weeks", v)} />
          </F>

          {/* Save indicator */}
          <p className={`font-sans font-light text-[0.7rem] text-[#807d78] transition-opacity duration-300 ${saveLabel === "saved" ? "opacity-100" : "opacity-0"}`}>
            auto-saved
          </p>
        </div>

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
  );
}

/* ── Sub-components ── */

/**
 * Form field wrapper with label and required indicator.
 */
function F({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-sans font-medium text-[0.85rem] text-[#c5c3be] mb-2 max-sm:text-[0.9rem]">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

/**
 * Text input component.
 */
function In({ value, onChange, placeholder, type = "text" }: {
  value?: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.12] rounded-xl outline-none transition-colors placeholder:text-[#a09d98] max-sm:text-[1rem] max-sm:py-3.5 border border-white/[0.1] focus:border-white/[0.25]" />
  );
}

/**
 * Textarea component with character limit.
 */
function Ta({ value, onChange, placeholder, maxChars = 3000, rows = 4 }: {
  value?: string; onChange: (v: string) => void; placeholder?: string; maxChars?: number; rows?: number;
}) {
  const charCount = (value || "").length;
  return (
    <div className="relative">
      <textarea value={value || ""} onChange={(e) => { if (e.target.value.length <= maxChars) onChange(e.target.value); }} placeholder={placeholder} rows={rows}
        className="w-full px-4 py-3 pb-7 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.12] rounded-xl outline-none transition-colors resize-y placeholder:text-[#a09d98] max-sm:text-[1rem] max-sm:py-3.5 max-sm:pb-7 border border-white/[0.1] focus:border-white/[0.25]" />
      <span className={`absolute bottom-2.5 right-3.5 font-sans text-[0.7rem] pointer-events-none ${charCount > maxChars * 0.9 ? "text-amber-400/70" : "text-[#807d78]/40"}`}>{charCount}/{maxChars}</span>
    </div>
  );
}

/**
 * Yes/No toggle button pair.
 */
function Toggle({ value, onChange }: { value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => onChange(true)}
        className={`font-sans text-[0.8rem] px-5 py-2 rounded-lg border transition-colors min-h-[44px] min-w-[44px] ${
          value === true ? "bg-white text-black border-white" : "bg-white/[0.08] text-white border-white/[0.15] hover:border-white/[0.3]"}`}>yes</button>
      <button onClick={() => onChange(false)}
        className={`font-sans text-[0.8rem] px-5 py-2 rounded-lg border transition-colors min-h-[44px] min-w-[44px] ${
          value === false ? "bg-white text-black border-white" : "bg-white/[0.08] text-white border-white/[0.15] hover:border-white/[0.3]"}`}>no</button>
    </div>
  );
}
