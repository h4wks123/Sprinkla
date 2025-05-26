import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "./helpers";

export const suppliersTable = sqliteTable("suppliers", {
  supplier_id: integer("id").primaryKey({ autoIncrement: true }),
  building: text("building").notNull(),
  street_name: text("street_name").notNull(),
  city: text("city").notNull(),
  contact_number: integer("contact_number").notNull(),
  ...timestamps,
});

export type InsertSupplier = typeof suppliersTable.$inferInsert;
export type SelectSupplier = typeof suppliersTable.$inferSelect;
