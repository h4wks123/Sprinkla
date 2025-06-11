"use client";

import React, { useState, ReactNode, FormEvent } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Popup from "reactjs-popup";
import { Button } from "../buttons";
import type { Variant, Size } from "../../../../types/types";
import toaster from "../toaster";

interface ActionPopupsProps {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: (formData: FormData) => Promise<any>;
  message?: string;
  variant?: Variant;
  size?: Size;
  overflow?: boolean;
}

const ActionFormPopups: React.FC<ActionPopupsProps> = ({
  children,
  action,
  message,
  variant,
  size,
  overflow,
}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!action) return;

    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(searchParams);
    const result = await action(formData);

    toaster(result?.status, result?.message);

    if (result?.status === 200) {
      setOpen(false);
      params.set("page", "1");
      params.delete("query");
      params.delete("productType");
      replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <div className="overflow-x-auto">
      <Button
        type="button"
        variant={variant}
        size={size}
        interaction={"ghost"}
        className="text-white"
        onClick={() => setOpen(true)}
      >
        {message}
      </Button>

      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        modal
        overlayStyle={{
          background: "rgba(0, 0, 0, 0.5)",
          overflow: overflow ? "auto" : "",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className={`relative bg-white p-6 rounded-xl shadow-md mx-auto flex flex-col gap-4 max-w-md ${
            overflow ? "max-w-[650px]" : ""
          }`}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute h-5 w-5 bg-delete text-white right-0 top-0 text-xl cursor-pointer rounded-bl-xl rounded-tr-xl flex justify-center items-center"
          >
            &times;
          </button>
          {children}
        </form>
      </Popup>
    </div>
  );
};

export default ActionFormPopups;
