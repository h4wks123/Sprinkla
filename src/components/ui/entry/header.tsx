"use client";

import React from "react";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../buttons";
import Image from "next/image";
import toaster from "../toaster";
import FormPopups from "../popups";

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
              router.push("/purchases");
            }}
            src="/purchases_icon.svg"
            alt="purchases_icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
          <FormPopups message={"Users"} variant={"update"} size={"small"}>
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
                placeholder={session.user.role}
                readOnly
                className="h-10 placeholder-black border-black border-2 rounded-md px-4"
              />
            </div>
            <div>
              <h1 className="text-black">Email:</h1>
              <input
                placeholder={session.user.email}
                readOnly
                className="h-10 placeholder-black border-black border-2 rounded-md px-4"
              />
            </div>
            <div>
              <h1 className="text-black">Contact Number:</h1>
              <input
                type="tel"
                value={session.user.contactNumber}
                readOnly
                className="h-10 text-black border-black border-2 rounded-md px-4"
              />
            </div>
            <Button
              onClick={async () => {
                toaster(
                  300,
                  `${session.user.email} has successfully logged out`
                );
                await signOut({ redirect: false });
              }}
              className="mx-auto"
            >
              SIGN OUT
            </Button>
          </FormPopups>
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
          <FormPopups message={"Users"} variant={"update"} size={"small"}>
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
                placeholder={session.user.role}
                readOnly
                className="h-10 placeholder-black border-black border-2 rounded-md px-4"
              />
            </div>
            <div>
              <h1 className="text-black">Email:</h1>
              <input
                placeholder={session.user.email}
                readOnly
                className="h-10 placeholder-black border-black border-2 rounded-md px-4"
              />
            </div>
            <div>
              <h1 className="text-black">Contact Number:</h1>
              <input
                type="tel"
                value={session.user.contactNumber}
                readOnly
                className="h-10 text-black border-black border-2 rounded-md px-4"
              />
            </div>
            <Button
              onClick={async () => {
                toaster(
                  300,
                  `${session.user.email} has successfully logged out`
                );
                await signOut({ redirect: false });
              }}
              className="mx-auto"
            >
              SIGN OUT
            </Button>
          </FormPopups>
        </div>
      )}
    </header>
  );
}
