"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import loginUser from "@/libs/database/queries/users/loginUsers";

const Login = () => {
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
    <section className="w-full h-[100dvh] flex justify-center align-middle">
      <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[540px] rounded-md flex flex-col items-center gap-6 pb-12 bg-secondary">
        <div className="relative w-full h-64">
          <Image src="/login_modal_image.png" alt="login modal image" fill />
        </div>
        <h1 className="mt-6">SPRINKLA</h1>
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
        <h6 className="font-light text-sm">
          Not a member?
          <Link href="/register" className="ml-2 text-quinary">
            Sign Up
          </Link>
        </h6>
      </form>
    </section>
  );
};

export default Login;
