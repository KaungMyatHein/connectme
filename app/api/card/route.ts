import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

const FIELDS = [
  "firstName", "lastName", "title", "organization", "tagline",
  "email", "phone", "website", "address", "qrStyle",
] as const;

export async function PATCH(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const data: Record<string, string> = {};
  for (const f of FIELDS) {
    if (typeof body[f] === "string") data[f] = body[f];
  }
  if (body.social && typeof body.social === "object") {
    data.social = JSON.stringify(body.social);
  }

  const card = await db.card.update({ where: { userId }, data });
  return NextResponse.json({ ok: true, card });
}
