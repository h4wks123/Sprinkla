"use client";

import { FormEvent } from "react";
import toaster from "@/components/ui/toaster";

export async function SubmitProductsForm(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  try {
    const formData = new FormData(e.currentTarget);
    const productID = Number(formData.get("productID"));
    const productName = formData.get("productName") as string;
    const productQuantity = Number(formData.get("productQuantity"));
    const productPrice = Number(formData.get("productPrice"));


    const response = await fetch("api/cart/storeProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productID,
        productName,
        productQuantity,
        productPrice,
      }),
    });

    const data = await response.json();

    toaster(data.status, data.message);

    return;
  } catch (error) {
    toaster(500, `${error}`);
  }
}
