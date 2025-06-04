import updateProducts from "@/libs/database/queries/products/updateProducts";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { productID, productType, productName, quantity, price } =
    await request.json();

  const result = await updateProducts(
    productID,
    productType,
    productName,
    quantity,
    price
  );

  return NextResponse.json(result, { status: result.status });
}
