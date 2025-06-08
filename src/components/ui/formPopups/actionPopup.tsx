"use client";

// The issue for updating products here is handler, I should make separate
// popups for handlers, actions, and session logout
// session logout works if I close the modal first before redirecting

import React, { useState, ReactNode, FormEvent } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Popup from "reactjs-popup";
import { Button } from "../buttons";
import type { Variant, Size } from "../../../../types/types";
import toaster from "../toaster";
import Image from "next/image";

interface ActionPopupsProps {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: (formData: FormData) => Promise<any>;
  message?: string;
  variant?: Variant;
  size?: Size;
}

const ActionFormPopups: React.FC<ActionPopupsProps> = ({
  children,
  action,
  message,
  variant,
  size,
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
    <div>
      {message === "Users" ? (
        <Image
          src="/user-circle_icon.svg"
          alt="users_circle"
          width={30}
          height={30}
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        />
      ) : (
        <Button
          type="button"
          variant={variant}
          size={size}
          className="text-white"
          onClick={() => setOpen(true)}
        >
          {message}
        </Button>
      )}

      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        modal
        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <form
          onSubmit={handleSubmit}
          className="relative bg-white p-6 rounded-xl shadow-md max-w-md mx-auto flex flex-col gap-4"
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
