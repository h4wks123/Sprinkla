import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { emailRegexCheck } from "@/libs/auth/regex";
import loginUser from "@/libs/database/queries/users/loginUsers";

export function LoginForm(
  setHeaders: (value: { status: number; message: string; }) => void
) {
  const router = useRouter();

  async function submitLoginForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const emailInput = formData.get("email") as string;
    const passwordInput = formData.get("password") as string;

    if (!emailInput || !passwordInput) {
      setHeaders({
        status: 204,
        message: "Inputs cannot be empty!",
      });

      return;
    }

    const [loginStatus, emailFormatValidation] = await Promise.all([
      loginUser(emailInput, passwordInput),
      emailRegexCheck(emailInput),
    ]);

    if (emailFormatValidation?.status === 400) {
      setHeaders({
        status: emailFormatValidation.status,
        message: emailFormatValidation.message,
      });

      return;
    }

    e.currentTarget.reset();

    if (loginStatus.status === 200) {
      router.push("/");
    }

    setHeaders({
      status: loginStatus.status,
      message: loginStatus.message,
    });

    return;
  }

  return submitLoginForm;
}
