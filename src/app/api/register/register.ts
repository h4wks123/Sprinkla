import React, { FormEvent } from "react";

import { emailRegexCheck, contactNumberRegexCheck } from "@/libs/auth/regex";
import registerUser from "@/libs/database/queries/users/createUsers";

export function registerForm(
  setHeaders: (value: {
    status: number[];
    message: string[];
    type: string[];
  }) => void
) {
  async function submitRegisterForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const emailInput = formData.get("email") as string;
    const passwordInput = formData.get("password") as string;
    const contactNumberInput = Number(formData.get("contactNumber"));

    if (!emailInput || !passwordInput || !contactNumberInput) {
      setHeaders({
        status: [204],
        message: ["Inputs cannot be empty!"],
        type: ["None"],
      });

      return;
    }

    const [registerStatus, emailFormatValidation, contactNumberValidation] =
      await Promise.all([
        registerUser(emailInput, passwordInput, contactNumberInput),
        emailRegexCheck(emailInput),
        contactNumberRegexCheck(contactNumberInput),
      ]);

    const statusArray: number[] = [];
    const messageArray: string[] = [];
    const typeArray: string[] = [];

    if (emailFormatValidation?.status === 400) {
      statusArray.push(emailFormatValidation.status);
      messageArray.push(emailFormatValidation.message);
      typeArray.push(emailFormatValidation.type);
    }

    if (contactNumberValidation?.status === 400) {
      statusArray.push(contactNumberValidation.status);
      messageArray.push(contactNumberValidation.message);
      typeArray.push(contactNumberValidation.type);
    }

    if (statusArray.length > 0) {
      setHeaders({
        status: statusArray,
        message: messageArray,
        type: typeArray,
      });

      return;
    }

    e.currentTarget.reset();

    setHeaders({
      status: [registerStatus.status],
      message: [registerStatus.message],
      type: [registerStatus.type],
    });

    return;
  }

  return submitRegisterForm;
}
