"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Signup failed");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main className="relative min-h-screen bg-[#080808] text-[#f0e6d3] flex items-center justify-center p-6 overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md">
        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold">Create your card</h1>
          <p className="mt-1 text-sm text-[#f0e6d3]/60">It takes 30 seconds.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field name="firstName" label="First name" required />
              <Field name="lastName" label="Last name" required />
            </div>
            <Field name="username" label="Username" hint="your URL will be /username" required />
            <Field name="email" label="Email" type="email" required />
            <Field name="password" label="Password" type="password" hint="8+ characters" required />
            {error ? <p className="text-sm text-[#e8734a]">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-[#f0e6d3] text-[#181614] hover:bg-[#c8a96e] transition-colors disabled:opacity-60"
            >
              {loading ? "Creating…" : "Create account"}
            </button>
          </form>
          <p className="mt-6 text-sm text-[#f0e6d3]/60 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-[#c8a96e] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

function Field({
  name, label, type = "text", hint, required,
}: { name: string; label: string; type?: string; hint?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-[#f0e6d3]/50">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[#f0e6d3]/5 border border-[#f0e6d3]/15 text-[#f0e6d3] placeholder-[#f0e6d3]/30 outline-none focus:border-[#c8a96e] transition-colors"
      />
      {hint ? <span className="mt-1 block text-[11px] text-[#f0e6d3]/40">{hint}</span> : null}
    </label>
  );
}
