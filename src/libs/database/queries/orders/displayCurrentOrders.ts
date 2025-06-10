"use server";

import { getServerSession } from "next-auth";
import { db } from "../..";
import { ordersTable } from "../../schema/orders";
import { usersTable } from "../../schema/users";
import { eq, and } from "drizzle-orm";
import { orderItemsTable } from "../../schema/orderItems";

export async function printCurrentOrders() {
  try {
    const session = await getServerSession();

    if (!session || !session.user.email) {
      return {
        status: 400,
        message: "User must be authenticated or logged in.",
        currentOrder: [],
        currentOrderItems: [],
      };
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email));

    if (!user) {
      return {
        status: 404,
        message: "User not found.",
        currentOrder: [],
        currentOrderItems: [],
      };
    }

    const currentOrderItems = await db
      .select({
        order: ordersTable,
        item: orderItemsTable,
      })
      .from(ordersTable)
      .where(
        and(
          eq(ordersTable.user_id, user[0].user_id),
          eq(ordersTable.status, "queued")
        )
      )
      .innerJoin(
        orderItemsTable,
        eq(orderItemsTable.order_id, ordersTable.order_id)
      );

    if (currentOrderItems.length === 0) {
      return {
        status: 200,
        message: "No current queued orders.",
        currentOrder: [],
        currentOrderItems: [],
      };
    }

    const order = currentOrderItems[0].order;
    const items = currentOrderItems.map((entry) => entry.item);

    return {
      status: 200,
      message: "Successfully fetched pending ordered items.",
      currentOrder: order,
      currentOrderItems: items,
    };
  } catch (error) {
    return {
      status: 500,
      message: `Failed to fetch current order: ${error}`,
      currentOrder: [],
      currentOrderItems: [],
    };
  }
}
