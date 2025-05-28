import { NextResponse } from "next/server";
import loginUser from "@/libs/database/queries/users/loginUsers";

export async function POST(request: Request) {
  const { emailInput, passwordInput } = await request.json();

  const result = await loginUser(emailInput, passwordInput);

  return NextResponse.json(result, { status: result.status });
}