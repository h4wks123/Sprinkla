"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SelectProductTypes({
  productTypes,
}: {
  productTypes: string[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentType = searchParams.get("productType");

  function handleClick(type: string) {
    const newParams = new URLSearchParams(searchParams);
    if (type === currentType) {
      newParams.delete("productType");
    } else {
      newParams.set("productType", type);
    }
    replace(`${pathname}?${newParams.toString()}#products_section`);
  }

  return (
    <ul className="w-[90%] h-[5rem] mx-auto flex justify-start items-center text-black font-bold overflow-x-auto">
      {productTypes.map((type, index) => {
        const isActive =
          currentType === type || (currentType === null && index === 0);

        return (
          <li
            key={type}
            onClick={() => handleClick(type)}
            className={`h-full flex justify-center items-center cursor-pointer px-8 ${
              isActive ? "bg-tertiary text-tertiary-dark" : ""
            }`}
          >
            {type.toUpperCase()}
          </li>
        );
      })}
    </ul>
  );
}
