"use server";

import { db } from "../..";
import { usersTable } from "../../schema/users";
import { eq, and, ne } from "drizzle-orm";

export default async function updateUsers(formData: FormData) {
  const userID = Number(formData.get("userId"));
  const userType = formData.get("userType") as "customer" | "employee";
  const email = formData.get("email") as string;
  const contactNumber = Number(formData.get("contactNumber"));
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  try {
    if (
      !userType?.trim() ||
      !email?.trim() ||
      !emailRegex.test(email) ||
      contactNumber.toString().length != 10
    ) {
      return {
        status: 400,
        message:
          "Invalid data. Please provide user type, correct email format, and at least 10 contact number digits.",
      };
    }

    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(and(eq(usersTable.email, email), ne(usersTable.user_id, userID)));

    if (existingUsers.length > 0) {
      return {
        status: 400,
        message: `Email "${email}" already exists. Please choose a different email.`,
      };
    }

    await db
      .update(usersTable)
      .set({
        user_type: userType,
        email: email,
        contact_number: contactNumber,
      })
      .where(eq(usersTable.user_id, userID));

    return {
      status: 200,
      message: `User ${userID} successfully updated.`,
    };
  } catch (error) {
    return {
      status: 500,
      message: `Failed to update user: ${error}`,
    };
  }
}
