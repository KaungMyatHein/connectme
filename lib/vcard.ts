import type { CardData } from "./card-data";

function escape(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function buildVCard(card: CardData): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escape(card.lastName)};${escape(card.firstName)};;;`,
    `FN:${escape(`${card.firstName} ${card.lastName}`)}`,
    `ORG:${escape(card.organization)}`,
    `TITLE:${escape(card.title)}`,
    `TEL;TYPE=CELL:${card.phone}`,
    `EMAIL;TYPE=INTERNET:${card.email}`,
    `URL:${card.website}`,
  ];

  if (card.address) {
    lines.push(`ADR;TYPE=WORK:;;${escape(card.address)};;;;`);
  }

  if (card.social?.linkedin) lines.push(`URL;TYPE=LinkedIn:${card.social.linkedin}`);
  if (card.social?.github) lines.push(`URL;TYPE=GitHub:${card.social.github}`);
  if (card.social?.twitter) lines.push(`URL;TYPE=Twitter:${card.social.twitter}`);
  if (card.social?.instagram) lines.push(`URL;TYPE=Instagram:${card.social.instagram}`);
  if (card.social?.facebook) lines.push(`URL;TYPE=Facebook:${card.social.facebook}`);

  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export function downloadVCard(card: CardData): void {
  const vcard = buildVCard(card);
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${card.firstName}_${card.lastName}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
