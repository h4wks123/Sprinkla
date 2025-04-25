"use client";

import React from "react";

const LoginForm = () => {
  return (
    <>
      <div className="w-[80%]">
        <h6>Email</h6>
        <input className="bg-white w-full" />
      </div>
      <div className="w-[80%]">
        <h6>Password</h6>
        <input className="bg-white w-full" />
      </div>
      <button className="cursor-pointer w-44 h-8 rounded-md bg-quinary">
        Login
      </button>
    </>
  );
};

export default LoginForm;
