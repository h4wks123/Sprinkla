"use server";

import { db } from "../..";
import { productsTable } from "../../schema/products";
import { count, like, eq, and } from "drizzle-orm";

const PAGE_SIZE = 10;

export async function printProducts(
  query: string,
  currentPage: number,
  productType: string
) {
  try {
    const offset = (currentPage - 1) * PAGE_SIZE;
    const whereConditions = [];

    if (query) {
      whereConditions.push(like(productsTable.product, `%${query}%`));
    }

    if (productType) {
      whereConditions.push(eq(productsTable.product_type, productType));
    }

    const [products, productTypes] = await Promise.all([
      db
        .select()
        .from(productsTable)
        .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
        .limit(PAGE_SIZE)
        .offset(offset),
      db
        .selectDistinct({ product_type: productsTable.product_type })
        .from(productsTable),
    ]);

    return {
      status: 200,
      products: products,
      productTypes: productTypes.map((pt) => pt.product_type),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      products: ["Failed to fetch products."],
      productTypes: ["Failed to fetch product types"],
    };
  }
}

export async function fetchProductPages(query: string, productType: string) {
  try {
    const whereConditions = [];

    if (query) {
      whereConditions.push(like(productsTable.product, `%${query}%`));
    }

    if (productType) {
      whereConditions.push(eq(productsTable.product_type, productType));
    }

    const result = await db
      .select({ total: count(productsTable.product_id) })
      .from(productsTable)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    const totalItems = result[0]?.total ?? 0;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);

    return {
      status: 200,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching product pages:", error);
    return {
      status: 500,
      totalPages: 0,
    };
  }
}
