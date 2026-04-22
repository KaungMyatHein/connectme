import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { db } from "./db";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret");
const COOKIE = "session";
const MAX_AGE = 60 * 60 * 24 * 30;

export async function hashPassword(pw: string) {
  return bcrypt.hash(pw, 10);
}

export async function verifyPassword(pw: string, hash: string) {
  return bcrypt.compare(pw, hash);
}

export async function createSession(userId: string) {
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(SECRET);
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getSessionUserId(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return (payload.sub as string) ?? null;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const id = await getSessionUserId();
  if (!id) return null;
  return db.user.findUnique({ where: { id }, include: { card: true } });
}

const RESERVED = new Set([
  "dashboard", "login", "signup", "logout", "api", "_next",
  "favicon.ico", "robots.txt", "sitemap.xml", "admin", "settings",
  "about", "help", "support", "terms", "privacy", "static", "public",
  "qr", "u", "user", "users", "profile", "me",
]);

export function isReservedUsername(u: string) {
  return RESERVED.has(u.toLowerCase());
}

export function isValidUsername(u: string) {
  return /^[a-z0-9][a-z0-9_-]{1,29}$/.test(u);
}
