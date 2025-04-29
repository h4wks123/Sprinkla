"use server";

import { eq } from "drizzle-orm";
import { db } from "../..";
import { usersTable } from "../../schema/users";

export default async function checkUserRole(emailInput: string) {
  try {
    const userRole = await db
      .select({ field5: usersTable.user_type })
      .from(usersTable)
      .where(eq(usersTable.email, emailInput));

    if (userRole[0].field5 === "admin") {
      return "admin";
    } else if (userRole[0].field5 === "customer") {
      return "customer";
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}
