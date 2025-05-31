import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users";
import { timestamps } from "./helpers";
import { relations } from "drizzle-orm";

export const deliveriesTable = sqliteTable("deliveries", {
  delivery_id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .references(() => usersTable.user_id)
    .notNull(),
  ...timestamps,
});

export const deliveriesRelations = relations(deliveriesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [deliveriesTable.user_id],
    references: [usersTable.user_id],
  }),
}));

export type InsertDeliveries = typeof deliveriesTable.$inferInsert;
export type UpdateDeliveries = typeof deliveriesTable.$inferSelect;
export type SelectDeliveries = typeof deliveriesTable.$inferSelect;
