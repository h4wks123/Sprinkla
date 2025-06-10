"use server";

import { getServerSession } from "next-auth";
import { db } from "../..";
import { cartsTable } from "../../schema/carts";
import { productsTable } from "../../schema/products";
import { usersTable } from "../../schema/users";
import { eq, and } from "drizzle-orm";

export default async function insertCart(
  productID: number,
  productName: string,
  productQuantity: number,
  productPrice: number
) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return {
        status: 400,
        message: "User must be authenticated or logged in.",
      };
    }

    const [user, existingProduct] = await Promise.all([
      db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, session.user.email)),
      db
        .select()
        .from(productsTable)
        .where(eq(productsTable.product_id, productID)),
    ]);

    if (user.length === 0) {
      return { status: 404, message: "User not found." };
    }

    if (existingProduct.length === 0) {
      return {
        status: 400,
        message: `Cannot add to cart, ${productName} does not exist.`,
      };
    }

    const [existingCart] = await db
      .select()
      .from(cartsTable)
      .where(
        and(
          eq(cartsTable.user_id, user[0].user_id),
          eq(cartsTable.product_id, productID)
        )
      );

    if (existingCart) {
      return {
        status: 400,
        message: `${productName} already exists in cart.`,
      };
    }

    await db.insert(cartsTable).values({
      user_id: user[0].user_id,
      product_id: productID,
      quantity: productQuantity,
      total_price: productPrice,
    });

    return {
      status: 200,
      message: `${productName} added to cart.`,
    };
  } catch (error) {
    return {
      status: 500,
      message: `Failed to insert ${productName} into cart: ${error}`,
    };
  }
}
