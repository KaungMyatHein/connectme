import Link from "next/link";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ScrollFx } from "@/components/ScrollFx";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#080808] text-[#f0e6d3] overflow-hidden">
      <ScrollFx />
      <div id="scroll-progress" />
      <AnimatedBackground />
      <div aria-hidden className="pointer-events-none fixed inset-0 grid-overlay" />

      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#c8a96e] shadow-[0_0_18px_4px_rgba(200,169,110,0.55)]" />
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

      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-10 items-center">
        <div className="text-center lg:text-left">
          <span className="animate-fade-up inline-flex items-center gap-2 glass-chip rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#f0e6d3]/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8734a] animate-pulse" />
            No app. No paper. Just a link.
          </span>
          <h1 className="animate-fade-up delay-100 mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02]">
            One QR. <br />
            <span className="text-gradient-gold">Every contact</span>
            <br className="hidden sm:block" /> saved instantly.
          </h1>
          <p className="animate-fade-up delay-200 mt-6 text-base sm:text-lg text-[#f0e6d3]/70 max-w-xl mx-auto lg:mx-0">
            Craft a beautiful digital business card in seconds. Share your QR — people save your details straight to their phone with one tap.
          </p>
          <div className="animate-fade-up delay-300 mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[#f0e6d3] text-[#181614] hover:bg-[#c8a96e] transition-colors"
            >
              Create your card
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="glass-chip px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#f0e6d3]/10 transition-colors"
            >
              I have an account
            </Link>
          </div>
          <div className="animate-fade-up delay-400 mt-8 flex items-center justify-center lg:justify-start gap-5 text-xs text-[#f0e6d3]/50">
            <span className="flex items-center gap-1.5"><Check /> Free forever</span>
            <span className="flex items-center gap-1.5"><Check /> Works on iOS & Android</span>
            <span className="hidden sm:flex items-center gap-1.5"><Check /> No app required</span>
          </div>
        </div>

        <div data-parallax="0.06" className="relative animate-fade-up delay-200 mx-auto w-full max-w-sm lg:max-w-md">
          <div aria-hidden className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,rgba(200,169,110,0.25),transparent_60%)] blur-2xl" />
          <PreviewCard />
        </div>

        <div className="lg:col-span-2 mt-10 flex justify-center text-[#f0e6d3]/40">
          <ScrollCue />
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p data-reveal className="text-xs uppercase tracking-[0.3em] text-[#c8a96e]">Scroll the story</p>
          <h2 data-reveal data-reveal-delay="1" className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            From a single scan to a saved contact.
          </h2>
          <p data-reveal data-reveal-delay="2" className="mt-4 text-sm sm:text-base text-[#f0e6d3]/60 max-w-xl mx-auto">
            Three moments — a QR, a tap, a contact. Watch each one land as you scroll.
          </p>
        </div>

        <div className="space-y-6">
          <StoryStep
            n="01"
            kicker="The scan"
            title="Point a camera. That's it."
            body="Your QR opens your card in any browser — no install, no friction. The first impression starts in under a second."
            side="right"
            visual={<ScanVisual />}
          />
          <StoryStep
            n="02"
            kicker="The card"
            title="A page that feels like you."
            body="Name, role, links, socials — laid out cleanly on a glass-finished card. Tuned for both phone and laptop, dark mode native."
            side="left"
            visual={<CardVisual />}
          />
          <StoryStep
            n="03"
            kicker="The save"
            title="One tap to land in Contacts."
            body="A native .vcf download drops you into iOS or Android contacts. No copy-paste, no missed digits, no broken links."
            side="right"
            visual={<SaveVisual />}
          />
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-3 gap-4">
        {[
          { title: "Fast setup", body: "Sign up, fill in a few fields, share your link.", icon: <IconBolt /> },
          { title: "Save to contacts", body: "One tap downloads a .vcf — works on iOS and Android.", icon: <IconBookmark /> },
          { title: "Your own URL", body: "yourdomain.com/yourname — easy to remember.", icon: <IconLink /> },
        ].map((f, i) => (
          <div
            key={f.title}
            data-reveal
            data-reveal-delay={String(i + 1)}
            className="glass shine-border rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="h-10 w-10 rounded-xl bg-[#c8a96e]/15 text-[#c8a96e] flex items-center justify-center">
              {f.icon}
            </div>
            <h3 className="mt-4 text-base font-semibold text-[#f0e6d3]">{f.title}</h3>
            <p className="mt-1.5 text-sm text-[#f0e6d3]/65">{f.body}</p>
          </div>
        ))}
      </section>

      <section data-reveal className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="glass shine-border rounded-3xl p-8 sm:p-12 text-center overflow-hidden relative">
          <div aria-hidden className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-[#c8a96e]/20 blur-3xl" />
          <div aria-hidden className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#e8734a]/20 blur-3xl" />
          <h2 className="relative text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to make introductions <span className="text-gradient-gold">effortless</span>?
          </h2>
          <p className="relative mt-3 text-sm sm:text-base text-[#f0e6d3]/65 max-w-md mx-auto">
            Spin up your card in under a minute. Free, forever — no credit card.
          </p>
          <div className="relative mt-8 flex justify-center">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-[#f0e6d3] text-[#181614] hover:bg-[#c8a96e] transition-colors"
            >
              Claim your URL
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#f0e6d3]/10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#f0e6d3]/50">
          <p>© {new Date().getFullYear()} Vcard — A pocket-sized business card.</p>
          <div className="flex items-center gap-5">
            <Link href="/login" className="hover:text-[#f0e6d3] transition-colors">Log in</Link>
            <Link href="/signup" className="hover:text-[#f0e6d3] transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function StoryStep({
  n, kicker, title, body, side, visual,
}: {
  n: string;
  kicker: string;
  title: string;
  body: string;
  side: "left" | "right";
  visual: React.ReactNode;
}) {
  const textOrder = side === "right" ? "lg:order-1" : "lg:order-2";
  const visualOrder = side === "right" ? "lg:order-2" : "lg:order-1";
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div data-reveal={side === "right" ? "left" : "right"} className={textOrder}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.3em] text-[#c8a96e]">{n}</span>
          <span className="h-px w-12 bg-gradient-to-r from-[#c8a96e]/60 to-transparent" />
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#f0e6d3]/55">{kicker}</span>
        </div>
        <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">{title}</h3>
        <p className="mt-3 text-sm sm:text-base text-[#f0e6d3]/65 max-w-md">{body}</p>
      </div>
      <div data-reveal="scale" data-reveal-delay="1" className={`${visualOrder} flex justify-center`}>
        {visual}
      </div>
    </div>
  );
}

function ScrollCue() {
  return (
    <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.32em]">
      <span>Scroll</span>
      <span className="relative h-8 w-[2px] overflow-hidden rounded-full bg-[#f0e6d3]/15">
        <span className="absolute top-0 left-0 right-0 h-3 bg-[#c8a96e] animate-[scroll-cue_2s_ease-in-out_infinite]" />
      </span>
      <style>{`
        @keyframes scroll-cue {
          0% { transform: translateY(-100%); }
          60% { transform: translateY(120%); }
          100% { transform: translateY(120%); }
        }
      `}</style>
    </div>
  );
}

function PreviewCard() {
  return (
    <div className="relative">
      <div className="glass shine-border rounded-3xl p-6 animate-float-card">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#c8a96e] to-[#e8734a] text-[#181614] flex items-center justify-center font-bold tracking-tight">
            KH
          </div>
          <div className="min-w-0">
            <div className="text-base font-bold tracking-tight">Kaung Hein</div>
            <div className="text-[11px] text-[#c8a96e] font-medium">
              Product Designer <span className="text-[#f0e6d3]/40 mx-1">·</span>
              <span className="text-[#f0e6d3]/60">Studio Vcard</span>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-2.5 border-t border-[#f0e6d3]/10 pt-4">
          <PreviewRow label="Email" value="hi@vcard.app" />
          <PreviewRow label="Phone" value="+66 81 234 5678" />
          <PreviewRow label="Website" value="vcard.app/kaung" />
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {["LinkedIn", "Dribbble", "GitHub"].map((s) => (
            <span key={s} className="glass-chip text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-md">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5 rounded-xl bg-[#f0e6d3] text-[#181614] py-2.5 text-center text-xs font-semibold">
          Save to Contacts
        </div>
      </div>

      <div aria-hidden className="absolute -bottom-6 -right-6 h-24 w-24 rounded-2xl glass shine-border flex items-center justify-center rotate-6">
        <QRGlyph />
      </div>
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[10px] uppercase tracking-widest text-[#f0e6d3]/45">{label}</span>
      <span className="text-xs font-medium text-[#f0e6d3] truncate">{value}</span>
    </div>
  );
}

function ScanVisual() {
  return (
    <div className="relative w-64 h-64 glass shine-border rounded-3xl flex items-center justify-center overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,110,0.18),transparent_70%)]" />
      <div className="relative">
        <QRGlyph size={120} />
        <span className="absolute left-0 right-0 top-0 h-[2px] bg-[#e8734a] shadow-[0_0_12px_2px_rgba(232,115,74,0.7)] animate-[scan-line_2.4s_ease-in-out_infinite]" />
      </div>
      <style>{`
        @keyframes scan-line {
          0%, 100% { transform: translateY(0); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          50% { transform: translateY(120px); }
        }
      `}</style>
    </div>
  );
}

function CardVisual() {
  return (
    <div className="w-64 sm:w-72">
      <PreviewCard />
    </div>
  );
}

function SaveVisual() {
  return (
    <div className="relative w-64 h-64 glass shine-border rounded-3xl flex items-center justify-center overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,115,74,0.18),transparent_70%)]" />
      <div className="relative flex flex-col items-center gap-3">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#c8a96e] to-[#e8734a] flex items-center justify-center text-[#181614] animate-[bounce-soft_2.4s_ease-in-out_infinite]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
        <div className="glass-chip rounded-lg px-3 py-1.5 text-[11px] font-medium tracking-wide">
          kaung-hein.vcf
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#c8a96e]">Saved to contacts</div>
      </div>
      <style>{`
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8a96e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function IconBookmark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1.5 1.5" />
      <path d="M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1.5-1.5" />
    </svg>
  );
}

function QRGlyph({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2" stroke="#f0e6d3" strokeWidth="2" />
      <rect x="7" y="7" width="6" height="6" fill="#c8a96e" />
      <rect x="27" y="3" width="14" height="14" rx="2" stroke="#f0e6d3" strokeWidth="2" />
      <rect x="31" y="7" width="6" height="6" fill="#c8a96e" />
      <rect x="3" y="27" width="14" height="14" rx="2" stroke="#f0e6d3" strokeWidth="2" />
      <rect x="7" y="31" width="6" height="6" fill="#c8a96e" />
      <rect x="22" y="22" width="3" height="3" fill="#f0e6d3" />
      <rect x="29" y="22" width="3" height="3" fill="#f0e6d3" />
      <rect x="36" y="22" width="3" height="3" fill="#e8734a" />
      <rect x="22" y="29" width="3" height="3" fill="#e8734a" />
      <rect x="29" y="29" width="3" height="3" fill="#f0e6d3" />
      <rect x="22" y="36" width="3" height="3" fill="#f0e6d3" />
      <rect x="36" y="36" width="3" height="3" fill="#c8a96e" />
    </svg>
  );
}
