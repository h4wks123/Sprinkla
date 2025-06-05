"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SelectProductTypes({
  productTypes,
}: {
  productTypes: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("productType");

  function handleClick(type: string) {
    const newParams = new URLSearchParams(searchParams);
    if (type === currentType) {
      newParams.delete("productType");
    } else {
      newParams.set("productType", type);
    }
    router.push(`?${newParams.toString()}#products_section`);
  }

  return (
    <ul className="w-[90%] h-[5rem] mx-auto flex justify-start items-center gap-8 text-black font-bold">
      {productTypes.map((type) => (
        <li
          key={type}
          onClick={() => handleClick(type)}
          className={`cursor-pointer ${
            currentType === type ? "underline text-primary" : ""
          }`}
        >
          {type}
        </li>
      ))}
    </ul>
  );
}
