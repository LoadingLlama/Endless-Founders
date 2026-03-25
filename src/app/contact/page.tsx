"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

/**
 * Contact page — simple form that sends to hello@endlessfounder.live.
 */
export default function ContactPage() {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function set(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
    } catch {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center px-8 max-sm:px-5">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-green-400/60 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-serif font-light text-[2.5rem] text-[#f0eeea] tracking-[-0.02em] mb-4 max-sm:text-[1.8rem]">message sent</h1>
            <p className="font-sans font-light text-[1rem] text-[#c5c3be] leading-[1.7]">
              we&apos;ll get back to you soon.
            </p>
            <a href="/" className="inline-flex items-center justify-center mt-8 font-sans font-medium text-[0.85rem] text-[#f0eeea] border-b border-white/30 pb-0.5 hover:border-white transition-colors min-h-[44px]">back to home</a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black flex items-center justify-center px-8 max-sm:px-5 py-32">
        <main className="max-w-lg w-full">
          <div className="reveal mb-10">
            <h1 className="font-serif font-light text-[2.5rem] text-[#f0eeea] tracking-[-0.02em] leading-none mb-3 max-sm:text-[1.8rem]">contact us</h1>
            <p className="font-sans font-light text-[0.9rem] text-[#c5c3be]">
              for partnerships, press, or general inquiries.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="reveal reveal-delay-1 flex flex-col gap-6">
            <div>
              <label className="block font-sans font-medium text-[0.85rem] text-[#c5c3be] mb-2">name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="full name"
                required
                className="w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.06] rounded-xl outline-none transition-colors placeholder:text-[#a09d98] border border-white/[0.1] focus:border-white/[0.25]"
              />
            </div>

            <div>
              <label className="block font-sans font-medium text-[0.85rem] text-[#c5c3be] mb-2">email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.06] rounded-xl outline-none transition-colors placeholder:text-[#a09d98] border border-white/[0.1] focus:border-white/[0.25]"
              />
            </div>

            <div>
              <label className="block font-sans font-medium text-[0.85rem] text-[#c5c3be] mb-2">message</label>
              <textarea
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="how can we help?"
                rows={5}
                required
                className="w-full px-4 py-3 font-sans font-light text-[0.9rem] text-[#f0eeea] bg-white/[0.06] rounded-xl outline-none transition-colors resize-y placeholder:text-[#a09d98] border border-white/[0.1] focus:border-white/[0.25]"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="font-sans font-semibold text-[0.9rem] text-black bg-white px-10 py-3.5 rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {sending ? "sending..." : "send message"}
            </button>
          </form>

          <p className="reveal reveal-delay-2 font-sans font-light text-[0.75rem] text-[#807d78] mt-8">
            or email us directly at{" "}
            <a href="mailto:hello@endlessfounder.live" className="text-[#c5c3be] hover:text-white transition-colors">
              hello@endlessfounder.live
            </a>
          </p>
        </main>
      </div>
      <Footer />
    </>
  );
}
