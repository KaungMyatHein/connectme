import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId, verifyPassword } from "@/lib/auth";

export async function PATCH(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  if (email === user.email) return NextResponse.json({ ok: true });

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email already in use" }, { status: 400 });

  await db.user.update({ where: { id: userId }, data: { email } });
  return NextResponse.json({ ok: true });
}
