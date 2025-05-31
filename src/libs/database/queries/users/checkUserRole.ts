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

    if (userRole[0].field5 === "employee") {
      return {
        status: 200,
        message: "User role is an employee",
        mode: "employee",
      };
    } else if (userRole[0].field5 === "customer") {
      return {
        status: 200,
        message: "User role is an customer",
        mode: "customer",
      };
    } else {
      return {
        status: 404,
        message: "User role cannot be determined",
      };
    }
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: "Internal server error during user role employee registration.",
    };
  }
}
