"use client";

import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { LoginForm } from "../api/login/login";

const Login = () => {
  let [emailInputMessage, setEmailInputMessage] = useState<string | null>(null);
  let [passwordInputMessage, setPasswordInputMessage] = useState<string | null>(
    null
  );
  const submitLoginForm = LoginForm(
    setEmailInputMessage,
    setPasswordInputMessage
  );

  return (
    <section className="w-full h-[100dvh] flex justify-center align-middle">
      <form
        onSubmit={submitLoginForm}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[540px] rounded-md flex flex-col items-center pb-12 bg-secondary"
      >
        <div className="relative w-full h-64">
          <Image src="/login_modal_image.png" alt="login modal image" fill />
        </div>
        <h1 className="mt-6">SPRINKLA</h1>
        <div className="w-[80%] h-18 mt-6">
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="bg-white w-full text-black rounded-sm"
          />
          {emailInputMessage ? (
            <h6 className="text-red-600 text-xs">{emailInputMessage}</h6>
          ) : null}
        </div>
        <div className="w-[80%] h-18">
          <h6>Password</h6>
          <input
            type="text"
            name="password"
            className="bg-white w-full text-black rounded-sm"
          />
          {passwordInputMessage ? (
            <h6 className="text-red-600 text-xs">{passwordInputMessage}</h6>
          ) : null}
        </div>
        <button
          type="submit"
          className="cursor-pointer w-44 h-8 rounded-md bg-quinary"
        >
          Login
        </button>
        <h6 className="font-light text-sm mt-6">
          Not a member?
          <Link
            href="/register"
            onClick={(e) => e.stopPropagation()}
            className="ml-2 text-quinary"
          >
            Sign Up
          </Link>
        </h6>
      </form>
    </section>
  );
};

export default Login;
