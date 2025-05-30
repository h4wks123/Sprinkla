"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 min from now")
    .sign(key);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(email: string) {
  const cookieStore = await cookies();

  // Destroy old session
  logout();

  // Create the session
  const expires = new Date(Date.now() + 24 * 60 * 60 * 100000);
  const session = await encrypt({ email, expires });

  // Save the session in a cookie
  cookieStore.set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  const cookieStore = await cookies();

  // Destroy the session
  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
