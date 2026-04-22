"use client";

import { useState } from "react";
import { type CardData } from "@/lib/card-data";

const SOCIAL_KEYS: (keyof CardData["social"])[] = [
  "linkedin", "github", "twitter", "instagram", "facebook", "portfolio",
];

export function DashboardForm({ initial }: { initial: CardData }) {
  const [card, setCard] = useState<CardData>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function set<K extends keyof CardData>(key: K, value: CardData[K]) {
    setCard((c) => ({ ...c, [key]: value }));
  }

  function setSocial(key: keyof CardData["social"], value: string) {
    setCard((c) => ({ ...c, social: { ...c.social, [key]: value } }));
  }

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
    <div className="space-y-6">
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

      <Section title="QR style">
        <div className="flex flex-wrap gap-2">
          {(["dots", "rounded", "classy", "classy-rounded", "extra-rounded", "square"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set("qrStyle", s)}
              className={`glass-chip px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                card.qrStyle === s
                  ? "bg-[#f0e6d3] text-[#181614] border-[#f0e6d3]"
                  : "text-[#f0e6d3] hover:bg-[#f0e6d3]/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Section>

      <div className="sticky bottom-4 flex items-center gap-3">
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
