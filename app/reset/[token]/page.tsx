"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function ResetPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");
    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Reset failed");
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/login"), 1500);
  }

  return (
    <main className="relative min-h-screen bg-[#080808] text-[#f0e6d3] flex items-center justify-center p-6 overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md">
        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold">Set a new password</h1>
          {done ? (
            <p className="mt-6 text-sm text-[#c8a96e]">Password updated. Redirecting to login…</p>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[#f0e6d3]/50">New password</span>
                <input name="password" type="password" required minLength={8}
                  className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[#f0e6d3]/5 border border-[#f0e6d3]/15 text-[#f0e6d3] outline-none focus:border-[#c8a96e] transition-colors" />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[#f0e6d3]/50">Confirm password</span>
                <input name="confirm" type="password" required minLength={8}
                  className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[#f0e6d3]/5 border border-[#f0e6d3]/15 text-[#f0e6d3] outline-none focus:border-[#c8a96e] transition-colors" />
              </label>
              {error ? <p className="text-sm text-[#e8734a]">{error}</p> : null}
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl font-semibold bg-[#f0e6d3] text-[#181614] hover:bg-[#c8a96e] transition-colors disabled:opacity-60">
                {loading ? "Updating…" : "Update password"}
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
