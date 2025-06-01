"use client";
import toaster from "@/components/ui/toaster";

export async function readProducts(
  start: number,
  end: number,
  search: string,
  filterProductType: string
) {
  try {
    const response = await fetch("/api/employee/products", {
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
