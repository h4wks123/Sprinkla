"use server";

import { db } from "../..";
import { productsTable } from "../../schema/products";
import { eq, and, ne } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function updateProducts(formData: FormData) {
  const productID = Number(formData.get("productId"));
  const productType = formData.get("productType") as string;
  const productName = formData.get("productName") as string;
  const quantity = Number(formData.get("quantity"));
  const price = Number(formData.get("price"));

  try {
    const session = await getServerSession();

    if (!session || !session.user?.email || session.user.role === "customer") {
      return {
        status: 400,
        message: "User must be authenticated or logged in.",
      };
    }
    
    if (
      !productType?.trim() ||
      !productName?.trim() ||
      quantity <= 0 ||
      price <= 0
    ) {
      return {
        status: 400,
        message:
          "Invalid data. Please provide valid name, type, and positive numbers.",
      };
    }

    const existingProduct = await db
      .select()
      .from(productsTable)
      .where(
        and(
          eq(productsTable.product_name, productName),
          ne(productsTable.product_id, productID)
        )
      );

    if (existingProduct.length > 0) {
      return {
        status: 400,
        message: `Product name "${productName}" already exists. Please choose a different name.`,
      };
    }

    await db
      .update(productsTable)
      .set({
        product_type: productType,
        product_name: productName,
        quantity,
        price,
      })
      .where(eq(productsTable.product_id, productID));

    return {
      status: 200,
      message: `Product ${productID} successfully updated.`,
    };
  } catch (error) {
    return {
      status: 500,
      message: `Failed to update product: ${error}`,
    };
  }
}
