"use client";

import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoginForm } from "../handlers/login/login";

const Login = () => {
  const [emailInputMessage, setEmailInputMessage] = useState<string | null>(
    null
  );
  const [passwordInputMessage, setPasswordInputMessage] = useState<
    string | null
  >(null);
  const router = useRouter();
  const { data: session } = useSession();

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
          minWidth: "325px",
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
          minWidth: "325px",
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
          animationName: "login_donut",
          animationDuration: "40s",
          animationIterationCount: "infinite",
        }}
        className="hidden lg:block"
      />
      <div
        className="fixed w-[18rem] h-[18rem] -bottom-5 -left-7.5 lg:w-[30rem] lg:h-[30rem]"
        style={{
          animationName: "login_donut",
          animationDuration: "40s",
          animationIterationCount: "infinite",
        }}
      >
        <Image
          src="/login_donut_2.png"
          alt="login_donut_2"
          fill
          quality={100}
        />
      </div>
      <div className="animate-slanting-elements-fast fixed hidden h-[170%] w-[20rem] bg-repeat-y overflow-hidden -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[url('/login_triangles.svg')] xl:block" />
      <form
        onSubmit={(e) =>
          LoginForm(e, setEmailInputMessage, setPasswordInputMessage, router)
        }
        className="bg-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[540px] rounded-md flex flex-col items-center pb-12 shadow-xl/30"
      >
        <div className="relative w-full h-64">
          <Image
            src="/login_modal_image.png"
            alt="login modal image"
            fill
            objectFit="cover"
            className="rounded-md"
          />
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
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            className="bg-white w-full text-black rounded-sm"
            placeholder="customer@sprinkla.com"
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
            placeholder="customer123"
          />
          {passwordInputMessage ? (
            <h6 className="text-red-600 text-xs">{passwordInputMessage}</h6>
          ) : null}
        </div>
        <button
          type="submit"
          className="cursor-pointer w-44 h-10 mt-2 rounded-md bg-quaternary-dark hover:scale-110 ease-in-out"
        >
          Login
        </button>
        <h6 className="font-light text-sm mt-6">
          Not a member?
          <Link
            href="/register"
            onClick={(e) => e.stopPropagation()}
            className="ml-2 text-blue-700 hover:underline"
          >
            Sign Up
          </Link>
        </h6>
      </form>
    </section>
  );
};

export default Login;
