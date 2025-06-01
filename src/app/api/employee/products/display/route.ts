import printProducts from "@/libs/database/queries/products/displayProducts";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { start, end, search, filterProductType } = await request.json();

  const result = await printProducts(start, end, search, filterProductType);
  return NextResponse.json(result, { status: result.status });
}
