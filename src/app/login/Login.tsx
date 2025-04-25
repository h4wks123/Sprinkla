import React from "react";

import Image from "next/image";

import LoginBtn from "@/client/LoginBtn";
import RegisterBtn from "@/client/RegisterBtn";

const Login = () => {
  return (
    <section className="w-[100vw] h-[100vh] flex justify-center align-middle">
      <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[540px] flex flex-col items-center gap-6 pb-12 bg-secondary">
        <div className="relative w-full h-64">
          <Image src="/login_modal_image.png" alt="login modal image" fill />
        </div>
        <h1 className="mt-6">SPRINKLA</h1>
        <div className="w-[80%]">
          <h6>Email</h6>
          <input className="bg-white w-full" />
        </div>
        <div className="w-[80%]">
          <h6>Password</h6>
          <input className="bg-white w-full" />
        </div>
        <LoginBtn />
        <RegisterBtn />
      </article>
    </section>
  );
};

export default Login;
