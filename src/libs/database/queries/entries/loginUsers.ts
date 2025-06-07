"use server";

import { eq } from "drizzle-orm";
import { db } from "../..";
import { usersTable } from "../../schema/users";
import bcrypt from "bcryptjs";

export default async function loginUser(
  emailInput: string,
  passwordInput: string
) {
  try {
    const result = await db
      .select({
        field1: usersTable.user_id,
        field2: usersTable.email,
        field3: usersTable.password,
        field4: usersTable.contact_number,
        field5: usersTable.user_type,
      })
      .from(usersTable)
      .where(eq(usersTable.email, emailInput));

    const user = result[0];
    const isValid = user && (await bcrypt.compare(passwordInput, user.field3));

    if (!isValid) {
      return {
        status: 404,
        message: "Email or password is incorrect!",
        id: null,
        role: null,
        email: null,
        contactNumber: null,
      };
    }

    return {
      status: 200,
      message: "has succesfully logged in!",
      id: result[0].field1,
      role: result[0].field5,
      email: result[0].field2,
      contactNumber: result[0].field4,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal server error during login.",
      id: null,
      role: null,
      email: null,
      contactNumber: null,
    };
  }
}
