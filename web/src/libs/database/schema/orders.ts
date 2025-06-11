import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users";
import { timestamps } from "./helpers";

export const ordersTable = sqliteTable("orders", {
  order_id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id").references(() => usersTable.user_id).notNull(),
  address: text("address"),
  status: text("status", {
    enum: ["queued", "dispatched", "delivered", "cancelled"],
  }).default("queued").notNull(),
  total_price: real("total_price").notNull(),
  ...timestamps,
});


export type InsertOrders = typeof ordersTable.$inferInsert;
export type SelectOrders = typeof ordersTable.$inferSelect;