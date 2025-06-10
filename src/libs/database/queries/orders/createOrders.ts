"use server";

import { db } from "../..";
import { getServerSession } from "next-auth";
import { usersTable } from "../../schema/users";
import { ordersTable } from "../../schema/orders";
import { orderItemsTable } from "../../schema/orderItems";
import { cartsTable } from "../../schema/carts";
import { productsTable } from "../../schema/products";
import { eq, inArray } from "drizzle-orm";

export async function createOrders(formData: FormData) {
  const rawIDs = formData.getAll("cartIDs");
  const cartIDs = rawIDs.map((id) => Number(id)).filter(Boolean);
  const address = formData.get("address");

  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return { status: 400, message: "User not authenticated." };
    }

    if (!address) {
      return {
        status: 400,
        message: "Please input your delivery address before checking out.",
      };
    }
    const userResult = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email));

    const user = userResult[0];
    if (!user) {
      return { status: 404, message: "User not found." };
    }

    const [existingOrders, cartItems] = await Promise.all([
      db
        .select()
        .from(ordersTable)
        .where(eq(ordersTable.user_id, user.user_id)),
      db.select().from(cartsTable).where(inArray(cartsTable.cart_id, cartIDs)),
    ]);

    const existingOrder = existingOrders.find(
      (order) => order.status === "queued" || order.status === "dispatched"
    );
    if (existingOrder) {
      return {
        status: 409,
        message:
          "You already have a pending order. Please wait until it's processed.",
      };
    }

    if (cartItems.length === 0) {
      return { status: 404, message: "No valid cart items found." };
    }

    const productIDs = cartItems.map((item) => item.product_id);
    const products = await db
      .select()
      .from(productsTable)
      .where(inArray(productsTable.product_id, productIDs));

    const cartMap = new Map(cartItems.map((item) => [item.product_id, item]));

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.total_price,
      0
    );

    console.log(totalAmount, cartItems);

    const [order] = await db
      .insert(ordersTable)
      .values({
        user_id: user.user_id,
        address: `${address}`,
        total_price: totalAmount,
        status: "queued",
      })
      .returning();

    const orderItems = products.map((product) => {
      const cart = cartMap.get(product.product_id);
      return {
        order_id: order.order_id,
        product_name: product.product_name,
        product_type: product.product_type,
        price: product.price * (cart?.quantity ?? 1),
        quantity: cart?.quantity ?? 1,
      };
    });

    await Promise.all([
      db.insert(orderItemsTable).values(orderItems),
      db.delete(cartsTable).where(inArray(cartsTable.cart_id, cartIDs)),
    ]);

    return {
      status: 200,
      message: "Order successfully created and cart items cleared.",
    };
  } catch (error) {
    return {
      status: 500,
      message: `Error creating order: ${error}`,
    };
  }
}
