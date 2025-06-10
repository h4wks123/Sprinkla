"use server";

import { getServerSession } from "next-auth";
import { db } from "../..";
import { usersTable } from "../../schema/users";
import { cartsTable } from "../../schema/carts";
import { productsTable } from "../../schema/products";
import { eq } from "drizzle-orm";

export default async function getCartProducts() {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return {
        status: 400,
        message: "User must be authenticated or logged in.",
        cartItems: [],
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
        cartItems: [],
      };
    }

    const cartItems = await db
      .select({
        cart_id: cartsTable.cart_id,
        cart_quantity: cartsTable.quantity,
        product_id: productsTable.product_id,
        product_name: productsTable.product_name,
        product_type: productsTable.product_type,
        product_quantity: productsTable.quantity,
        product_price: productsTable.price,
      })
      .from(cartsTable)
      .where(eq(cartsTable.user_id, user[0].user_id))
      .innerJoin(
        productsTable,
        eq(cartsTable.product_id, productsTable.product_id)
      );

    return {
      status: 200,
      message: "Successfully fetched cart items.",
      cartItems,
    };
  } catch (error) {
    return {
      status: 500,
      message: `Failed to fetch cart items`,
      cartItems: [],
    };
  }
}
