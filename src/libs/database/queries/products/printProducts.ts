"use server";

import { eq } from "drizzle-orm";
import { db } from "../..";
import { productsTable } from "../../schema/products";

export default async function printProducts() {
  try {
    const products = await db.select({})
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal server error in getting products.",
    };
  }
}
