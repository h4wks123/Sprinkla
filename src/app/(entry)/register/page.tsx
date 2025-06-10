"use client";

import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { RegisterForm } from "@/app/(handlers)/entry/register/register";
import { Button } from "@/components/ui/buttons";

const Register = () => {
  const [emailInputMessage, setEmailInputMessage] = useState<string | null>(
    null
  );
  const [passwordInputMessage, setPasswordInputMessage] = useState<
    string | null
  >(null);
  const [contactNumberInputMessage, setContactNumberInputMessage] = useState<
    string | null
  >(null);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) =>
        RegisterForm(
          e,
          setEmailInputMessage,
          setPasswordInputMessage,
          setContactNumberInputMessage,
          router
        )
      }
      className="bg-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[540px] rounded-md flex flex-col items-center pb-12 shadow-xl/30"
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
        <h6>Email Address</h6>
        <input
          type="text"
          name="email"
          className="w-full bg-white text-black rounded-sm"
          placeholder="customer@sprinkla.com"
        />
        {emailInputMessage ? (
          <h6 className="text-red-600 text-xs">{emailInputMessage}</h6>
        ) : null}
      </div>
      <div className="w-[80%] h-18">
        <h6>Password</h6>
        <input
          type="password"
          name="password"
          className="w-full bg-white text-black rounded-sm"
          placeholder="customer123"
        />
        {passwordInputMessage ? (
          <h6 className="text-red-600 text-xs">{passwordInputMessage}</h6>
        ) : null}
      </div>
      <div className="w-[80%] h-18">
        <h6>Contact Number</h6>
        <input
          type="number"
          name="contactNumber"
          className="w-full bg-white text-black rounded-sm"
          placeholder="1112223334"
        />
        {contactNumberInputMessage ? (
          <h6 className="text-red-600 text-xs">{contactNumberInputMessage}</h6>
        ) : null}
      </div>
      <Button type="submit">Register</Button>
      <h6 className="font-light text-sm mt-6">
        Already a member?
        <Link
          href="/login"
          onClick={(e) => e.stopPropagation()}
          className="ml-2 text-blue-700 hover:underline"
        >
          Sign In
        </Link>
      </h6>
    </form>
  );
};

export default Register;
