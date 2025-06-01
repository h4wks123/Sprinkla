import { NextResponse } from "next/server";
import createProducts from "@/libs/database/queries/products/createProducts";

export async function POST(req: Request) {
  const data = await req.json();
  const result = await createProducts(data);

  return NextResponse.json(result, { status: result.status });
}