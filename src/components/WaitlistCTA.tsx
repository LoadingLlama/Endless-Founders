"use client";

import { useState, useRef } from "react";

type State = "button" | "form" | "success";

export default function WaitlistCTA() {
  const [state, setState] = useState<State>("button");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function showForm() {
    setState("form");
    setTimeout(() => inputRef.current?.focus(), 300);
  }

  async function handleSubmit() {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 409) {
        setError("You're already on the list!");
        setTimeout(() => setError(""), 3000);
        return;
      }

      if (!res.ok) throw new Error("Failed");
      setState("success");
    } catch {
      setError("Something went wrong. Try again.");
      setTimeout(() => setError(""), 2000);
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-2.5 font-sans opacity-0 translate-y-[10px] animate-[fadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
        <span className="font-light text-lg text-[#f0eeea] tracking-wide [text-shadow:0_2px_15px_rgba(0,0,0,0.9),0_0_30px_rgba(0,0,0,0.7)]">
          You&apos;re on the list.
        </span>
        <span className="font-normal text-xs text-[#d5d3ce] tracking-wide [text-shadow:0_2px_15px_rgba(0,0,0,0.9),0_0_30px_rgba(0,0,0,0.7)]">
          We&apos;ll reach out when applications open.
        </span>
      </div>
    );
  }

  if (state === "form") {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center w-full max-w-[480px] bg-black/50 backdrop-blur-xl border border-white/[0.12] rounded-full p-[5px] opacity-0 animate-[fadeUp_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards] hover:border-white/20 transition-colors max-sm:flex-col max-sm:max-w-[300px] max-sm:rounded-[20px] max-sm:p-2">
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Enter your email"
            className={`flex-1 px-5 py-3 font-sans font-light text-sm tracking-wide text-[#f0eeea] bg-transparent border-none outline-none placeholder:text-white/35 placeholder:font-light max-sm:text-center max-sm:w-full ${
              error ? "border border-red-400/50" : ""
            }`}
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-3 font-sans font-normal text-[0.78rem] tracking-[0.1em] text-[#0a0a0a] bg-[#f0eeea] border-none rounded-full cursor-pointer whitespace-nowrap transition-all hover:bg-[#dddbd6] hover:px-7 active:scale-[0.97] max-sm:w-full max-sm:rounded-full"
          >
            Submit
          </button>
        </div>
        {error && (
          <span className="font-sans font-light text-xs text-[#f0eeea]/80 tracking-wide animate-[fadeUp_0.3s_ease_forwards] [text-shadow:0_2px_15px_rgba(0,0,0,0.9)]">
            {error}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="opacity-0 translate-y-[20px] animate-[fadeUp_1.2s_cubic-bezier(0.16,1,0.3,1)_1s_forwards]">
      <button
        onClick={showForm}
        className="group inline-flex items-center gap-[10px] px-[36px] py-[12px] font-sans font-normal text-[0.85rem] tracking-[0.12em] text-[#0a0a0a] bg-[#f0eeea] border-none rounded-full cursor-pointer transition-all duration-350 hover:bg-[#e2e0db] hover:px-[44px] active:scale-[0.97] max-sm:px-[30px] max-sm:py-[11px] max-sm:text-[0.78rem]"
      >
        <span className="text-base transition-transform duration-300 group-hover:translate-x-[3px]">→</span>
        Join Waitlist
      </button>
    </div>
  );
}
