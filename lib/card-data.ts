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
};

export type QRStyleKey = "dots" | "rounded" | "classy" | "classy-rounded" | "square" | "extra-rounded";

export function parseSocial(raw: string): CardData["social"] {
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}
