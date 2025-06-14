"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../buttons";
import toaster from "../toaster";
import UserFormPopups from "../formPopups/userPopup";
import { SidebarTrigger } from "@/components/shadcn/sidebar";

export function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
    toaster(350, `${session?.user?.email} has successfully logged out`);
  };

  const renderCustomerLinks = () => (
    <>
      <div className="hidden sm:flex sm:items-center sm:gap-6">
        <Image
          src="/home_icon.svg"
          alt="home_icon"
          width={35}
          height={35}
          onClick={() => router.push("/")}
          className="cursor-pointer"
        />
        <Image
          src="/cart_icon_dark.svg"
          alt="cart_icon"
          width={35}
          height={35}
          onClick={() => router.push("/cart")}
          className="cursor-pointer"
        />
        <Image
          src="/purchases_icon.svg"
          alt="purchases_icon"
          width={35}
          height={35}
          onClick={() => router.push("/recent")}
          className="cursor-pointer"
        />
        <UserFormPopups onSignOut={handleSignOut} />
      </div>
      <div className="h-[35px] sm:hidden">
        <SidebarTrigger />
      </div>
    </>
  );

  const renderAdminLinks = () => (
    <>
      <div className="hidden sm:flex sm:items-center sm:gap-6">
        <Image
          src="/users_icon.svg"
          alt="users_icon"
          width={35}
          height={35}
          onClick={() => router.push("/users")}
          className="cursor-pointer"
        />
        <Image
          src="/products.svg"
          alt="products"
          width={35}
          height={35}
          onClick={() => router.push("/products")}
          className="cursor-pointer"
        />
        <Image
          src="/orders_icon.svg"
          alt="orders_icon"
          width={35}
          height={35}
          onClick={() => router.push("/orders")}
          className="cursor-pointer"
        />
        <UserFormPopups onSignOut={handleSignOut} />
      </div>
      <div className="h-[35px] sm:hidden">
        <SidebarTrigger />
      </div>
    </>
  );

  return (
    <header className="fixed top-0 z-50 w-full h-16 bg-background opacity-95 shadow-lg">
      <nav className="mx-auto flex h-full max-w-[1280px] w-[min(90%,1280px)] items-center justify-between">
        <Image
          src="/sprinkla_logo.svg"
          alt="sprinkla_logo"
          width={300}
          height={200}
          className="relative w-[175px] h-[175px] sm:w-[300px] sm:h-[300px] sm:top-1/2"
        />
        {!session ? (
          <Button onClick={() => router.push("/login")} size="small">
            SIGN IN
          </Button>
        ) : session.user.role === "customer" ? (
          renderCustomerLinks()
        ) : (
          renderAdminLinks()
        )}
      </nav>
    </header>
  );
}

export function PurchasesHeader() {
  const pathname = usePathname();
  const linkClasses = (path: string) =>
    `w-1/2 h-full flex ${
      pathname === path
        ? "bg-tertiary-dark text-white"
        : "bg-gray-200 text-black hover:bg-tertiary"
    }`;

  return (
    <nav className="flex w-full h-13 bg-gray-200 border-y-2 border-secondary-dark">
      <Link href="/recent" className={linkClasses("/recent")}>
        <div className="w-[calc(100%-640px)]" />
        <div className="flex w-[640px] items-center justify-center">
          <h3 className="w-1/2 text-2xl font-bold flex justify-center items-center">
            RECENT
          </h3>
        </div>
      </Link>
      <Link href="/history" className={linkClasses("/history")}>
        <div className="flex w-[640px] items-center justify-center">
          <h3 className="w-1/2 text-2xl font-bold flex justify-center items-center">
            HISTORY
          </h3>
        </div>
        <div className="w-[calc(100%-640px)]" />
      </Link>
    </nav>
  );
}
