import Link from "next/link";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#080808] text-[#f0e6d3] overflow-hidden">
      <AnimatedBackground />

      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Vcard
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="glass-chip px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#f0e6d3]/10 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#f0e6d3] text-[#181614] hover:bg-[#c8a96e] transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#c8a96e]">Your pocket business card</p>
        <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
          One QR. <br />
          <span className="text-[#c8a96e]">Every contact saved.</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-[#f0e6d3]/70 max-w-xl mx-auto">
          Create a beautiful digital business card in seconds. Share your QR, and people save your details straight to their phone — no app required.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            href="/signup"
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#f0e6d3] text-[#181614] hover:bg-[#c8a96e] transition-colors"
          >
            Create your card
          </Link>
          <Link
            href="/login"
            className="glass-chip px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#f0e6d3]/10 transition-colors"
          >
            I have an account
          </Link>
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-3 gap-4">
        {[
          { title: "Fast setup", body: "Sign up, fill in a few fields, share your link." },
          { title: "Save to contacts", body: "One tap downloads a .vcf — works on iOS and Android." },
          { title: "Your own URL", body: "yourdomain.com/yourname — easy to remember, easy to share." },
        ].map((f) => (
          <div key={f.title} className="glass p-5 rounded-2xl">
            <h3 className="text-sm font-semibold text-[#c8a96e]">{f.title}</h3>
            <p className="mt-2 text-sm text-[#f0e6d3]/70">{f.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
