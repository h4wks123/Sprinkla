import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { emailInput, passwordInput, contactNumberInput } =
    await request.json();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{6,}$/;
  const contactNumberRegex = /^\d{10}$/;

  const errors: Record<string, string> = {};

  if (!emailInput) {
    errors.email = "Email input cannot be empty!";
  } else if (!emailRegex.test(emailInput)) {
    errors.email = "Invalid email format!";
  }

  if (!passwordInput) {
    errors.password = "Password input cannot be empty!";
  } else if (!passwordRegex.test(passwordInput)) {
    errors.password =
      "Invalid password, must contain at least 1 number, and no less than 6 letters!";
  }

  if (!contactNumberInput) {
    errors.contact = "Contact number input cannot be empty!";
  } else if (!contactNumberRegex.test(contactNumberInput.toString())) {
    errors.contact = "Invalid contact number, must be exactly 10 digits!";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  return NextResponse.json({ message: "Registration successful!" });
}
