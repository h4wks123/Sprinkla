"use client";

import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoginForm } from "../../(handlers)/entry/login/login";
import { Button } from "@/components/ui/buttons";
const Login = () => {
  const [emailInputMessage, setEmailInputMessage] = useState<string | null>(
    null
  );
  const [passwordInputMessage, setPasswordInputMessage] = useState<
    string | null
  >(null);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) =>
        LoginForm(e, setEmailInputMessage, setPasswordInputMessage, router)
      }
      className="bg-secondary text-charcoal font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[540px] rounded-md flex flex-col items-center pb-12 shadow-xl/30"
    >
      <div className="relative w-full h-48 lg:h-64">
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
          className="bg-white w-full rounded-sm"
          placeholder="customer@sprinkla.com"
        />
        {emailInputMessage ? (
          <h6 className="text-delete text-xs">{emailInputMessage}</h6>
        ) : null}
      </div>
      <div className="w-[80%] h-18">
        <h6>Password</h6>
        <input
          type="password"
          name="password"
          className="bg-white w-full text-black rounded-sm"
          placeholder="customer123"
        />
        {passwordInputMessage ? (
          <h6 className="text-delete text-xs">{passwordInputMessage}</h6>
        ) : null}
      </div>
      <Button type="submit" className="text-white">
        Login
      </Button>
      <h6 className="font-light text-sm mt-6">
        Not a member?
        <Link
          href="/register"
          onClick={(e) => e.stopPropagation()}
          className="ml-2 text-accent hover:underline"
        >
          Sign Up
        </Link>
      </h6>
    </form>
  );
};

export default Login;
