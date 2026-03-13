"use client";

import { useState, useRef } from "react";

type State = "button" | "form" | "success";

export default function WaitlistCTA() {
  const [state, setState] = useState<State>("button");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function showForm() {
    setState("form");
    setTimeout(() => inputRef.current?.focus(), 300);
  }

  async function handleSubmit() {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed");
      setState("success");
    } catch {
      setError(true);
      setTimeout(() => setError(false), 2000);
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
      <div className="flex items-center w-full max-w-[480px] bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-full p-[5px] opacity-0 animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] hover:border-white/20 transition-colors max-sm:flex-col max-sm:max-w-[320px] max-sm:rounded-[20px] max-sm:p-2">
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
          className="px-6 py-3 font-sans font-normal text-[0.78rem] tracking-[0.1em] uppercase text-[#0a0a0a] bg-[#f0eeea] border-none rounded-full cursor-pointer whitespace-nowrap transition-all hover:bg-[#dddbd6] hover:px-7 active:scale-[0.97] max-sm:w-full max-sm:rounded-full"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="opacity-0 translate-y-[20px] animate-[fadeUp_0.8s_cubic-bezier(0.25,0.1,0.25,1)_0.8s_forwards]">
      <button
        onClick={showForm}
        className="group inline-flex items-center gap-2.5 px-10 py-[18px] font-sans font-normal text-[0.85rem] tracking-[0.12em] uppercase text-[#0a0a0a] bg-[#f0eeea] border-none rounded-full cursor-pointer transition-all duration-350 hover:bg-[#e2e0db] hover:px-11 active:scale-[0.97]"
      >
        <span className="text-base transition-transform duration-300 group-hover:translate-x-[3px]">→</span>
        Join Waitlist
      </button>
    </div>
  );
}
