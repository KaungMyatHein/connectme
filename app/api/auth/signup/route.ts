import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession, hashPassword, isReservedUsername, isValidUsername } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (!rateLimit(`signup:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many signups. Try again later." }, { status: 429 });
  }
  const { email, password, username, firstName, lastName } = await req.json();

  if (!email || !password || !username || !firstName || !lastName) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be 8+ chars" }, { status: 400 });
  }
  const uname = String(username).toLowerCase();
  if (!isValidUsername(uname)) {
    return NextResponse.json({ error: "Username: 2-30 chars, a-z 0-9 _ -" }, { status: 400 });
  }
  if (isReservedUsername(uname)) {
    return NextResponse.json({ error: "Username reserved" }, { status: 400 });
  }

  const existingEmail = await db.user.findUnique({ where: { email } });
  if (existingEmail) return NextResponse.json({ error: "Email taken" }, { status: 400 });
  const existingUsername = await db.user.findUnique({ where: { username: uname } });
  if (existingUsername) return NextResponse.json({ error: "Username taken" }, { status: 400 });

  const user = await db.user.create({
    data: {
      email,
      username: uname,
      passwordHash: await hashPassword(password),
      card: {
        create: {
          firstName,
          lastName,
          email,
        },
      },
    },
  });

  await createSession(user.id);
  return NextResponse.json({ ok: true, username: uname });
}
