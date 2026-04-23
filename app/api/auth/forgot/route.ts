import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (!rateLimit(`forgot:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { email } = await req.json();
  if (!email) return NextResponse.json({ ok: true });

  const user = await db.user.findUnique({ where: { email } });
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    await db.passwordReset.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    const origin = req.headers.get("origin") || `http://${req.headers.get("host")}`;
    const link = `${origin}/reset/${token}`;
    await sendEmail({
      to: user.email,
      subject: "Reset your password",
      text: `Click this link to reset your password (valid for 1 hour):\n\n${link}\n\nIf you did not request this, ignore this email.`,
    });
  }

  return NextResponse.json({ ok: true });
}
