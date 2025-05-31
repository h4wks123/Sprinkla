import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "./helpers";

export const usersTable = sqliteTable("users", {
  user_id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  contact_number: integer("contact_number").notNull(),
  user_type: text("user_type", { enum: ["customer", "employee", "driver"] })
    .default("customer")
    .notNull(),
  ...timestamps,
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
