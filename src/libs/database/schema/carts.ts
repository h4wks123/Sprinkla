import { sqliteTable, integer, real, unique } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users";
import { productsTable } from "./products";
import { relations } from "drizzle-orm";
import { timestamps } from "./helpers";

export const cartsTable = sqliteTable(
  "carts",
  {
    cart_id: integer("id").primaryKey({ autoIncrement: true }),
    user_id: integer("user_id")
      .references(() => usersTable.user_id, { onDelete: "cascade" })
      .notNull(),
    product_id: integer("product_id")
      .references(() => productsTable.product_id, { onDelete: "cascade" })
      .notNull(),
    quantity: integer("quantity").notNull(),
    total_price: real("total_price").notNull(),
    ...timestamps,
  }
);

export const cartsRelations = relations(cartsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [cartsTable.user_id],
    references: [usersTable.user_id],
  }),
  product: one(productsTable, {
    fields: [cartsTable.product_id],
    references: [productsTable.product_id],
  }),
}));

export type InsertCarts = typeof cartsTable.$inferInsert;
export type SelectCarts = typeof cartsTable.$inferSelect;