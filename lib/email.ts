import nodemailer from "nodemailer";

type SendArgs = { to: string; subject: string; text: string; html?: string };

let cached: nodemailer.Transporter | null | undefined;

function getTransport() {
  if (cached !== undefined) return cached;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    cached = null;
    return null;
  }
  cached = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return cached;
}

export async function sendEmail({ to, subject, text, html }: SendArgs) {
  const transport = getTransport();
  if (!transport) {
    console.log(`[email] SMTP not configured. Would send to ${to}:`);
    console.log(`[email] Subject: ${subject}`);
    console.log(`[email] Body: ${text}`);
    return { delivered: false };
  }
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  await transport.sendMail({ from, to, subject, text, html });
  return { delivered: true };
}
