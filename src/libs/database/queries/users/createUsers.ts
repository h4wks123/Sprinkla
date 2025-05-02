"use server";

import { db } from "../..";
import { usersTable } from "../../schema/users";

export default async function registerUser(
  emailInput: string,
  passwordInput: string,
  contactNumberInput: number
) {
  try {
    await db.insert(usersTable).values({
      email: emailInput,
      password: passwordInput,
      contact_number: contactNumberInput,
      user_type: "customer",
    });

    return {
      status: 200,
      message: "Login successful!",
      type: "None",
    };
  } catch (err) {
    console.error("Error inserting values into the database: ", err);

    return {
      status: 500,
      message: "Internal server error during user registration.",
      type: "None",
    };
  }
}
