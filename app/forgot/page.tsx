"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function ForgotPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await fetch("/api/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd.entries())),
    });
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <main className="relative min-h-screen bg-[#080808] text-[#f0e6d3] flex items-center justify-center p-6 overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md">
        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold">Forgot password</h1>
          <p className="mt-1 text-sm text-[#f0e6d3]/60">We will send a reset link if the email exists.</p>
          {submitted ? (
            <p className="mt-6 text-sm text-[#c8a96e]">If that email is registered, a reset link has been sent. Check your inbox.</p>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[#f0e6d3]/50">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[#f0e6d3]/5 border border-[#f0e6d3]/15 text-[#f0e6d3] outline-none focus:border-[#c8a96e] transition-colors"
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold bg-[#f0e6d3] text-[#181614] hover:bg-[#c8a96e] transition-colors disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send reset link"}
              </button>
            </form>
          )}
          <p className="mt-6 text-sm text-[#f0e6d3]/60 text-center">
            <Link href="/login" className="text-[#c8a96e] hover:underline">Back to login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
