"use client";

import React from "react";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../buttons";
import Image from "next/image";
import toaster from "../toaster";
import UserFormPopups from "../formPopups/userPopup";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
          <Image
            onClick={() => {
              router.push("/");
            }}
            src="/home_icon.svg"
            alt="home_icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
          <Image
            onClick={() => {
              router.push("/cart");
            }}
            src="/cart_icon.svg"
            alt="cart_icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
          <Image
            onClick={() => {
              router.push("/recent");
            }}
            src="/purchases_icon.svg"
            alt="purchases_icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />

          <UserFormPopups
            onSignOut={async () => {
              await signOut({ redirect: true, callbackUrl: "/login" });
              toaster(300, `${session.user.email} has successfully logged out`);
            }}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-6">
          <Image
            onClick={() => {
              router.push("/users");
            }}
            src="/users_icon.svg"
            alt="users_icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
          <Image
            onClick={() => {
              router.push("/products");
            }}
            src="/products.svg"
            alt="products"
            width={30}
            height={30}
            className="cursor-pointer"
          />
          <Image
            onClick={() => {
              router.push("/orders");
            }}
            src="/orders_icon.svg"
            alt="orders_icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
          <UserFormPopups
            onSignOut={async () => {
              await signOut({ redirect: true, callbackUrl: "/login" });
              toaster(300, `${session.user.email} has successfully logged out`);
            }}
          />
        </div>
      )}
    </header>
  );
}

export function PurchasesHeader() {
  const pathname = usePathname();

  return (
    <nav className="h-13 w-full flex bg-gray-200 border-y-2 border-secondary-dark">
      <Link
        href="/recent"
        className={`w-1/2 h-full flex ${
          pathname === "/recent"
            ? "bg-tertiary-dark text-white"
            : "bg-gray-200 text-black hover:bg-tertiary"
        }`}
      >
        <div className="w-[calc(100%-640px)] " />
        <div className="w-[640px] flex justify-center items-center">
          <h3 className="w-1/2 font-bold text-2xl flex justify-center items-center">
            RECENT
          </h3>
        </div>
      </Link>
      <Link
        href="/history"
        className={`w-1/2 h-full flex ${
          pathname === "/history"
            ? "bg-tertiary-dark text-white"
            : "bg-gray-200 text-black hover:bg-tertiary"
        }`}
      >
        <div className="w-[640px] flex justify-center items-center">
          <h3 className="w-1/2 font-bold text-2xl flex justify-center items-center">
            HISTORY
          </h3>
        </div>
        <div className="w-[calc(100%-640px)] " />
      </Link>
    </nav>
  );
}
