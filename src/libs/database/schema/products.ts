import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { timestamps } from "./helpers";
import { suppliersTable } from "./suppliers";

export const productsTable = sqliteTable("products", {
  product_id: integer("id").primaryKey({ autoIncrement: true }),
  supplier_id: integer("id")
    .references(() => suppliersTable.supplier_id, { onDelete: "no action" })
    .notNull(),
  product_type: text("product_type").notNull(),
  product: text("product").unique().notNull(),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull(),
  ...timestamps,
});

export type InsertPost = typeof productsTable.$inferInsert;
export type SelectPost = typeof productsTable.$inferSelect;
