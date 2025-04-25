import { db } from "@/database";
import { usersTable, InsertUser } from "@/database/schema/users";

export async function createUsers(data: InsertUser) {
  await db.insert(usersTable).values(data);
}
