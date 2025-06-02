import deleteProducts from "@/libs/database/queries/products/deleteProducts";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { productID, productName } = await request.json();

  const result = await deleteProducts(productID, productName);

  return NextResponse.json(result, { status: result.status });
}
