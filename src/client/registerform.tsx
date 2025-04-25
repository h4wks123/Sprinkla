"use client";

import React, { useRef } from "react";

import { createUsers } from "@/database/queries/users/createUsers";

const RegisterForm = () => {
  let emailInput = useRef<HTMLInputElement>(null);
  let passwordInput = useRef<HTMLInputElement>(null);
  let contactNumberInput = useRef<HTMLInputElement>(null);

  async function registerUser() {
    if (!emailInput || !passwordInput || !contactNumberInput) {
      throw new Error("Inputs cannot be empty");
    }

    const email = emailInput.current!.value;
    const password = passwordInput.current!.value;
    const contactNumber = Number(contactNumberInput.current!.value);

    try {
      await createUsers({
        email,
        password,
        contact_number: contactNumber,
        user_type: "customer",
      });
    } catch (err) {
      console.error("Error inserting values into the database: ", err);
    }
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
        onClick={registerUser}
      >
        Register
      </button>
    </>
  );
};

export default RegisterForm;
