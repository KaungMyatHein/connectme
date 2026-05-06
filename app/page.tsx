import Link from "next/link";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ScrollFx } from "@/components/ScrollFx";
import { FintechCard } from "@/components/FintechCard";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#0b0a09] text-[#f0e6d3] overflow-hidden selection:bg-[#c8a96e] selection:text-[#181614]">
      <ScrollFx />
      <div id="scroll-progress" />
      <AnimatedBackground />
      <div className="grain" />

      <nav className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-base font-bold tracking-tight">Vcard</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#f0e6d3]/40">v1 · 2026</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/login" className="text-[#f0e6d3]/70 hover:text-[#f0e6d3] transition-colors">
            Log in
          </Link>
          <Link
            href="/signup"
            className="border border-[#f0e6d3]/25 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide hover:bg-[#f0e6d3] hover:text-[#181614] hover:border-transparent transition-colors"
          >
            Make yours
          </Link>
        </div>
      </nav>

      <section className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 pt-16 sm:pt-24 pb-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14 items-center">
          <div className="col-span-12 lg:col-span-6">
            <h1 className="text-[3.5rem] sm:text-[5rem] lg:text-[6rem] font-bold leading-[0.95] tracking-[-0.03em]">
              A card<br />
              <span className="font-serif-display italic text-[#c8a96e]">at your name.</span>
            </h1>

            <p className="mt-7 max-w-sm text-lg text-[#f0e6d3]/70">
              Scan it. Save it. You&rsquo;re in their phone.
            </p>

            <div className="mt-9 flex items-center gap-6">
              <Link
                href="/signup"
                className="bg-[#f0e6d3] text-[#181614] px-6 py-3.5 rounded-md text-sm font-semibold hover:bg-[#c8a96e] transition-colors"
              >
                Make mine
              </Link>
              <Link
                href="/login"
                className="text-sm text-[#f0e6d3]/65 hover:text-[#f0e6d3] underline underline-offset-4 decoration-[#f0e6d3]/25 transition-colors"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:pl-8">
            <FintechCard
              name="Kaung Hein"
              role="Product Designer · Studio Vcard"
              handle="kaung"
              template="classic"
              floating
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 py-24">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <header className="col-span-12 lg:col-span-7">
            <p data-reveal className="font-mono text-[11px] tracking-[0.2em] text-[#f0e6d3]/40">§ 02 — Templates</p>
            <h2 data-reveal data-reveal-delay="1" className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight leading-[1]">
              Six finishes. <span className="font-serif-display italic text-[#c8a96e]">Pick one</span>, change later.
            </h2>
            <p data-reveal data-reveal-delay="2" className="mt-5 text-sm text-[#f0e6d3]/55 max-w-md">
              Same details, different feeling. Each one tilts and catches the light when someone hovers it.
            </p>
          </header>
        </div>

        <div data-reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          <CardSlot
            label="Classic"
            sub="Dark, with a gold thread"
            card={<FintechCard template="classic" name="Kaung Hein" role="Product Designer" handle="kaung" />}
          />
          <CardSlot
            label="Minimal"
            sub="Cream paper, breathing room"
            card={<FintechCard template="minimal" name="Kaung Hein" role="Product Designer" handle="kaung" />}
          />
          <CardSlot
            label="Mono"
            sub="For developers"
            card={<FintechCard template="mono" name="Kaung Hein" role="Staff Engineer" handle="kaung" />}
          />
          <CardSlot
            label="Bold"
            sub="Brand-forward, ember orange"
            card={<FintechCard template="bold" name="Kaung Hein" role="Product Designer" handle="kaung" />}
          />
          <CardSlot
            label="Portrait"
            sub="Vertical, engraved"
            card={<FintechCard template="portrait" name="Kaung Hein" role="Product Designer, Studio Vcard" handle="kaung" />}
          />
          <CardSlot
            label="Split"
            sub="Two-tone studio card"
            card={<FintechCard template="split" name="Kaung Hein" role="Product Designer" handle="kaung" />}
          />
        </div>

        <p data-reveal className="mt-14 text-center text-[11px] uppercase tracking-[0.28em] text-[#f0e6d3]/40 font-mono">
          More templates landing every week
        </p>
      </section>

      <section className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 py-24 grid grid-cols-12 gap-6">
        <header className="col-span-12 lg:col-span-4">
          <p data-reveal className="font-mono text-[11px] tracking-[0.2em] text-[#f0e6d3]/40">§ 03 — How it goes</p>
          <h2 data-reveal data-reveal-delay="1" className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            One scan,<br />three small things<br />happen.
          </h2>
          <p data-reveal data-reveal-delay="2" className="mt-5 text-sm text-[#f0e6d3]/55 max-w-xs">
            Nothing magical. The browser does most of it. We just made the layout decent.
          </p>
        </header>

        <ol className="col-span-12 lg:col-span-8 space-y-px">
          <Step
            n="i."
            title="Camera opens your card."
            body="The QR is just a URL. Phones treat it like any link — no app prompt, no install dialog."
          />
          <Step
            n="ii."
            title="They tap save."
            body="The card downloads a .vcf file. iOS and Android both recognise it natively and offer to add a contact."
          />
          <Step
            n="iii."
            title="You're in their phone."
            body="Number, email, website, socials — all where they should be. You don't spell anything out loud."
          />
        </ol>
      </section>

      <section className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 py-24">
        <div className="grid grid-cols-12 gap-6">
          <p data-reveal className="col-span-12 lg:col-span-4 font-mono text-[11px] tracking-[0.2em] text-[#f0e6d3]/40">§ 04 — Small print, real version</p>
          <div className="col-span-12 lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-8">
            <Detail label="What is this, exactly?" body="A page at vcard.app/yourname with your contact info and a QR. That's the whole product." />
            <Detail label="Why not just AirDrop?" body="AirDrop wants two iPhones in the same room. This works between any two phones, anywhere — including the Android one your client uses." />
            <Detail label="What about my data?" body="Stored in our database, shown on your page. We don't sell anything. There's nothing to sell — it's a contact card." />
            <Detail label="Will you charge later?" body="The single-person card stays free. If team features arrive one day, those might be paid." />
          </div>
        </div>
      </section>

      <section data-reveal className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 py-24">
        <div className="rule-thin pt-12 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1]">
              Pick a name. <span className="font-serif-display italic text-[#c8a96e]">That&rsquo;s it.</span>
            </h2>
            <p className="mt-5 text-sm text-[#f0e6d3]/60 max-w-md">
              Your URL is the name you choose. Take it before someone else does — short ones are going fast.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <Link
              href="/signup"
              className="inline-flex items-center gap-3 bg-[#f0e6d3] text-[#181614] px-6 py-3.5 rounded-md text-sm font-semibold hover:bg-[#c8a96e] transition-colors"
            >
              vcard.app/<span className="font-mono text-[#181614]/55">your-name</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 mt-12">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8 rule-thin flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-baseline gap-3 text-[11px] uppercase tracking-[0.28em] text-[#f0e6d3]/40">
            <span>Vcard</span>
            <span>·</span>
            <span>{new Date().getFullYear()}</span>
            <span>·</span>
            <span>Made by Kaung</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#f0e6d3]/55">
            <Link href="/login" className="hover:text-[#f0e6d3] transition-colors">Log in</Link>
            <Link href="/signup" className="hover:text-[#f0e6d3] transition-colors">Sign up</Link>
            <a href="mailto:hi@vcard.app" className="hover:text-[#f0e6d3] transition-colors">hi@vcard.app</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function CardSlot({ label, sub, card }: { label: string; sub: string; card: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f0e6d3]/55">{label}</span>
        <span className="text-[11px] text-[#f0e6d3]/40 font-serif-display italic">{sub}</span>
      </div>
      {card}
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li data-reveal className="rule-thin py-8 grid grid-cols-12 gap-4 items-start">
      <span className="col-span-2 sm:col-span-1 font-serif-display italic text-2xl text-[#c8a96e]/80 leading-none pt-1">
        {n}
      </span>
      <div className="col-span-10 sm:col-span-11">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm text-[#f0e6d3]/60 max-w-xl">{body}</p>
      </div>
    </li>
  );
}

function Detail({ label, body }: { label: string; body: string }) {
  return (
    <div data-reveal>
      <h3 className="text-sm font-semibold text-[#f0e6d3]">{label}</h3>
      <p className="mt-2 text-sm text-[#f0e6d3]/60 leading-relaxed">{body}</p>
    </div>
  );
}
