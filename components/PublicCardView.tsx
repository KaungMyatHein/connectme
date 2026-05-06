"use client";

import { type CardData } from "@/lib/card-data";
import { downloadVCard } from "@/lib/vcard";
import { FintechCard } from "@/components/FintechCard";

const socialLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  twitter: "Twitter",
  instagram: "Instagram",
  facebook: "Facebook",
  portfolio: "Portfolio",
};

export function PublicCardView({ card, username }: { card: CardData; username: string }) {
  const socialEntries = Object.entries(card.social ?? {}).filter(([, v]) => v);

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-8">
      <FintechCard card={card} username={username} className="w-full" />

      <div className="w-full glass rounded-2xl px-6 py-5 space-y-1">
        {card.email ? (
          <Row icon="email" label="Email" value={card.email} href={`mailto:${card.email}`} />
        ) : null}
        {card.phone ? (
          <Row icon="phone" label="Phone" value={card.phone} href={`tel:${card.phone}`} />
        ) : null}
        {card.website ? (
          <Row
            icon="web"
            label="Website"
            value={card.website.replace(/^https?:\/\//, "")}
            href={card.website}
          />
        ) : null}
        {card.address ? <Row icon="pin" label="Location" value={card.address} /> : null}
      </div>

      {socialEntries.length > 0 ? (
        <div className="w-full flex flex-wrap gap-2">
          {socialEntries.map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="glass-chip text-xs font-medium tracking-wide px-3 py-1.5 rounded-lg text-[#f0e6d3] hover:bg-[#f0e6d3]/10 transition-colors"
            >
              {socialLabels[key] ?? key}
            </a>
          ))}
        </div>
      ) : null}

      <button
        onClick={() => downloadVCard(card)}
        className="w-full py-3.5 rounded-xl font-semibold bg-[#f0e6d3] text-[#181614] hover:bg-[#c8a96e] transition-colors"
      >
        Save to Contacts
      </button>
    </div>
  );
}

function Row({
  icon, label, value, href,
}: {
  icon: "email" | "phone" | "web" | "pin";
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 py-2">
      <span className="flex-shrink-0 text-[#e8734a]">{renderIcon(icon)}</span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-widest text-[#f0e6d3]/50">{label}</div>
        <div className="text-sm font-medium truncate text-[#f0e6d3]">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity">
      {content}
    </a>
  ) : (
    content
  );
}

function renderIcon(type: "email" | "phone" | "web" | "pin") {
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "email":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      );
    case "web":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>
      );
    case "pin":
      return (
        <svg {...props}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
  }
}
