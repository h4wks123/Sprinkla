"use server";

import { db } from "../..";
import { productsTable } from "../../schema/products";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function createProducts(formData: FormData) {
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
      !productType.trim() ||
      !productName.trim() ||
      quantity === undefined ||
      price === undefined
    ) {
      return {
        status: 400,
        message: "All fields are required.",
      };
    }

    if (quantity <= 0 || price <= 0) {
      return {
        status: 400,
        message: "Quantity and price must not be negative or zero.",
      };
    }

    const existingProduct = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.product_name, productName));

    if (existingProduct.length > 0) {
      return {
        status: 409,
        message: "Product name already exists.",
      };
    }

    await db.insert(productsTable).values({
      product_type: productType,
      product_name: productName,
      quantity,
      price,
    });

    return {
      status: 200,
      message: "Product created successfully.",
    };
  } catch (error) {
    return {
      status: 500,
      message: `Failed to create product: ${error}`,
    };
  }
}
