"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SelectTypes({
  options,
  message,
  passedParams,
}: {
  options: string[];
  message: string;
  passedParams: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [type, setType] = useState("");

  useEffect(() => {
    const currentType = searchParams.get(`${passedParams}`) || "";
    setType(currentType);
  }, [searchParams]);

  function handleType(value: string) {
    setType(value);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (value) {
      params.set(`${passedParams}`, value);
    } else {
      params.delete(`${passedParams}`);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      className="peer block rounded-md p-2 border-2 border-black"
      value={type}
      onChange={(e) => handleType(e.target.value)}
    >
      <option value="">{message}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
