"use client";

import { useState } from "react";
import { Button } from "./buttons";
import Image from "next/image";

export default function NumberPicker({
  maxQuantity,
  price,
}: {
  maxQuantity: number;
  price: number;
}) {
  const [number, setNumber] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h6 className="text-black">Quantity</h6>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            onClick={() => {
              setNumber(number > 1 ? number - 1 : number);
            }}
            size="icon"
            className="rounded-lg"
            disabled={number <= 1}
          >
            <Image
              src="/previous.svg"
              alt="previous"
              width={25}
              height={25}
              className="mx-auto"
            />
          </Button>
          <input
            name="productQuantity"
            value={number}
            readOnly
            className="w-5 text-black flex items-center justify-center outline-0"
          />
          <Button
            type="button"
            onClick={() => {
              setNumber(number < maxQuantity ? number + 1 : number);
            }}
            size="icon"
            className="rounded-lg"
            disabled={number >= maxQuantity}
          >
            <Image
              src="/next.svg"
              alt="next"
              width={25}
              height={25}
              className="mx-auto"
            />
          </Button>
        </div>
      </div>
      <div>
        <h6 className="text-black">Price</h6>
        <input
          name="productPrice"
          value={price * number}
          readOnly
          className="h-10 text-black border-black border-2 rounded-md px-4"
        />
      </div>
    </div>
  );
}
