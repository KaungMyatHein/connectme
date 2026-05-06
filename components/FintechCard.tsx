"use client";

import { useEffect, useRef } from "react";
import type { CardData, TemplateKey } from "@/lib/card-data";
import { StyledQR } from "@/components/StyledQR";

export type Template = TemplateKey;

type LegacyProps = {
  name: string;
  role: string;
  handle?: string;
  email?: string;
  phone?: string;
};

export type TiltMode = "follow" | "drag" | "none";

type Props = Partial<LegacyProps> & {
  card?: CardData;
  username?: string;
  template?: Template;
  tilt?: TiltMode;
  floating?: boolean;
  className?: string;
};

const aspect: Record<Template, string> = {
  classic: "1.6 / 1",
  minimal: "1.6 / 1",
  mono: "1.6 / 1",
  bold: "1.6 / 1",
  portrait: "1 / 1.6",
  split: "1.6 / 1",
};

const palette: Record<Template, { bg: string; fg: string; accent: string }> = {
  classic:  { bg: "#15110f", fg: "#f0e6d3", accent: "#c8a96e" },
  minimal:  { bg: "#f5f1e8", fg: "#1c1a17", accent: "#c8a96e" },
  mono:     { bg: "#0c0a08", fg: "#f0e6d3", accent: "#76d28d" },
  bold:     { bg: "#e8734a", fg: "#1c1a17", accent: "#1c1a17" },
  portrait: { bg: "#efe3c5", fg: "#1c1a17", accent: "#e8734a" },
  split:    { bg: "#15110f", fg: "#f0e6d3", accent: "#c8a96e" },
};

export function FintechCard({
  card,
  username,
  name,
  role,
  handle,
  email,
  phone,
  template,
  tilt = "follow",
  floating = false,
  className = "",
}: Props) {
  const data: Data = card
    ? {
        name: `${card.firstName} ${card.lastName}`.trim() || (username ? `@${username}` : ""),
        role: [card.title, card.organization].filter(Boolean).join(" · ") || card.tagline || "",
        handle: username ?? handle ?? "",
        email: card.email,
        phone: card.phone,
        website: card.website,
      }
    : {
        name: name ?? "",
        role: role ?? "",
        handle: handle ?? "kaung",
        email: email ?? "hi@vcard.app",
        phone: phone ?? "+95 9 555 0142",
        website: "",
      };

  const tpl: Template = template ?? card?.template ?? "classic";

  return (
    <TiltCard
      tilt={tilt}
      floating={floating}
      className={className}
      aspectRatio={aspect[tpl]}
      back={<CardBack tpl={tpl} handle={data.handle || username || "yourname"} name={data.name} />}
    >
      {tpl === "classic" && <ClassicTpl {...data} />}
      {tpl === "minimal" && <MinimalTpl {...data} />}
      {tpl === "mono" && <MonoTpl {...data} />}
      {tpl === "bold" && <BoldTpl {...data} />}
      {tpl === "portrait" && <PortraitTpl {...data} />}
      {tpl === "split" && <SplitTpl {...data} />}
    </TiltCard>
  );
}

function CardBack({ tpl, handle, name }: { tpl: Template; handle: string; name: string }) {
  const c = palette[tpl];
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-between p-4"
      style={{ background: c.bg, color: c.fg }}
    >
      <div className="flex items-center justify-between gap-3 w-full min-w-0">
        <div className="font-serif-display text-sm tracking-tight shrink-0">Vcard</div>
        <div className="font-mono text-[8px] uppercase tracking-[0.32em] opacity-50 break-words text-right min-w-0 leading-[1.3]">
          {name || "—"}
        </div>
      </div>

      <CardQR handle={handle} fg={c.fg} bg={c.bg} size={72} />

      <div className="text-center leading-tight w-full min-w-0">
        <div className="font-mono text-[8px] uppercase tracking-[0.32em] opacity-60">scan to save</div>
        <div className="font-mono text-[10px] tracking-[0.04em] mt-0.5 break-all">
          vcard.app/<span style={{ color: c.accent, fontWeight: 600 }}>{handle}</span>
        </div>
      </div>
    </div>
  );
}

function TiltCard({
  children, back, tilt = "follow", floating, className, aspectRatio,
}: {
  children: React.ReactNode;
  back?: React.ReactNode;
  tilt?: TiltMode;
  floating?: boolean;
  className?: string;
  aspectRatio: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || tilt === "none") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    if (tilt === "follow") {
      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const ry = (x - 0.5) * 12;
          const rx = (0.5 - y) * 8;
          el.style.setProperty("--ry", `${ry}deg`);
          el.style.setProperty("--rx", `${rx}deg`);
        });
      };
      const onLeave = () => {
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--rx", "0deg");
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        cancelAnimationFrame(raf);
      };
    }

    // tilt === "drag" — accumulate rotation while pointer is held
    const state = { rx: 0, ry: 0, dragging: false, lastX: 0, lastY: 0 };
    const apply = () => {
      el.style.setProperty("--rx", `${state.rx}deg`);
      el.style.setProperty("--ry", `${state.ry}deg`);
    };
    const onDown = (e: PointerEvent) => {
      state.dragging = true;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      el.classList.add("is-dragging");
      try { el.setPointerCapture(e.pointerId); } catch {}
    };
    const onMove = (e: PointerEvent) => {
      if (!state.dragging) return;
      const dx = e.clientX - state.lastX;
      const dy = e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.ry += dx * 0.5;
      state.rx = Math.max(-60, Math.min(60, state.rx - dy * 0.5));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    const stop = (e: PointerEvent) => {
      if (!state.dragging) return;
      state.dragging = false;
      el.classList.remove("is-dragging");
      try { el.releasePointerCapture(e.pointerId); } catch {}
    };
    const onDouble = () => {
      state.rx = 0; state.ry = 0;
      apply();
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", stop);
    el.addEventListener("pointercancel", stop);
    el.addEventListener("dblclick", onDouble);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", stop);
      el.removeEventListener("pointercancel", stop);
      el.removeEventListener("dblclick", onDouble);
      cancelAnimationFrame(raf);
    };
  }, [tilt]);

  const draggable = tilt === "drag";

  return (
    <div className={`fc-stage ${className ?? ""}`}>
      <div
        ref={ref}
        className={`fc-card ${draggable ? "is-draggable" : ""} ${floating ? "is-floating" : ""}`}
        style={{ aspectRatio }}
      >
        <div className="fc-face fc-face-front">
          <div className="fc-surface">
            <div className="absolute inset-0">{children}</div>
          </div>
        </div>
        {back ? (
          <div className="fc-face fc-face-back">
            <div className="fc-surface">{back}</div>
          </div>
        ) : null}
        <div className="fc-edge" />
      </div>
    </div>
  );
}

type Data = { name: string; role: string; handle: string; email: string; phone: string; website?: string };

/* 1. CLASSIC — dark, gold accent, premium feel */
function ClassicTpl({ name, role, handle, email, phone }: Data) {
  return (
    <div className="absolute inset-0 bg-[#15110f] text-[#f0e6d3] p-5 sm:p-6 flex flex-col justify-between gap-2">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-serif-display text-base tracking-tight">Vcard</div>
          <div className="font-mono text-[8px] uppercase tracking-[0.32em] text-[#f0e6d3]/45 mt-0.5">Member · 2026</div>
        </div>
        <CardQR handle={handle} fg="#f0e6d3" bg="#15110f" size={36} />
      </div>

      <div className="min-w-0">
        <h3 className="font-serif-display text-xl sm:text-2xl leading-[1.05] tracking-tight break-words line-clamp-2">{name}</h3>
        {role ? <p className="mt-1 text-[10px] text-[#c8a96e] break-words line-clamp-2">{role}</p> : null}
      </div>

      <div className="space-y-1 text-[10px] font-mono">
        {phone ? <ContactLine label="TEL" value={phone} /> : null}
        {email ? <ContactLine label="EML" value={email} /> : null}
        <ContactLine label="WEB" value={`vcard.app/${handle}`} />
      </div>
    </div>
  );
}

function ContactLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2 min-w-0">
      <span className="text-[#f0e6d3]/40 tracking-[0.2em] shrink-0 w-8">{label}</span>
      <span className="text-[#f0e6d3]/85 break-all min-w-0 flex-1 leading-[1.35]">{value}</span>
    </div>
  );
}

/* 2. MINIMAL — clean cream paper, lots of whitespace */
function MinimalTpl({ name, role, handle, email, phone }: Data) {
  return (
    <div className="absolute inset-0 bg-[#f5f1e8] text-[#1c1a17] p-5 sm:p-6 flex flex-col justify-between gap-3">
      <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#1c1a17]/55">Vcard</div>

      <div className="min-w-0">
        <h3 className="font-serif-display text-2xl sm:text-[1.85rem] leading-[1.05] tracking-tight break-words line-clamp-2">{name}</h3>
        {role ? <p className="mt-1.5 text-[11px] text-[#1c1a17]/65 break-words line-clamp-2">{role}</p> : null}
      </div>

      <div className="flex items-end justify-between gap-3 min-w-0">
        <div className="space-y-0.5 text-[10px] font-mono text-[#1c1a17]/75 min-w-0 flex-1 leading-[1.4]">
          {phone ? <div className="break-all">{phone}</div> : null}
          {email ? <div className="break-all">{email}</div> : null}
          <div className="break-all">vcard.app/{handle}</div>
        </div>
        <div className="shrink-0">
          <CardQR handle={handle} fg="#1c1a17" bg="#f5f1e8" size={42} />
        </div>
      </div>
    </div>
  );
}

/* 3. MONO — engineer's card, key/value contact lines */
function MonoTpl({ name, role, handle, email, phone }: Data) {
  return (
    <div className="absolute inset-0 bg-[#0c0a08] text-[#f0e6d3] font-mono p-5 sm:p-6 flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between gap-2 text-[9px] uppercase tracking-[0.32em] text-[#f0e6d3]/45">
        <span className="truncate">Vcard ▸ contact card</span>
        <span className="text-[#76d28d] shrink-0">● online</span>
      </div>

      <div className="min-w-0">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight break-words line-clamp-2">{name}</h3>
        {role ? <p className="mt-1 text-[11px] text-[#f0e6d3]/55 break-words line-clamp-2">{role}</p> : null}
      </div>

      <div className="flex items-end justify-between gap-3 min-w-0">
        <div className="space-y-1 text-[10px] min-w-0 flex-1 leading-[1.4]">
          {phone ? <Kv k="tel" v={phone} /> : null}
          {email ? <Kv k="eml" v={email} /> : null}
          <Kv k="web" v={`vcard.app/${handle}`} accent />
        </div>
        <div className="shrink-0">
          <CardQR handle={handle} fg="#76d28d" bg="#0c0a08" size={44} />
        </div>
      </div>
    </div>
  );
}

/* 4. BOLD — saturated ember block, brand-forward */
function BoldTpl({ name, role, handle, email, phone }: Data) {
  return (
    <div className="absolute inset-0 bg-[#e8734a] text-[#1c1a17] p-5 sm:p-6 flex flex-col justify-between gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="font-bold text-base tracking-tight">VCARD</div>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] bg-[#1c1a17] text-[#e8734a] px-2 py-0.5 shrink-0">No. 001</span>
      </div>

      <div className="min-w-0">
        <h3 className="font-bold text-2xl sm:text-[1.85rem] leading-[0.98] tracking-[-0.02em] break-words line-clamp-2">{name}</h3>
        {role ? <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1c1a17]/75 break-words line-clamp-2">{role}</p> : null}
      </div>

      <div className="flex items-end justify-between gap-3 border-t border-[#1c1a17]/35 pt-2.5 min-w-0">
        <div className="space-y-0.5 text-[10px] font-mono min-w-0 flex-1 leading-[1.4]">
          {phone ? <div className="break-all">{phone}</div> : null}
          {email ? <div className="break-all">{email}</div> : null}
          <div className="font-bold break-all">vcard.app/{handle}</div>
        </div>
        <div className="shrink-0">
          <CardQR handle={handle} fg="#1c1a17" bg="#e8734a" size={42} />
        </div>
      </div>
    </div>
  );
}

/* 5. PORTRAIT — vertical, engraved, traditional */
function PortraitTpl({ name, role, handle, email, phone }: Data) {
  return (
    <div className="absolute inset-0 bg-[#efe3c5] text-[#1c1a17] p-4">
      <div className="absolute inset-4 border border-[#1c1a17]/80" />
      <div className="absolute inset-[20px] border border-[#1c1a17]/30" />

      <div className="relative h-full flex flex-col items-center justify-between text-center px-5 py-6 min-w-0">
        <div className="font-mono text-[8px] uppercase tracking-[0.45em] text-[#1c1a17]/70">Vcard</div>

        <div className="min-w-0 w-full">
          <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#1c1a17]/55 mb-2">— Mr. —</p>
          <h3 className="font-serif-display text-[1.5rem] leading-[1.05] tracking-tight break-words line-clamp-2">{name}</h3>
          {role ? <p className="mt-1.5 font-serif-display italic text-[11px] text-[#1c1a17]/75 break-words line-clamp-2">{role}</p> : null}
        </div>

        <div className="space-y-1 text-[9px] font-mono uppercase tracking-[0.12em] text-[#1c1a17]/70 min-w-0 w-full leading-[1.5]">
          {phone ? <div className="break-all">{phone}</div> : null}
          {email ? <div className="break-all">{email}</div> : null}
          <div className="pt-1.5 border-t border-[#1c1a17]/25 mt-2 tracking-[0.18em] break-all">
            vcard.app/{handle}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 6. SPLIT — two-tone, dark/light, designer studio card */
function SplitTpl({ name, role, handle, email, phone }: Data) {
  return (
    <div className="absolute inset-0 flex">
      {/* Left dark side: identity */}
      <div className="w-[55%] bg-[#15110f] text-[#f0e6d3] p-5 flex flex-col justify-between gap-3 min-w-0">
        <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#f0e6d3]/45">Vcard</div>
        <div className="min-w-0">
          <h3 className="font-serif-display text-xl sm:text-2xl leading-[1.05] tracking-tight break-words line-clamp-2">{name}</h3>
          {role ? <p className="mt-1.5 text-[11px] text-[#c8a96e] break-words line-clamp-2">{role}</p> : null}
        </div>
        <div className="font-mono text-[10px] tracking-[0.04em] text-[#f0e6d3]/65 break-all">
          vcard.app/<span className="text-[#f0e6d3]">{handle}</span>
        </div>
      </div>

      {/* Right cream side: contact */}
      <div className="w-[45%] bg-[#efe3c5] text-[#1c1a17] p-4 flex flex-col justify-between gap-2 min-w-0">
        <div className="shrink-0">
          <CardQR handle={handle} fg="#1c1a17" bg="#efe3c5" size={40} />
        </div>
        <div className="space-y-1.5 text-[9px] font-mono min-w-0 leading-[1.4]">
          {phone ? (
            <div className="min-w-0">
              <div className="uppercase tracking-[0.32em] text-[#1c1a17]/50">Tel</div>
              <div className="mt-0.5 break-all">{phone}</div>
            </div>
          ) : null}
          {email ? (
            <div className="min-w-0">
              <div className="uppercase tracking-[0.32em] text-[#1c1a17]/50">Email</div>
              <div className="mt-0.5 break-all">{email}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Bits --------------------------- */

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2 min-w-0">
      <span className="text-[#f0e6d3]/40 tracking-[0.2em] shrink-0">{label}</span>
      <span className="text-[#f0e6d3]/85 break-all min-w-0 flex-1">{value}</span>
    </div>
  );
}

function Kv({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex gap-2 min-w-0">
      <span className="text-[#f0e6d3]/40 w-7 shrink-0">{k}</span>
      <span className="text-[#f0e6d3]/40 shrink-0">·</span>
      <span className={`break-all min-w-0 flex-1 ${accent ? "text-[#c8a96e]" : "text-[#f0e6d3]"}`}>{v}</span>
    </div>
  );
}

function cardUrl(handle: string) {
  if (!handle) return "";
  if (typeof window !== "undefined") return `${window.location.origin}/${handle}`;
  return `https://vcard.app/${handle}`;
}

function CardQR({
  handle, fg, bg, size = 56,
}: { handle: string; fg: string; bg: string; size?: number }) {
  const value = cardUrl(handle);
  if (!value) {
    return <div style={{ width: size, height: size }} aria-hidden />;
  }
  return (
    <div style={{ width: size, height: size, lineHeight: 0 }} aria-label={`QR code for vcard.app/${handle}`}>
      <StyledQR value={value} size={size} fgColor={fg} bgColor={bg} style="dots" />
    </div>
  );
}
