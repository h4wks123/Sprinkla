"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/libs/auth/session";

const NavSignOutBtn = () => {
  const router = useRouter();

  async function navigateToSignOutPage() {
    await logout();
    router.push("/");
  }

  return (
    <button
      onClick={navigateToSignOutPage}
      className="cursor-pointer w-28 h-10 rounded-md bg-quinary"
    >
      SIGN OUT
    </button>
  );
};

export default NavSignOutBtn;
