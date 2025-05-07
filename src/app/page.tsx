import React from "react";

import NavSignInBtn from "@/components/ui/navsigninbtn";
import NavSignOutBtn from "@/components/ui/navsignoutbtn";

import Image from "next/image";

import { getSession } from "@/libs/auth/session";

import checkUserRole from "@/libs/database/queries/users/checkUserRole";

const userRole = {
  customer: "customer",
  admin: "admin",
};

const page = async () => {
  const userSession = await getSession();
  let userType = null;
  if (userSession !== null) {
    userType = await checkUserRole(userSession.email);
  }

  return (
    <>
      <header className="w-[min(90%,1280px)] max-w-[1280px] h-[4rem] mx-auto flex justify-end items-center">
        {!userSession ? (
          <NavSignInBtn />
        ) : userType?.mode === userRole.customer ? (
          <div className="flex justify-center items-center gap-6">
            <NavSignOutBtn />
            <Image
              src="/cart_icon.svg"
              alt="cart_icon"
              width={30}
              height={30}
              className="ml-auto"
            />
            <Image
              src="/side_bar_icon.svg"
              alt="side_bar_icon"
              width={30}
              height={30}
            />
          </div>
        ) : (
          <NavSignOutBtn />
        )}
      </header>
      <main className="w-full h-full">
        {!userSession || userType?.mode === userRole.customer ? (
          <section className="relative w-[100vw] h-[calc(100dvh-4rem)]">
            <div className="relative h-[42rem]">
              <Image
                src="/home_donut_video.gif"
                alt="my gif"
                fill
                style={{
                  zIndex: "-10",
                  objectFit: "cover",
                }}
              />
              <div className="static w-[min(90%,1280px)] mx-auto md:relative">
                <Image
                  src="/sprinkla_logo.svg"
                  alt="spinkla_logo"
                  width={350}
                  height={350}
                  className="absolute top-[10%] left-1/2 -translate-1/2 md:left-0 md:-translate-x-0"
                />
              </div>
              <div
                className="absolute w-screen left-1/2 -translate-x-1/2 flex justify-center items-center gap-6 sm:gap-12"
                style={{ bottom: "calc(-1 * min(87.5px, 10vw))" }}
              >
                <div className="w-[min(175px,20vw)] h-[min(175px,20vw)] bg-cover bg-[url('/products_icon_light.svg')] cursor-pointer duration-300 ease-in-out hover:bg-[url('/products_icon_dark.svg')] hover:scale-125" />
                <div className="w-[min(175px,20vw)] h-[min(175px,20vw)] bg-cover bg-[url('/brands_icon_light.svg')] cursor-pointer duration-300 ease-in-out hover:bg-[url('/brands_icon_dark.svg')] hover:scale-125" />
                <div className="w-[min(175px,20vw)] h-[min(175px,20vw)] bg-cover bg-[url('/contact_icon_light.svg')] cursor-pointer duration-300 ease-in-out hover:bg-[url('/contact_icon_dark.svg')] hover:scale-125" />
              </div>
            </div>
          </section>
        ) : null}
        {!userSession || userType?.mode === userRole.customer ? (
          <section className="relative flex flex-col mb-24 xl:flex-row">
            {/* > 1280px breakpoint */}
            <div className="relative w-[85vw] h-[25rem] aspect-[16/9] flex sm:h-[25rem] xl:hidden">
              <div className="bg-tertiary w-full h-[20.4rem] mt-[1.55rem] xl:hidden" />
              <Image
                src="/customer_home_bezier_curve_1.png"
                alt="cutsomer_home_bezier_curve"
                quality={100}
                width={500}
                height={500}
                className="relative object-contain object-left"
              />
            </div>
            <article className="flex flex-col gap-2 justify-center items-center text-center xl:hidden">
              <h1
                className="text-purple-logo text-[35px] sm:text-[40px]"
                style={{ fontFamily: "var(--font-satisfy)" }}
              >
                Triple the Delight
              </h1>
              <h4 className="text-brown-logo font-poppins text-[20px]">
                THREE BRANCHES ACROSS
              </h4>
              <h3 className="text-blue-logo font-playfair text-[38px] font-bold">
                CEBU CITY
              </h3>
            </article>
            {/* <= 1280px breakpoint */}
            <div className="hidden bg-tertiary w-[calc(50%-640px)] lg:mt-[1.8rem] lg:h-[43.2rem] xl:block" />
            <div className="hidden relative w-[min(90%,1280px)] max-w-[1280px] justify-between items-center xl:flex">
              <div className="relative w-[50rem] h-[50rem]">
                <Image
                  src="/customer_home_bezier_curve_1.png"
                  alt="cutsomer_home_bezier_curve"
                  quality={100}
                  fill
                />
              </div>
              <article className="absolute right-0 flex flex-col gap-12 justify-center items-end">
                <h1
                  className="text-purple-logo text-[80px]"
                  style={{ fontFamily: "var(--font-satisfy)" }}
                >
                  Triple the Delight
                </h1>
                <h4 className="text-brown-logo font-poppins text-[33px]">
                  THREE BRANCHES ACROSS
                </h4>
                <h3 className="text-blue-logo font-playfair text-[76px] font-bold">
                  CEBU CITY
                </h3>
              </article>
            </div>
          </section>
        ) : null}
        <section className="w-[min(90%,1280px)] max-w-[1280px] mx-auto flex flex-col justify-center items-center bg-secondary">
          <ul>NavBar</ul>
          <div>Hello</div>
        </section>
      </main>
    </>
  );
};

export default page;
