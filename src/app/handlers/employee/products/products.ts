"use client";
import toaster from "@/components/ui/toaster";

export async function readProducts() {
  try {
    const response = await fetch("api/employee/products");

    if (!response.ok) {
      toaster(500, `${response}`);
      return;
    }

    
  } catch (err) {
    toaster(500, `${err}`);
  }
}
