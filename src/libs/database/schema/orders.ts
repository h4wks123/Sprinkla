import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users";
import { deliveriesTable } from "./deliveries";
import { productsTable } from "./products";
import { timestamps } from "./helpers";
import { relations } from "drizzle-orm";

export const ordersTable = sqliteTable("orders", {
  order_id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .references(() => usersTable.user_id)
    .notNull(),
  delivery_id: integer("delivery_id")
    .references(() => deliveriesTable.delivery_id)
    .notNull(),
  product_id: integer("product_id")
    .references(() => productsTable.product_id)
    .notNull(),
  address: text("address").notNull(),
  ...timestamps,
  status: text("user_type", {
    enum: ["queued", "dispatched", "delivered", "cancelled"],
  })
    .default("queued")
    .notNull(),
  total_price: real("total_price").notNull(),
});

export const ordersRelations = relations(ordersTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [ordersTable.user_id],
    references: [usersTable.user_id],
  }),
  delivery: one(deliveriesTable, {
    fields: [ordersTable.delivery_id],
    references: [deliveriesTable.delivery_id],
  }),
  products: many(productsTable),
}));

export type InsertOrders = typeof ordersTable.$inferInsert;
export type UpdateOrders = typeof ordersTable.$inferInsert;
export type SelectOrders = typeof ordersTable.$inferSelect;