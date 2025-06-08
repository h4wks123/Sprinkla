"use client";

import React, { useState } from "react";
import Image from "next/image";
import Popup from "reactjs-popup";
import { useSession } from "next-auth/react";
import { Button } from "../buttons";

interface UserFormPopupsProps {
  onSignOut: () => void;
}

const UserFormPopups: React.FC<UserFormPopupsProps> = ({ onSignOut }) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const closeModal = () => setOpen(false);

  return (
    <div>
      <Image
        src="/user-circle_icon.svg"
        alt="users_circle"
        width={30}
        height={30}
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      />
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        modal
        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <form className="relative bg-white p-6 rounded-xl shadow-md max-w-md mx-auto flex flex-col gap-4">
          <button
            type="button"
            onClick={closeModal}
            className="absolute h-5 w-5 bg-delete text-white right-0 top-0 text-xl cursor-pointer rounded-bl-xl rounded-tr-xl flex justify-center items-center"
          >
            &times;
          </button>

          <Image
            src="/profile.png"
            alt="profile"
            width={200}
            height={200}
            className="aspect-square rounded-full mx-auto border-2 border-black"
          />
          <div>
            <h6 className="text-black">Role</h6>
            <input
              placeholder={session!.user.role}
              readOnly
              className="h-10 placeholder-black border-black border-2 rounded-md px-4"
            />
          </div>
          <div>
            <h1 className="text-black">Email:</h1>
            <input
              placeholder={session!.user.email}
              readOnly
              className="h-10 placeholder-black border-black border-2 rounded-md px-4"
            />
          </div>
          <div>
            <h1 className="text-black">Contact Number:</h1>
            <input
              type="tel"
              value={session!.user.contactNumber}
              readOnly
              className="h-10 text-black border-black border-2 rounded-md px-4"
            />
          </div>
          <Button
            type="button"
            onClick={() => {
              closeModal();
              onSignOut();
            }}
            className="mx-auto"
          >
            SIGN OUT
          </Button>
        </form>
      </Popup>
    </div>
  );
};

export default UserFormPopups;
