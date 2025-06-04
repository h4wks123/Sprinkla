"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";

import toaster from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

export async function RegisterForm(
  e: FormEvent<HTMLFormElement>,
  setEmailInputMessage: Dispatch<SetStateAction<string | null>>,
  setPasswordInputMessage: Dispatch<SetStateAction<string | null>>,
  setContactNumberInputMessage: Dispatch<SetStateAction<string | null>>,
  router: ReturnType<typeof useRouter>
) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const emailInput = formData.get("email") as string;
  const passwordInput = formData.get("password") as string;
  const contactNumberInput = Number(formData.get("contactNumber"));

  const responseValidation = await fetch("/api/dataValidation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailInput, passwordInput, contactNumberInput }),
  });

  const dataValidation = await responseValidation.json();

  if (!responseValidation.ok && dataValidation.errors) {
    setEmailInputMessage(dataValidation.errors.email || null);
    setPasswordInputMessage(dataValidation.errors.password || null);
    setContactNumberInputMessage(dataValidation.errors.contact || null);
    return;
  }

  const responseRegister = await fetch("api/register", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailInput, passwordInput, contactNumberInput }),
  });

  const dataRegister = await responseRegister.json();

  if (e.currentTarget instanceof HTMLFormElement) {
    e.currentTarget.reset();
  }

  setEmailInputMessage(null);
  setPasswordInputMessage(null);
  setContactNumberInputMessage(null);

  toaster(dataRegister.status, dataRegister.message);

  if (dataRegister.status === 200) {
    router.push("/login");
  }

  return;
}