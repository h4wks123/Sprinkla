"use server";

import { db } from "../..";
import { ordersTable } from "../../schema/orders";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";

export default async function updateOrders(formData: FormData) {
  const orderID = Number(formData.get("orderID"));
  const productStatus = formData.get("productStatus") as
    | "queued"
    | "dispatched"
    | "delivered"
    | "cancelled";

  try {
    const session = await getServerSession();
    if (!session || !session.user.email || session.user.role === "customer") {
      return {
        status: 400,
        message: "User must be authenticated or logged in.",
      };
    }

    if (!productStatus?.trim()) {
      return {
        status: 400,
        message: "Invalid data, please include product status.",
      };
    }

    const existingOrder = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.order_id, orderID));

    if (existingOrder.length <= 0) {
      return {
        status: 400,
        message: "Order does not exist.",
      };
    }

    await db
      .update(ordersTable)
      .set({
        status: productStatus,
      })
      .where(eq(ordersTable.order_id, orderID));

    return {
      status: 200,
      message: `Order ${orderID} is now ${productStatus}`,
    };
  } catch (error) {
    return {
      status: 500,
      message: `Failed to update product status: ${error}`,
    };
  }
}
