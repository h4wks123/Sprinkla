"use client";

import React, { useState, ReactNode, FormEvent } from "react";
import Popup from "reactjs-popup";
import { Button } from "../buttons";
import type { Variant, Size } from "../../../../types/types";

interface HandlerPopupsProps {
  children: ReactNode;
  handler?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  message?: string;
  interaction?: "default" | "ghost" | "store" | null;
  variant?: Variant;
  size?: Size;
  text?: "default" | "small" | null;
  cart?: true;
}

const HandlerFormPopups: React.FC<HandlerPopupsProps> = ({
  children,
  handler,
  message,
  interaction,
  variant,
  size,
  text,
  cart,
}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Button
        type="button"
        variant={variant}
        size={size}
        interaction={interaction}
        text={text}
        className="group text-background"
        onClick={() => setOpen(true)}
      >
        {message}{" "}
        {cart === true ? (
          <div className="w-5 h-5 bg-[url('/cart_icon_light.svg')] group-hover:bg-[url('/cart_icon_dark.svg')] bg-contain bg-no-repeat bg-center transition-all duration-300" />
        ) : null}
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
          className="relative bg-background p-6 rounded-xl shadow-md max-w-md mx-auto flex flex-col gap-4"
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
