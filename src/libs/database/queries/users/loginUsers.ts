"use server";

import { eq, and } from "drizzle-orm";
import { db } from "../..";
import { usersTable } from "../../schema/users";
import { loginCookies } from "@/libs/auth/middleware";

export default async function loginUser(
  emailInput: string,
  passwordInput: string
): Promise<{ status: number; message: string }> {
  try {
    const [result, setCookies] = await Promise.all([
      db
        .select({
          field2: usersTable.email,
          field3: usersTable.password,
        })
        .from(usersTable)
        .where(
          and(
            eq(usersTable.email, emailInput),
            eq(usersTable.password, passwordInput)
          )
        ),
      loginCookies(emailInput),
    ]);

    if (!result || result.length === 0) {
      return {
        status: 404,
        message: "Email or password is incorrect!",
      };
    }

    console.log(setCookies, "setCookies");
    return {
      status: 200,
      message: "Login successful!",
    };
  } catch (error) {
    console.error("Error user could not log in: ", error);

    return {
      status: 500,
      message: "Internal server error during login.",
    };
  }
}
