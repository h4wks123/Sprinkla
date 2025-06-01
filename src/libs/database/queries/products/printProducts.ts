"use server";

import { db } from "../..";
import { productsTable } from "../../schema/products";
import { and, count, like, eq } from "drizzle-orm";

export default async function printProducts(
  start: number,
  end: number,
  search: string,
  filterProductType: string
) {
  try {
    const limit = end - start + 1;
    const offset = start - 1;

    const baseConditions = [like(productsTable.product, `%${search}%`)];

    if (filterProductType !== "") {
      baseConditions.push(eq(productsTable.product_type, filterProductType));
    }

    const [products, countResult, productType] = await Promise.all([
      db
        .select()
        .from(productsTable)
        .where(and(...baseConditions))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: count() })
        .from(productsTable)
        .where(and(...baseConditions)),
      db
        .selectDistinct({ product_type: productsTable.product_type })
        .from(productsTable),
    ]);

    return {
      status: 200,
      message: products,
      count: countResult[0].count,
      productTypes: productType,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal server error in getting products.",
      count: 1,
      productTypes: [],
    };
  }
}
