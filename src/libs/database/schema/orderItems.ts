import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { ordersTable } from "./orders";
import { relations } from "drizzle-orm";

export const orderItemsTable = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  order_id: integer("order_id")
    .references(() => ordersTable.order_id)
    .notNull(),
  product_type: text("product_type").notNull(),
  product_name: text("product_name").notNull(),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull(),
});

export const orderItemsRelations = relations(orderItemsTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [orderItemsTable.order_id],
    references: [ordersTable.order_id],
  }),
}));

export type InsertOrderItems = typeof orderItemsTable.$inferInsert;
export type SelectOrderItems = typeof orderItemsTable.$inferSelect;
