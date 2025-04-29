"use client";

import React, { useRef } from "react";

import Link from "next/link";
import Image from "next/image";

import registerUser from "@/libs/database/queries/users/createUsers";

const Register = () => {
  let emailInput = useRef<HTMLInputElement>(null);
  let passwordInput = useRef<HTMLInputElement>(null);
  let contactNumberInput = useRef<HTMLInputElement>(null);

  function submitRegisterForm() {
    if (!emailInput || !passwordInput || !contactNumberInput) {
      throw new Error("Inputs cannot be empty");
    } else {
      registerUser(
        emailInput.current!.value,
        passwordInput.current!.value,
        Number(contactNumberInput.current!.value)
      );
    }

    emailInput.current!.value = "";
    passwordInput.current!.value = "";
    contactNumberInput.current!.value = "";
  }

  return (
    <section className="w-full h-[100dvh] flex justify-center align-middle">
      <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[540px] rounded-md flex flex-col items-center gap-6 pb-12 bg-secondary">
        <div className="relative w-full h-64">
          <Image src="/login_modal_image.png" alt="login modal image" fill />
        </div>
        <h1 className="mt-6">SPRINKLA</h1>
        <div className="w-[80%]">
          <h6>Email</h6>
          <input className="w-full bg-white text-black" ref={emailInput} />
        </div>
        <div className="w-[80%]">
          <h6>Password</h6>
          <input className="w-full bg-white text-black" ref={passwordInput} />
        </div>
        <div className="w-[80%]">
          <h6>Contact Number</h6>
          <input
            className="w-full bg-white text-black"
            ref={contactNumberInput}
          />
        </div>
        <button
          className="cursor-pointer w-44 h-8 rounded-md bg-quinary"
          onClick={submitRegisterForm}
        >
          Register
        </button>
        <h6 className="font-light text-sm">
          Already a member?
          <Link href="/login" className="ml-2 text-quinary">
            Sign In
          </Link>
        </h6>
      </article>
    </section>
  );
};

export default Register;
