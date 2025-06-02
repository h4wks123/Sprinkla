"use client";

import React, { useState, ReactNode } from "react";
import Popup from "reactjs-popup";
import { Button } from "../ui/buttons";

interface FormPopupsProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  message: string;
}

const FormPopups: React.FC<FormPopupsProps> = ({
  children,
  onSubmit,
  message,
}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Button type="button" variant="success" onClick={() => setOpen(true)}>
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
          onSubmit={onSubmit}
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

export default FormPopups;
