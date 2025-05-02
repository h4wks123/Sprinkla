import React, { Dispatch, FormEvent, SetStateAction } from "react";

import registerUser from "@/libs/database/queries/users/createUsers";
import toaster from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

export function registerForm(
  setEmailInputMessage: Dispatch<SetStateAction<string | null>>,
  setPasswordInputMessage: Dispatch<SetStateAction<string | null>>,
  setContactNumberInputMessage: Dispatch<SetStateAction<string | null>>
) {
  const router = useRouter();

  async function submitRegisterForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const emailInput = formData.get("email") as string;
    const passwordInput = formData.get("password") as string;
    const contactNumberInput = Number(formData.get("contactNumber"));

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{6,}$/;
    const contactNumberRegex = /^\d{10}$/; // Correct: only 10 digits

    let hasError = false;

    // Check email
    if (!emailInput) {
      setEmailInputMessage("Email input cannot be empty!");
      hasError = true;
    } else if (!emailRegex.test(emailInput)) {
      setEmailInputMessage("Invalid email format!");
      hasError = true;
    } else {
      setEmailInputMessage(null);
    }

    // Check password
    if (!passwordInput) {
      setPasswordInputMessage("Password input cannot be empty!");
      hasError = true;
    } else if (!passwordRegex.test(passwordInput)) {
      setPasswordInputMessage(
        "Invalid password, must contain at least 1 number, and no less than 6 letters!"
      );
      hasError = true;
    } else {
      setPasswordInputMessage(null);
    }

    // Check contact number
    if (!contactNumberInput) {
      setContactNumberInputMessage("Contact number input cannot be empty!");
      hasError = true;
    } else if (!contactNumberRegex.test(contactNumberInput.toString())) {
      setContactNumberInputMessage(
        "Invalid contact number, must be exactly 10 digits!"
      );
      hasError = true;
    } else {
      setContactNumberInputMessage(null);
    }

    if (hasError) {
      return;
    }

    e.currentTarget.reset();

    const registerStatus = await registerUser(
      emailInput,
      passwordInput,
      contactNumberInput
    );

    setEmailInputMessage(null),
      setPasswordInputMessage(null),
      setContactNumberInputMessage(null);

    toaster(registerStatus.status, registerStatus.message);

    if (registerStatus.status === 200) {
      router.push("/login");
    }

    return;
  }

  return submitRegisterForm;
}
