"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import loginUser from "@/libs/database/queries/users/loginUsers";

const Login = () => {
  const router = useRouter();

  async function submitLoginForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const emailInput = formData.get("email") as string;
    const passwordInput = formData.get("password") as string;

    e.currentTarget.reset();

    if (!emailInput || !passwordInput) {
      throw new Error("Login inputs cannot be empty!");
    } else {
      let email = emailInput;
      let password = passwordInput;

      const loginStatus = await loginUser(email, password);

      if (loginStatus.status === 200) {
        router.push("/");
      }
    }
  }

  return (
    <section className="w-full h-[100dvh] flex justify-center align-middle">
      <form
        onSubmit={submitLoginForm}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[540px] rounded-md flex flex-col items-center gap-6 pb-12 bg-secondary"
      >
        <div className="relative w-full h-64">
          <Image src="/login_modal_image.png" alt="login modal image" fill />
        </div>
        <h1 className="mt-6">SPRINKLA</h1>
        <div className="w-[80%]">
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="bg-white w-full text-black"
          />
        </div>
        <div className="w-[80%]">
          <h6>Password</h6>
          <input
            type="text"
            name="password"
            className="bg-white w-full text-black"
          />
        </div>
        <button
          type="submit"
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
