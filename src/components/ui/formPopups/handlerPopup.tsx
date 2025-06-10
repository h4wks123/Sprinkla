"use client";

import React, { useState, ReactNode, FormEvent } from "react";
import Popup from "reactjs-popup";
import { Button } from "../buttons";
import type { Variant, Size } from "../../../../types/types";

interface HandlerPopupsProps {
  children: ReactNode;
  handler?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  message?: string;
  variant?: Variant;
  size?: Size;
}

const HandlerFormPopups: React.FC<HandlerPopupsProps> = ({
  children,
  handler,
  message,
  variant,
  size,
}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Button
        type="button"
        variant={variant}
        size={size}
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
        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <form
          onSubmit={handler}
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

export default HandlerFormPopups;
