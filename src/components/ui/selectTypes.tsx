"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SelectTypes({ options }: { options: string[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [productType, setProductType] = useState("");

  useEffect(() => {
    const currentType = searchParams.get("productType") || "";
    setProductType(currentType);
  }, [searchParams]);

  function handleType(value: string) {
    setProductType(value);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (value) {
      params.set("productType", value);
    } else {
      params.delete("productType");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      className="peer block rounded-md p-2 border-2 border-black"
      value={productType}
      onChange={(e) => handleType(e.target.value)}
    >
      <option value="">All</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
