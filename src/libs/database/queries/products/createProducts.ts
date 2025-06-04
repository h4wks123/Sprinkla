"use server";

import { db } from "../..";
import { productsTable } from "../../schema/products";
import { eq } from "drizzle-orm";

export default async function createProducts({
  productType,
  productName,
  quantity,
  price,
}: {
  productType: string;
  productName: string;
  quantity: number;
  price: number;
}) {
  try {
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
      .where(eq(productsTable.product, productName));

    if (existingProduct.length > 0) {
      return {
        status: 409,
        message: "Product name already exists.",
      };
    }

    await db.insert(productsTable).values({
      product_type: productType,
      product: productName,
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
      message: "Failed to create product.",
    };
  }
}
