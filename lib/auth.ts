import { createHash, randomBytes } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/prisma/db";
import { verifyPassword } from "./password";

const COOKIE = "admin_session";
const SESSION_DAYS = 30;
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

const orm = db.orm.public;

// only the hash is stored, so a leaked sessions table can't be replayed
const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

// the database hands timestamps back as "2026-10-04 21:05:08.3+00"
const parseTimestamp = (value: string) =>
  new Date(value.replace(" ", "T").replace(/([+-]\d{2})$/, "$1:00"));

/**
 * Checks an email and password, and on success starts a session. Returns
 * an error message to show, or null. Five wrong passwords lock the account
 * for fifteen minutes.
 */
export async function signIn(
  email: string,
  password: string,
): Promise<string | null> {
  const invalid = "wrong email or password";
  const user = await orm.AdminUser.where({
    email: email.trim().toLowerCase(),
  }).first();
  if (!user) return invalid;

  if (user.lockedUntil && parseTimestamp(user.lockedUntil) > new Date()) {
    return "too many attempts, try again in a few minutes";
  }

  if (!verifyPassword(password, user.passwordHash)) {
    const failedAttempts = user.failedAttempts + 1;
    const locked = failedAttempts >= MAX_FAILED_ATTEMPTS;
    await orm.AdminUser.where({ id: user.id }).update({
      failedAttempts: locked ? 0 : failedAttempts,
      lockedUntil: locked
        ? new Date(Date.now() + LOCK_MINUTES * 60_000).toISOString()
        : null,
    });
    return invalid;
  }

  await orm.AdminUser.where({ id: user.id }).update({
    failedAttempts: 0,
    lockedUntil: null,
  });

  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86_400_000);
  await orm.Session.create({
    tokenHash: hashToken(token),
    userId: user.id,
    expiresAt: expiresAt.toISOString(),
  });
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/dashboard",
    expires: expiresAt,
  });
  return null;
}

// looked up once per request, however many pages and layouts ask
export const getAdmin = cache(async () => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const session = await orm.Session.where({
    tokenHash: hashToken(token),
  }).first();
  if (!session || parseTimestamp(session.expiresAt) < new Date()) return null;
  return await orm.AdminUser.select("id", "email").first({
    id: session.userId,
  });
});

/** For every dashboard page and action: sends anyone signed out to login. */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/dashboard/login");
  return admin;
}

export async function signOut() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) {
    await orm.Session.where({ tokenHash: hashToken(token) }).delete();
  }
  jar.delete({ name: COOKIE, path: "/dashboard" });
}
