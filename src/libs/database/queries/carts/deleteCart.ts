"use server";

import { getServerSession } from "next-auth";
import { db } from "../..";
import { cartsTable } from "../../schema/carts";
import { eq } from "drizzle-orm";

export async function deleteCart(formData: FormData) {
  const cartID = Number(formData.get("cartID"));
  const productName = formData.get("productName") as string;

  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return {
        status: 400,
        message: "User must be authenticated or logged in.",
      };
    }

    if (!cartID) {
      return {
        status: 400,
        message: "Cart ID is required for deletion.",
      };
    }

    await db.delete(cartsTable).where(eq(cartsTable.cart_id, cartID));

    return {
      status: 200,
      message: `Cart item ${productName} has been succesfully deleted.`,
    };
  } catch (error) {
    return {
      status: 500,
      message: `An error occured while deleting cart item: ${productName}: ${error}`,
    };
  }
}
