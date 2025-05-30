"use server";

import { eq, and } from "drizzle-orm";
import { db } from "../..";
import { usersTable } from "../../schema/users";

export default async function loginUser(
  emailInput: string,
  passwordInput: string
) {
  try {
    const [result, userRole] = await Promise.all([
      db
        .select({
          field1: usersTable.user_id,
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
      db
        .select({ field5: usersTable.user_type })
        .from(usersTable)
        .where(eq(usersTable.email, emailInput)),
    ]);

    if (!result || result.length === 0) {
      return {
        status: 404,
        message: "Email or password is incorrect!",
        id: null,
        role: null,
        email: null,
      };
    }

    return {
      status: 200,
      message: "Login successful!",
      id: result[0].field1,
      role: userRole[0].field5,
      email: result[0].field2,
    };
  } catch (error) {
    console.error("Error user could not log in: ", error);

    return {
      status: 500,
      message: "Internal server error during login.",
      id: null,
      role: null,
      email: null,
    };
  }
}
