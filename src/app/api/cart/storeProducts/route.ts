import insertCart from "@/libs/database/queries/carts/insertCart";
import { NextResponse } from "next/server";
import { resourceLimits } from "worker_threads";

export async function POST(request: Request) {
  const { productID, productName, productQuantity, productPrice } =
    await request.json();

  const result = await insertCart(
    productID,
    productName,
    productQuantity,
    productPrice
  );

  return NextResponse.json(result, { status: result.status });
}
