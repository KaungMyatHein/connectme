export type CardData = {
  firstName: string;
  lastName: string;
  title: string;
  organization: string;
  tagline: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    facebook?: string;
    portfolio?: string;
  };
  qrStyle: string;
  template: TemplateKey;
};

export type QRStyleKey = "dots" | "rounded" | "classy" | "classy-rounded" | "square" | "extra-rounded";

export const TEMPLATE_KEYS = ["classic", "minimal", "mono", "bold", "portrait", "split"] as const;
export type TemplateKey = (typeof TEMPLATE_KEYS)[number];

export function isTemplateKey(v: unknown): v is TemplateKey {
  return typeof v === "string" && (TEMPLATE_KEYS as readonly string[]).includes(v);
}

export const TEMPLATE_META: Record<TemplateKey, { label: string; sub: string }> = {
  classic:  { label: "Classic",  sub: "Dark, with a gold thread" },
  minimal:  { label: "Minimal",  sub: "Cream paper, breathing room" },
  mono:     { label: "Mono",     sub: "For developers" },
  bold:     { label: "Bold",     sub: "Brand-forward, ember orange" },
  portrait: { label: "Portrait", sub: "Vertical, engraved" },
  split:    { label: "Split",    sub: "Two-tone studio card" },
};

export function parseSocial(raw: string): CardData["social"] {
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}
