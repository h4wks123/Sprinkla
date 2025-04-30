"use client";

import React, { FormEvent, useRef } from "react";

import Link from "next/link";
import Image from "next/image";

import registerUser from "@/libs/database/queries/users/createUsers";

const Register = () => {
  function submitRegisterForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let emailInput = formData.get("email") as string;
    let passwordInput = formData.get("password") as string;
    let contactNumberInput = Number(formData.get("contactNumber"));

    e.currentTarget.reset();

    if (!emailInput || !passwordInput || !contactNumberInput) {
      throw new Error("Inputs cannot be empty");
    } 
    // else {
    //   registerUser(emailInput, passwordInput, contactNumberInput);
    // }
  }

  return (
    <section className="w-full h-[100dvh] flex justify-center align-middle">
      <form
        onClick={submitRegisterForm}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[540px] rounded-md flex flex-col items-center gap-6 pb-12 bg-secondary"
      >
        <div className="relative w-full h-64">
          <Image src="/login_modal_image.png" alt="login modal image" fill />
        </div>
        <h1 className="mt-6">SPRINKLA</h1>
        <div className="w-[80%]">
          <h6>Email</h6>
          <input
            type="text"
            name="email"
            className="w-full bg-white text-black"
          />
        </div>
        <div className="w-[80%]">
          <h6>Password</h6>
          <input
            type="text"
            name="password"
            className="w-full bg-white text-black"
          />
        </div>
        <div className="w-[80%]">
          <h6>Contact Number</h6>
          <input
            type="text"
            name="contactNumber"
            className="w-full bg-white text-black"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer w-44 h-8 rounded-md bg-quinary"
        >
          Register
        </button>
        <h6 className="font-light text-sm">
          Already a member?
          <Link href="/login" className="ml-2 text-quinary">
            Sign In
          </Link>
        </h6>
      </form>
    </section>
  );
};

export default Register;
