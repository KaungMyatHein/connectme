import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { destroySession, getSessionUserId, verifyPassword } from "@/lib/auth";

export async function DELETE(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { password } = await req.json();
  if (!password) return NextResponse.json({ error: "Password required" }, { status: 400 });

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  await db.user.delete({ where: { id: userId } });
  await destroySession();
  return NextResponse.json({ ok: true });
}
