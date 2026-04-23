"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main className="relative min-h-screen bg-[#080808] text-[#f0e6d3] flex items-center justify-center p-6 overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md">
        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-[#f0e6d3]/60">Log in to edit your card.</p>
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
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-[#f0e6d3]/50">Password</span>
              <input
                name="password"
                type="password"
                required
                className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[#f0e6d3]/5 border border-[#f0e6d3]/15 text-[#f0e6d3] outline-none focus:border-[#c8a96e] transition-colors"
              />
            </label>
            {error ? <p className="text-sm text-[#e8734a]">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-[#f0e6d3] text-[#181614] hover:bg-[#c8a96e] transition-colors disabled:opacity-60"
            >
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>
          <p className="mt-4 text-sm text-[#f0e6d3]/60 text-center">
            <Link href="/forgot" className="text-[#c8a96e] hover:underline">
              Forgot password?
            </Link>
          </p>
          <p className="mt-2 text-sm text-[#f0e6d3]/60 text-center">
            No account yet?{" "}
            <Link href="/signup" className="text-[#c8a96e] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
