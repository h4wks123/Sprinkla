"use server";

import { db } from "../..";
import { productsTable } from "../../schema/products";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function deleteProducts(formData: FormData) {
  const productID = Number(formData.get("productId"));
  const productName = formData.get("productName") as string;

  try {
    const session = await getServerSession();

    if (!session || !session.user?.email || session.user.role === "customer") {
      return {
        status: 400,
        message: "User must be authenticated or logged in.",
      };
    }

    if (!productID) {
      return {
        status: 400,
        message: "Product ID is required for deletion.",
      };
    }

    const existingProduct = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.product_id, productID));

    if (existingProduct.length === 0) {
      return {
        status: 404,
        message: `Product ${productName} cannot be found.`,
      };
    }

    await db
      .delete(productsTable)
      .where(eq(productsTable.product_id, productID));

    return {
      status: 200,
      message: `Product ${productName} has been successfully deleted.`,
    };
  } catch (error) {
    return {
      status: 500,
      message: `An error occurred while deleting ${productName}: ${error}`,
    };
  }
}
