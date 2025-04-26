"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";

import loginUser from "@/app/actions/users/loginUsers";

const LoginForm = () => {
  const router = useRouter();
  let emailInput = useRef<HTMLInputElement>(null);
  let passwordInput = useRef<HTMLInputElement>(null);

  async function submitLoginForm() {
    if (!emailInput || !passwordInput) {
      throw new Error("Login inputs cannot be empty!");
    } else {
      let email = emailInput.current!.value;
      let password = passwordInput.current!.value;

      emailInput.current!.value = "";
      passwordInput.current!.value = "";

      const loginStatus = await loginUser(email, password);

      if (loginStatus.status === 200) {
        router.push("/");
      }

    }
  }

  return (
    <>
      <div className="w-[80%]">
        <h6>Email</h6>
        <input className="bg-white w-full text-black" ref={emailInput} />
      </div>
      <div className="w-[80%]">
        <h6>Password</h6>
        <input className="bg-white w-full text-black" ref={passwordInput} />
      </div>
      <button
        onClick={submitLoginForm}
        className="cursor-pointer w-44 h-8 rounded-md bg-quinary"
      >
        Login
      </button>
    </>
  );
};

export default LoginForm;
