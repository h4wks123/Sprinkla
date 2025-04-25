import { sql } from "drizzle-orm";
import { boolean } from "drizzle-orm/gel-core";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  user_type: integer("user_type").notNull().default(1),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;