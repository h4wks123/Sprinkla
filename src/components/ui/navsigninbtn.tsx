"use client";
// button used to sign in user

import React from "react";
import { useRouter } from "next/navigation";

const NavSignInBtn = () => {
  const router = useRouter();

  function navigateToSignInPage() {
    router.push("/login");
  }

  return (
    <button
      onClick={navigateToSignInPage}
      className="cursor-pointer w-28 h-8 rounded-md bg-quinary"
    >
      SIGN IN
    </button>
  );
};

export default NavSignInBtn;
