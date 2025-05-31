"use client";

import React from "react";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/buttons";
import Image from "next/image";
import toaster from "../ui/toaster";

export function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="w-[min(90%,1280px)] max-w-[1280px] h-[4rem] mx-auto flex justify-end items-center">
      {!session ? (
        <Button
          onClick={() => {
            router.push("/login");
          }}
          size="small"
        >
          SIGN IN
        </Button>
      ) : session!.user!.role === "customer" ? (
        <div className="flex justify-center items-center gap-6">
          <Button
            onClick={async () => {
              toaster(300, `${session.user.email} has successfully logged out`);
              await signOut({ redirect: false });
            }}
            size="small"
          >
            SIGN OUT
          </Button>
          <Image
            src="/cart_icon.svg"
            alt="cart_icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
          <Image
            src="/side_bar_icon.svg"
            alt="side_bar_icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-6">
          <Button
            onClick={async () => {
              toaster(300, `${session.user.email} has successfully logged out`);
              await signOut({ redirect: false });
            }}
            size="small"
          >
            SIGN OUT
          </Button>
          <Image
            src="/side_bar_icon.svg"
            alt="side_bar_icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </div>
      )}
    </header>
  );
}
