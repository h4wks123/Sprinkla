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
    <section className="w-full h-[100dvh]">
      <Image
        src="bezier_curve_2.svg"
        alt="bezier_curve_2"
        width={0}
        height={0}
        style={{
          position: "fixed",
          width: "28%",
          minWidth: "400px",
          height: "auto%",
          animationName: "login_bezier_curves",
          animationDuration: "40s",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
          animationTimingFunction: "ease-in-out",
        }}
      />
      <Image
        src="bezier_curve_1.svg"
        alt="bezier_curve_1"
        width={0}
        height={0}
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "28%",
          minWidth: "400px",
          height: "auto%",
          animationName: "login_bezier_curves",
          animationDuration: "40s",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
          animationTimingFunction: "ease-in-out",
        }}
      />
      <Image
        src="/login_donut_1.png"
        alt="login_donut_1"
        width={425}
        height={425}
        quality={100}
        style={{
          position: "fixed",
          top: -40,
          right: -50,
          animationName: "login_donut_1",
          animationDuration: "40s",
          animationIterationCount: "infinite",
        }}
      />
      <Image
        src="/login_donut_2.png"
        alt="login_donut_1"
        width={525}
        height={525}
        quality={100}
        style={{
          position: "fixed",
          bottom: -20,
          left: -30,
          animationName: "login_donut_1",
          animationDuration: "40s",
          animationIterationCount: "infinite",
        }}
      />
      <Image
        src="/login_triangles.svg"
        alt="login_triangles"
        width={0}
        height={0}
        style={{
          height: "100%",
          width: "auto",
          position: "fixed",
        }}
      />
      <form
        onSubmit={submitLoginForm}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[540px] rounded-md flex flex-col items-center pb-12 bg-secondary"
      >
        <div className="relative w-full h-64">
          <Image src="/login_modal_image.png" alt="login modal image" fill />
        </div>
        <Image
          src="/sprinkla_logo.svg"
          alt="spinkla_logo"
          width={275}
          height={275}
          style={{
            marginTop: "calc(var(--spacing) * 6)",
          }}
        />
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
