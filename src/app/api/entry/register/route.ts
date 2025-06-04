import { NextResponse } from "next/server";
import registerUser from "@/libs/database/queries/users/createUsers";

export async function PUT(request: Request) {
  const { emailInput, passwordInput, contactNumberInput } =
    await request.json();

  const result = await registerUser(
    emailInput,
    passwordInput,
    contactNumberInput
  );

  return NextResponse.json(result, { status: result.status });
}
