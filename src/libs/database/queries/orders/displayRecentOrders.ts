"use server";

import { getServerSession } from "next-auth";
import { db } from "../..";
import { ordersTable } from "../../schema/orders";
import { usersTable } from "../../schema/users";
import { eq, desc } from "drizzle-orm";
import { orderItemsTable } from "../../schema/orderItems";

export async function printRecentOrders() {
  try {
    const session = await getServerSession();

    if (!session || !session.user.email) {
      return {
        status: 400,
        message: "User must be authenticated or logged in.",
        currentOrder: null,
        currentOrderItems: null,
      };
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email));

    if (!user || user.length === 0) {
      return {
        status: 404,
        message: "User not found.",
        currentOrder: null,
        currentOrderItems: null,
      };
    }

    const recentOrderWithItems = await db
      .select({
        order: ordersTable,
        item: orderItemsTable,
      })
      .from(ordersTable)
      .where(eq(ordersTable.user_id, user[0].user_id))
      .orderBy(desc(ordersTable.timestamp))
      .innerJoin(
        orderItemsTable,
        eq(orderItemsTable.order_id, ordersTable.order_id)
      );

    if (recentOrderWithItems.length === 0) {
      return {
        status: 200,
        message: "No orders found.",
        currentOrder: null,
        currentOrderItems: null,
      };
    }

    const order = recentOrderWithItems[0].order;
    const items = recentOrderWithItems.map((entry) => entry.item);

    return {
      status: 200,
      message: "Successfully fetched most recent ordered items.",
      currentOrder: order,
      currentOrderItems: items,
    };
  } catch (error) {
    return {
      status: 500,
      message: `Failed to fetch current order: ${error}`,
      currentOrder: null,
      currentOrderItems: null,
    };
  }
}
