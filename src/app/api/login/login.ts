"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import toaster from "@/components/ui/toaster";

import loginUser from "@/libs/database/queries/users/loginUsers";

export function LoginForm(
  setEmailInputMessage: Dispatch<SetStateAction<string | null>>,
  setPasswordInputMessage: Dispatch<SetStateAction<string | null>>
) {
  const router = useRouter();

  async function submitLoginForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const emailInput = formData.get("email") as string;
    const passwordInput = formData.get("password") as string;

    let hasError = false;

    //check email
    if (!emailInput) {
      setEmailInputMessage("Email input cannot be empty!");
      hasError = true;
    } else {
      setEmailInputMessage(null);
    }

    //check password
    if (!passwordInput) {
      setPasswordInputMessage("Password input cannot be empty!");
      hasError = true;
    } else {
      setPasswordInputMessage(null);
    }

    if (hasError) {
      return;
    }

    e.currentTarget.reset();

    const loginStatus = await loginUser(emailInput, passwordInput);

    
    setEmailInputMessage(null);
    setPasswordInputMessage(null);
    
    toaster(loginStatus.status, loginStatus.message);

    if (loginStatus.status === 200) {
      router.push("/");
    }

    return;
  }

  return submitLoginForm;
}
