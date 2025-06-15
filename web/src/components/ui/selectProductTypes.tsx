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
    replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  }

  return (
    <ul className="w-full bg-accent-light flex justify-start text-accent font-semibold overflow-auto rounded-t-lg rounded-b-none sm:rounded-t-none  sm:rounded-l-lg sm:flex-col sm:w-[15rem] sm:h-[47rem]">
      {productTypes.map((type, index) => {
        const isActive =
          currentType === type || (currentType === null && index === 0);

        return (
          <li
            key={type}
            onClick={() => handleClick(type)}
            className={`cursor-pointer px-8 py-6 hover:bg-accent-hover ${
              isActive
                ? "bg-accent-hover text-tertiary-dark font-bold"
                : "font-semibold"
            }`}
          >
            {type.toUpperCase()}
          </li>
        );
      })}
    </ul>
  );
}
