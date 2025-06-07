"use server";

import { eq } from "drizzle-orm";
import { db } from "../..";
import { usersTable } from "../../schema/users";
import bcrypt from "bcryptjs";

export default async function registerUser(
  emailInput: string,
  passwordInput: string,
  contactNumberInput: number
) {
  try {

    const saltRounds = 10;
    const [checkEmail, hashedPassword] = await Promise.all([
      await db
        .select({ field2: usersTable.email })
        .from(usersTable)
        .where(eq(usersTable.email, emailInput)),
      await bcrypt.hash(passwordInput, saltRounds),
    ]);

    if (checkEmail.length > 0) {
      return {
        status: 409,
        message: "Cannot register, user already exists!",
      };
    }

    await db.insert(usersTable).values({
      email: emailInput,
      password: hashedPassword,
      contact_number: contactNumberInput,
      user_type: "customer",
    });

    return {
      status: 200,
      message: "Registration successful!",
    };
  } catch (err) {

    return {
      status: 500,
      message: "Internal server error during user registration.",
    };
  }
}