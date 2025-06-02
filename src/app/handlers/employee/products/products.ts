"use client";
import toaster from "@/components/ui/toaster";
import { toast } from "react-toastify";

export async function readProduct(
  start: number,
  end: number,
  search: string,
  filterProductType: string
) {
  try {
    const response = await fetch("/api/employee/products/display", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ start, end, search, filterProductType }),
    });

    if (!response.ok) {
      toaster(500, `${response.statusText}`);
      return;
    }

    const result = await response.json();

    return [result.message, result.count, result.productTypes];
  } catch (err) {
    toaster(500, `${err}`);
    return;
  }
}

export async function createProductForm(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const productType = formData.get("productType")?.toString() || "";
  const productName = formData.get("productName")?.toString() || "";
  const quantity = formData.get("quantity")?.toString() || "";
  const price = formData.get("price")?.toString() || "";

  try {
    const response = await fetch("/api/employee/products/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productType, productName, quantity, price }),
    });

    const data = await response.json();

    if (!response.ok) {
      toaster(500, data.message);
      return;
    }

    toaster(200, data.message);
    e.currentTarget.reset();
  } catch (err) {
    toaster(500, `Error creating product: ${err}`);
  }
}

export async function deleteProduct(productID: number, productName: string) {
  if (confirm(`Are you sure you want to delete ${productName}`)) {
    try {
      const response = await fetch("api/employee/products/delete", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ productID, productName }),
      });

      const data = await response.json();

      if (!response.ok) {
        toaster(500, data.message);
        return;
      }

      toaster(200, data.message);
    } catch (err) {
      toaster(500, `Error creating product: ${err}`);
    }
  }
}
