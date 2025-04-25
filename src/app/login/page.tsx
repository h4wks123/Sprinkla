import React from "react";

import Link from "next/link";
import Image from "next/image";

import LoginForm from "@/client/loginform";

const Login = () => {

  return (
    <section className="w-full h-[100dvh] flex justify-center align-middle">
      <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[540px] rounded-md flex flex-col items-center gap-6 pb-12 bg-secondary">
        <div className="relative w-full h-64">
          <Image src="/login_modal_image.png" alt="login modal image" fill />
        </div>
        <h1 className="mt-6">SPRINKLA</h1>
        <LoginForm />
        <h6 className="font-light text-sm">
          Not a member?
          <Link href="/register" className="ml-2 text-quinary">
            Sign Up
          </Link>
        </h6>
      </article>
    </section>
  );
};

export default Login;
