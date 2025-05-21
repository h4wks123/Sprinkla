"use server";

import Image from "next/image";

import NavSignOutBtn from "@/components/ui/navsignoutbtn";

const Admin = () => {
  return (
    <>
      <header className="w-[min(90%,1280px)] max-w-[1280px] h-[4rem] mx-auto flex justify-end items-center">
        <div className="flex justify-center items-center gap-6">
          <NavSignOutBtn />
          <Image
            src="/cart_icon.svg"
            alt="cart_icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
          <Image
            src="/side_bar_icon.svg"
            alt="side_bar_icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </div>
      </header>
      <main className="w-full h-full">
        <section className="relative w-screen mb-20">
          <div className="relative w-full max-w-[1280px] h-[50rem] mx-auto flex flex-col justify-center items-center bg-secondary">
            <div className="w-full h-full rounded-none border-secondary bg-primary xl:border-8 xl:rounded-md"></div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Admin;
