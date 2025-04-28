"use server";

import { NextRequest } from "next/server";
import { getSession, login, logout, updateSession } from "./session";

export async function loginCookies(email: string) {
  await getSession();
  await logout();
  await login(email);
}

export async function middleware(request: NextRequest) {
  try {
    const sessionCookie = await getSession();

    if (!sessionCookie) {
      await logout();
      throw new Error("cookie is empty");
    }

    updateSession(request);
  } catch (error) {
    console.error(error);
  }
}
