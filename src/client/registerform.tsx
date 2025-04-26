"use client";

import React, { useRef } from "react";

import registerUser from "@/app/actions/users/createUsers";

const RegisterForm = () => {
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
    <>
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
    </>
  );
};

export default RegisterForm;
