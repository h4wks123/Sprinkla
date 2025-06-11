"use server";

import { db } from "../..";
import { usersTable } from "../../schema/users";
import { count, like, eq, and } from "drizzle-orm";
import { getServerSession } from "next-auth";

const PAGE_SIZE = 10;

export async function printUsers(
  query: string,
  currentPage: number,
  userType: string
) {
  try {
    const offset = (currentPage - 1) * PAGE_SIZE;
    const whereConditions = [];
    const session = await getServerSession();

    if (!session || !session.user?.email || session.user.role === "customer") {
      return {
        status: 400,
        users: [],
        userTypes: [],
        message: "User must be authenticated or logged in.",
      };
    }

    if (query) {
      whereConditions.push(like(usersTable.email, `%${query}%`));
    }

    if (userType) {
      whereConditions.push(
        eq(usersTable.user_type, userType as "customer" | "employee")
      );
    }
    const [users, userTypes] = await Promise.all([
      db
        .select()
        .from(usersTable)
        .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
        .limit(PAGE_SIZE)
        .offset(offset),
      db.selectDistinct({ user_type: usersTable.user_type }).from(usersTable),
    ]);
    return {
      status: 200,
      users: users,
      userTypes: userTypes.map((pt) => pt.user_type),
      message: "Succesfully displayed user.",
    };
  } catch (error) {
    return {
      status: 500,
      users: [],
      userTypes: [],
      message: `Failed to display users: ${error}`,
    };
  }
}

export async function fetchUserPages(query: string, userType: string) {
  try {
    const whereConditions = [];
    const session = await getServerSession();

    if (!session || !session.user?.email || session.user.role === "customer") {
      return {
        status: 400,
        totalPages: 0,
        message: "User must be authenticated or logged in.",
      };
    }

    if (query) {
      whereConditions.push(like(usersTable.email, `%${query}%`));
    }

    if (userType) {
      whereConditions.push(
        eq(usersTable.user_type, userType as "customer" | "employee")
      );
    }

    const result = await db
      .select({ total: count(usersTable.user_id) })
      .from(usersTable)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const totalItems = result[0]?.total ?? 0;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);

    return {
      status: 200,
      totalPages,
      message: "Sucessfully fetched user pages.",
    };
  } catch (error) {
    return {
      status: 500,
      totalPages: 0,
      message: `Error fetching user pages: ${error}`,
    };
  }
}
