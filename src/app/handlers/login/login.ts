"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import toaster from "@/components/ui/toaster";

export async function LoginForm(
  e: FormEvent<HTMLFormElement>,
  setEmailInputMessage: Dispatch<SetStateAction<string | null>>,
  setPasswordInputMessage: Dispatch<SetStateAction<string | null>>,
  router: ReturnType<typeof useRouter>
) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const emailInput = formData.get("email") as string;
  const passwordInput = formData.get("password") as string;

  let hasError = false;

  if (!emailInput) {
    setEmailInputMessage("Email input cannot be empty!");
    hasError = true;
  } else {
    setEmailInputMessage(null);
  }

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

  const result = await signIn("credentials", {
    email: emailInput,
    password: passwordInput,
    redirect: false,
  });

  setEmailInputMessage(null);
  setPasswordInputMessage(null);

  // toaster(data.status, data.message);
  if (result?.status === 200) {
    router.push("/");
  }

  // if (data.status === 200 && data.mode === "customer") {
  //   router.push("/");
  // }

  // if (data.status === 200 && data.mode === "admin") {
  //   router.push("/admin/users");
  // }

  return;
}
