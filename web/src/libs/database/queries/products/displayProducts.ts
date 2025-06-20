"use server";

import { db } from "../..";
import { productsTable } from "../../schema/products";
import { count, like, eq, and } from "drizzle-orm";
import { getServerSession } from "next-auth";

const PAGE_SIZE = 10;

export async function printProducts(
  query: string,
  currentPage: number,
  productType: string
) {
  try {
    const offset = (currentPage - 1) * PAGE_SIZE;
    const whereConditions = [];
    const session = await getServerSession();

    if (!session || !session.user?.email || session.user.role === "customer") {
      return {
        status: 400,
        products: [],
        productTypes: [],
        message: "User must be authenticated or logged in.",
      };
    }

    if (query) {
      whereConditions.push(like(productsTable.product_name, `%${query}%`));
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
      message: "Succesfully displayed product.",
    };
  } catch (error) {
    return {
      status: 500,
      products: [],
      productTypes: [],
      message: `Failed to display product: ${error}`,
    };
  }
}

export async function printProductsByProductType(productType?: string) {
  try {
    const productTypesResult = await db
      .selectDistinct({ product_type: productsTable.product_type })
      .from(productsTable);

    const productTypes = productTypesResult.map((pt) => pt.product_type);

    const finalProductType = productType || productTypes[0];

    const products = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.product_type, finalProductType));

    return {
      status: 200,
      products,
      productTypes,
      finalProductType,
      message: "Successfully displayed product.",
    };
  } catch (error) {
    return {
      status: 500,
      products: [],
      productTypes: [],
      finalProductType: "",
      message: `Failed to display product: ${error}`,
    };
  }
}

export async function fetchProductPages(query: string, productType: string) {
  try {
    const whereConditions = [];
    const session = await getServerSession();

    if (!session || !session.user?.email || session.user.role === "customer") {
      return {
        status: 400,
        totalPages: 0,
        message: "User must be authenticated or logged in.",
      };
    }

    if (query) {
      whereConditions.push(like(productsTable.product_name, `%${query}%`));
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
      message: "Successfully fetched product pages.",
    };
  } catch (error) {
    return {
      status: 500,
      totalPages: 0,
      message: `Error fetching product pages: ${error}`,
    };
  }
}
