"use client";

import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { registerForm } from "@/app/api/register/register";

const Type = {
  email: "Email",
  password: "Password",
  contactNumber: "ContactNumber",
};

const Register = () => {
  const [headers, setHeaders] = useState<{
    status: number[];
    message: string[];
    type: string[];
  } | null>(null);
  const submitregisterForm = registerForm(setHeaders);

  console.log(headers);
  return (
    <section className="w-full h-[100dvh] flex justify-center align-middle">
      <form
        onSubmit={submitregisterForm}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[540px] rounded-md flex flex-col items-center pb-12 bg-secondary"
      >
        <div className="relative w-full h-64">
          <Image src="/login_modal_image.png" alt="login modal image" fill />
        </div>
        <h1 className="mt-6">SPRINKLA</h1>
        <div className="w-[80%] h-18 mt-6">
          <h6>Email</h6>
          <input
            type="text"
            name="email"
            className="w-full bg-white text-black rounded-sm"
          />
          {headers?.status[0] !== 200 ? (
            <h6 className="text-red-600 text-xs">{headers?.message}</h6>
          ) : null}
        </div>
        <div className="w-[80%] h-18">
          <h6>Password</h6>
          <input
            type="text"
            name="password"
            className="w-full bg-white text-black rounded-sm"
          />
          {headers?.status[0] !== 200 &&
          headers?.message[0] !== "Invalid email format!" ? (
            <h6 className="text-red-600 text-xs">{headers?.message}</h6>
          ) : null}
        </div>
        <div className="w-[80%] h-18">
          <h6>Contact Number</h6>
          <input
            type="text"
            name="contactNumber"
            className="w-full bg-white text-black rounded-sm"
          />
          {headers?.status[0] !== 200 ? (
            <h6 className="text-red-600 text-xs">{headers?.message}</h6>
          ) : null}
        </div>
        <button
          type="submit"
          className="cursor-pointer w-44 h-8 rounded-md bg-quinary"
        >
          Register
        </button>
        <h6 className="font-light text-sm mt-6">
          Already a member?
          <Link
            href="/login"
            onClick={(e) => e.stopPropagation()}
            className="ml-2 text-quinary"
          >
            Sign In
          </Link>
        </h6>
      </form>
    </section>
  );
};

export default Register;
