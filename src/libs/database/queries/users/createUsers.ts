"use server";

import { notBetween } from "drizzle-orm";
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

    console.log("User has succesfully been inserted into the database!");
  } catch (err) {
    console.error("Error inserting values into the database: ", err);
  }
}
