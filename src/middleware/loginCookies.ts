"use server";

import { getSession, login } from "../libs/libs";

export default async function loginCookies(email: string) {
  const session = await getSession();
  const loginSession = await login(email);
}
