"use server";

import { db } from "../..";
import { productsTable } from "../../schema/products";
import { count, like } from "drizzle-orm";

const PAGE_SIZE = 10;

export async function printProducts(query: string, currentPage: number) {
  try {
    const offset = (currentPage - 1) * PAGE_SIZE;

    const products = await db
      .select()
      .from(productsTable)
      .where(like(productsTable.product, `%${query}%`))
      .limit(PAGE_SIZE)
      .offset(offset);

    return {
      status: 200,
      message: products,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: ["Failed to fetch products."],
    };
  }
}

export async function fetchProductPages(query: string) {
  try {
    const result = await db
      .select({ total: count(productsTable.product_id) })
      .from(productsTable)
      .where(like(productsTable.product, `%${query}%`));

    const totalItems = result[0]?.total ?? 0;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);

    return {
      status: 200,
      totalPages,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      totalPages: 0,
    };
  }
}
