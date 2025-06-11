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

    if (!session || !session.user.email || session.user.role === "customer") {
      return {
        status: 400,
        message: "User must be authenticated or logged in.",
        currentOrder: null,
        currentOrderItems: null,
      };
    }

    // Get user
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

    // Get the most recent order only
    const recentOrder = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.user_id, user[0].user_id))
      .orderBy(desc(ordersTable.timestamp))
      .limit(1);

    if (recentOrder.length === 0) {
      return {
        status: 200,
        message: "No orders found.",
        currentOrder: null,
        currentOrderItems: null,
      };
    }

    // Get all items for the most recent order
    const recentOrderId = recentOrder[0].order_id;
    const orderItems = await db
      .select()
      .from(orderItemsTable)
      .where(eq(orderItemsTable.order_id, recentOrderId));

    return {
      status: 200,
      message: "Successfully fetched most recent ordered items.",
      currentOrder: recentOrder[0],
      currentOrderItems: orderItems,
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
