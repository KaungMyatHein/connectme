"use client";

import { useState } from "react";
import { TEMPLATE_KEYS, TEMPLATE_META, type CardData } from "@/lib/card-data";
import { FintechCard } from "@/components/FintechCard";

const SOCIAL_KEYS: (keyof CardData["social"])[] = [
  "linkedin", "github", "twitter", "instagram", "facebook", "portfolio",
];

export function DashboardForm({ initial, username }: { initial: CardData; username: string }) {
  const [card, setCard] = useState<CardData>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function set<K extends keyof CardData>(key: K, value: CardData[K]) {
    setCard((c) => ({ ...c, [key]: value }));
  }

  function setSocial(key: keyof CardData["social"], value: string) {
    setCard((c) => ({ ...c, social: { ...c.social, [key]: value } }));
  }

  const currentIndex = TEMPLATE_KEYS.indexOf(card.template);
  const prev = () => {
    const i = (currentIndex - 1 + TEMPLATE_KEYS.length) % TEMPLATE_KEYS.length;
    set("template", TEMPLATE_KEYS[i]);
  };
  const next = () => {
    const i = (currentIndex + 1) % TEMPLATE_KEYS.length;
    set("template", TEMPLATE_KEYS[i]);
  };

  async function save() {
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/card", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });
    setSaving(false);
    if (res.ok) setMessage({ type: "ok", text: "Saved" });
    else {
      const data = await res.json().catch(() => ({}));
      setMessage({ type: "err", text: data.error || "Save failed" });
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
      {/* LEFT — form */}
      <div className="space-y-6 min-w-0">
        <Section title="Identity">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="First name" value={card.firstName} onChange={(v) => set("firstName", v)} />
            <Field label="Last name" value={card.lastName} onChange={(v) => set("lastName", v)} />
            <Field label="Title" value={card.title} onChange={(v) => set("title", v)} />
            <Field label="Organization" value={card.organization} onChange={(v) => set("organization", v)} />
            <Field className="sm:col-span-2" label="Tagline" value={card.tagline} onChange={(v) => set("tagline", v)} />
          </div>
        </Section>

        <Section title="Contact">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email" value={card.email} onChange={(v) => set("email", v)} />
            <Field label="Phone" value={card.phone} onChange={(v) => set("phone", v)} />
            <Field label="Website" value={card.website} onChange={(v) => set("website", v)} />
            <Field label="Address" value={card.address} onChange={(v) => set("address", v)} />
          </div>
        </Section>

        <Section title="Social links">
          <div className="grid sm:grid-cols-2 gap-4">
            {SOCIAL_KEYS.map((k) => (
              <Field
                key={k}
                label={k.charAt(0).toUpperCase() + k.slice(1)}
                value={card.social[k] ?? ""}
                onChange={(v) => setSocial(k, v)}
                placeholder="https://…"
              />
            ))}
          </div>
        </Section>

        <div className="sticky bottom-4 flex items-center gap-3 pt-2">
          <button
            onClick={save}
            disabled={saving}
            className="px-6 py-3 rounded-xl font-semibold bg-[#f0e6d3] text-[#181614] hover:bg-[#c8a96e] transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {message ? (
            <span className={`text-sm ${message.type === "ok" ? "text-[#c8a96e]" : "text-[#e8734a]"}`}>
              {message.text}
            </span>
          ) : null}
        </div>
      </div>

      {/* RIGHT — sticky live preview with inline minimal template picker */}
      <aside className="lg:sticky lg:top-6">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#c8a96e]">Live preview</h2>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#f0e6d3]/40">
              {currentIndex + 1} / {TEMPLATE_KEYS.length}
            </span>
          </div>

          {/* Card — full width */}
          <div className="py-2">
            <FintechCard card={card} username={username} tilt="drag" />
          </div>

          {/* Nav row: prev · label · next */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous template"
              className="shrink-0 w-8 h-8 rounded-full grid place-items-center text-[#f0e6d3]/60 hover:text-[#c8a96e] hover:bg-[#f0e6d3]/5 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            <div className="text-center min-w-0">
              <div className="font-serif-display text-base text-[#f0e6d3] truncate">
                {TEMPLATE_META[card.template].label}
              </div>
              <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#f0e6d3]/45 mt-0.5 truncate">
                {TEMPLATE_META[card.template].sub}
              </div>
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next template"
              className="shrink-0 w-8 h-8 rounded-full grid place-items-center text-[#f0e6d3]/60 hover:text-[#c8a96e] hover:bg-[#f0e6d3]/5 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {TEMPLATE_KEYS.map((key) => {
              const isActive = card.template === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => set("template", key)}
                  aria-label={`Select ${TEMPLATE_META[key].label}`}
                  title={TEMPLATE_META[key].label}
                  className={`h-1.5 rounded-full transition-all ${
                    isActive
                      ? "w-6 bg-[#c8a96e]"
                      : "w-1.5 bg-[#f0e6d3]/20 hover:bg-[#f0e6d3]/40"
                  }`}
                />
              );
            })}
          </div>

          <p className="mt-3 text-center text-[10px] font-mono uppercase tracking-[0.28em] text-[#f0e6d3]/35">
            Drag to rotate · Double-click to reset
          </p>
        </div>
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-xs uppercase tracking-[0.2em] text-[#c8a96e] mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, className = "",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-widest text-[#f0e6d3]/50">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[#f0e6d3]/5 border border-[#f0e6d3]/15 text-[#f0e6d3] placeholder-[#f0e6d3]/30 outline-none focus:border-[#c8a96e] transition-colors"
      />
    </label>
  );
}
