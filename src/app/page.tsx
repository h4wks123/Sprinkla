"use server";

import React from "react";

import NavSignInBtn from "@/components/ui/navsigninbtn";
import NavSignOutBtn from "@/components/ui/navsignoutbtn";

import Image from "next/image";
import Link from "next/link";

import { getSession } from "@/libs/auth/session";

const page = async () => {
  const userSession = await getSession();

  return (
    <>
      <header className="w-[min(90%,1280px)] max-w-[1280px] h-[4rem] mx-auto flex justify-end items-center">
        {!userSession ? (
          <NavSignInBtn />
        ) : (
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
        )}
      </header>
      <main className="w-full h-full">
        <section
          id="landing_view_section"
          className="relative w-[100vw] mb-20 h-[calc(42rem+min(175px,20vw))] xl:h-[calc(100dvh-4rem)]"
        >
          <div className="relative h-[calc(100%-87.5px)]">
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
              className="absolute w-screen left-1/2 -translate-x-1/2 flex justify-center items-center gap-4 md:gap-12"
              style={{ bottom: "calc(-1 * min(87.5px, 15vw))" }}
            >
              <Link
                href="#products_section"
                scroll={true}
                className="scroll-smooth w-[min(175px,30vw)] h-[min(175px,30vw)] bg-cover bg-[url('/products_icon_light.svg')] cursor-pointer duration-300 ease-in-out hover:bg-[url('/products_icon_dark.svg')] hover:scale-125"
              />
              <Link
                href="#sponsors_section"
                scroll={true}
                className="w-[min(175px,30vw)] h-[min(175px,30vw)] bg-cover bg-[url('/brands_icon_light.svg')] cursor-pointer duration-300 ease-in-out hover:bg-[url('/brands_icon_dark.svg')] hover:scale-125"
              />
              <Link
                href="#contacts_section"
                scroll={true}
                className="w-[min(175px,30vw)] h-[min(175px,30vw)] bg-cover bg-[url('/contact_icon_light.svg')] cursor-pointer duration-300 ease-in-out hover:bg-[url('/contact_icon_dark.svg')] hover:scale-125"
              />
            </div>
          </div>
        </section>
        <section
          id="slogan_section"
          className="relative w-screen flex flex-col justify-center mb-20 xl:flex-row xl:justify-start"
        >
          <div className="relative flex">
            <div className="relative bg-tertiary  md:w-full md:h-[40rem] xl:animate-push-extra-large xl:w-[calc(50vw-640px)]" />
            <div className="animate-push-small relative w-[85vw] h-[85vw] aspect-square mr-[15%] md:w-[40rem] md:h-[40rem] md:animate-push-medium xl:animate-none">
              <Image
                src="/home_donut_2.png"
                alt="home_donut_2"
                quality={100}
                fill
                className="animate-shake-soft absolute z-10"
              />
              <Image
                src="/customer_home_bezier_curve_1.png"
                alt="cutsomer_home_bezier_curve_1"
                quality={100}
                fill
                className="absolute"
              />
            </div>
          </div>
          <article className="relative flex flex-col gap-6 mt-20 xl:mt-0 xl:gap-8 xl:w-[min(90%,1280px)] xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-1/2">
            <h1
              className="text-purple-logo text-center font-bold tracking-tight text-[50px] md:text-[60px] xl:text-right xl:text-[80px]"
              style={{ fontFamily: "Lucida Handwriting" }}
            >
              Triple the Delight
            </h1>
            <h4 className="text-brown-logo text-center font-poppins text-[20px] md:text-[25px] xl:text-right xl:text-[33px]">
              THREE BRANCHES ACROSS
            </h4>
            <h3 className="text-blue-logo text-center font-playfair font-bold text-[40px] md:text-[58px] xl:text-right xl:text-[76px]">
              CEBU CITY
            </h3>
          </article>
        </section>
        <section id="products_section" className="relative w-screen mb-30">
          <div className="relative w-full max-w-[1280px] h-[50rem] mx-auto flex flex-col justify-center items-center rounded-none bg-secondary xl:rounded-md">
            <ul className="w-[90%] h-[5rem] mx-auto flex justify-start items-center gap-8 text-black font-bold">
              <li>PROMOS</li>
              <li>DOUGHNUTS</li>
            </ul>
            <div className="w-full h-full overflow-y-scroll flex flex-wrap items-start justify-center rounded-none p-6 gap-6 border-secondary border-b-8 bg-primary xl:border-8 xl:rounded-md">
              <div className="flex flex-col w-[calc(1280px/4-56px)] justify-center items-left gap-2">
                <Image
                  src="/donut_sale.png"
                  alt="donut sale"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
                <h5 className="text-quaternary text-2xl font-bold">
                  One Dozen Mixed Donuts
                </h5>
                <p className="text-red-500 text-lg">PHP 500.00</p>
                <button className="bg-quaternary-dark mx-auto w-60 h-10 rounded-lg flex justify-center items-center cursor-pointer text-white">
                  ORDER NOW
                </button>
              </div>
              <div className="flex flex-col w-[calc(1280px/4-56px)] justify-center items-left gap-2">
                <Image
                  src="/donut_sale.png"
                  alt="donut sale"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
                <h5 className="text-quaternary text-2xl font-bold">
                  One Dozen Mixed Donuts
                </h5>
                <p className="text-red-500 text-lg">PHP 500.00</p>
                <button className="bg-quaternary-dark mx-auto w-60 h-10 rounded-lg flex justify-center items-center cursor-pointer text-white">
                  ORDER NOW
                </button>
              </div>
              <div className="flex flex-col w-[calc(1280px/4-56px)] justify-center items-left gap-2">
                <Image
                  src="/donut_sale.png"
                  alt="donut sale"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
                <h5 className="text-quaternary text-2xl font-bold">
                  One Dozen Mixed Donuts
                </h5>
                <p className="text-red-500 text-lg">PHP 500.00</p>
                <button className="bg-quaternary-dark mx-auto w-60 h-10 rounded-lg flex justify-center items-center cursor-pointer text-white">
                  ORDER NOW
                </button>
              </div>
              <div className="flex flex-col w-[calc(1280px/4-56px)] justify-center items-left gap-2">
                <Image
                  src="/donut_sale.png"
                  alt="donut sale"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
                <h5 className="text-quaternary text-2xl font-bold">
                  One Dozen Mixed Donuts
                </h5>
                <p className="text-red-500 text-lg">PHP 500.00</p>
                <button className="bg-quaternary-dark mx-auto w-60 h-10 rounded-lg flex justify-center items-center cursor-pointer text-white">
                  ORDER NOW
                </button>
              </div>
              <div className="flex flex-col w-[calc(1280px/4-56px)] justify-center items-left gap-2">
                <Image
                  src="/donut_sale.png"
                  alt="donut sale"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
                <h5 className="text-quaternary text-2xl font-bold">
                  One Dozen Mixed Donuts
                </h5>
                <p className="text-red-500 text-lg">PHP 500.00</p>
                <button className="bg-quaternary-dark mx-auto w-60 h-10 rounded-lg flex justify-center items-center cursor-pointer text-white">
                  ORDER NOW
                </button>
              </div>
            </div>
            <div className="hidden absolute overflow-hidden -z-10 h-full w-dvw xl:block before:absolute before:animate-slanting-elements-slow before:h-[200dvw] before:w-[20rem] before:rotate-85 before:aspect-auto before:right-1/2 before:-top-[calc(100dvw-25rem)] before:bg-repeat-y before:overflow-hidden before:bg-[url('/customer_home_circles_1.svg')]" />
          </div>
        </section>
        <section id="sponsors_section" className="relative w-screen mb-20">
          <div className="flex justify-start overflow-y-visible overflow-x-clip">
            <div className="bg-quaternary relative w-[calc(50%-640px)] h-[12rem]" />
            <div className="relative bg-quaternary w-full max-w-[1280px] h-[12rem] bg-top bg-contain bg-no-repeat bg-[url('/brands_bezier_curve_1.svg')]">
              <Image
                src="/home_donut_1.png"
                alt="home_donut_1"
                width={350}
                height={350}
                className="animate-shake-hard absolute -top-[8rem] left-0"
              />
            </div>
            <div className="bg-quaternary w-[calc(50%-640px)] h-[12rem]" />
          </div>
          <article className="w-screen bg-quaternary pb-20 flex flex-col gap-10">
            <h3 className="w-[min(90%,1280px)] max-w-[1280px] mx-auto text-tertiary-dark font-bold text-center text-5xl sm:text-7xl">
              SPONSORS
            </h3>
            <ul className="w-[min(90%,1280px)] max-w-[1280px] mx-auto flex flex-wrap justify-center gap-10">
              <li className="relative w-[calc(1280px/4-2rem)] h-[calc(1280px/4-2rem)]">
                <Image
                  src="/dunkin_donuts_logo.png"
                  alt="dunkin_donuts_logo"
                  fill
                  quality={100}
                  className="cursor-pointer duration-300 ease-in-out hover:scale-110"
                />
              </li>
              <li className="relative w-[calc(1280px/4-2rem)] h-[calc(1280px/4-2rem)]">
                <Image
                  src="/starbucks_logo.png"
                  alt="starbucks_logo"
                  fill
                  quality={100}
                  className="cursor-pointer duration-300 ease-in-out hover:scale-110"
                />
              </li>
              <li className="relative w-[calc(1280px/4-2rem)] h-[calc(1280px/4-2rem)]">
                <Image
                  src="/krispy_kreme_logo.png"
                  alt="krispy_kreme_logo"
                  fill
                  quality={100}
                  className="cursor-pointer duration-300 ease-in-out hover:scale-110"
                />
              </li>
            </ul>
          </article>
          <div className="relative h-[20rem] w-dvw bg-repeat-x bg-contain bg-[url('/brands_bezier_curve_2.svg')]" />
        </section>
        <section
          id="contacts_section"
          className="relative w-screen mb-20 flex justify-center"
        >
          <div className="w-[min(90%,1280px)] max-w-[1280px] mx-auto bg-secondary flex flex-col justify-between items-center rounded-lg lg:flex-row lg:pr-10">
            <div className="relative w-full h-full aspect-square">
              <Image
                src="/sprinkla_restaurant.jpg"
                alt="sprinkla_restaurant"
                fill
                className="absolute rounded-t-md lg:rounded-l-md lg:rounded-t-none"
              />
            </div>
            <article className="w-full max-w-[640px] text-black flex flex-col items-left justify-center gap-4 p-10 pb-20 lg:max-w-none lg:pl-15 lg:py-10 lg:pr-0 ">
              <div className="flex items-center gap-3">
                <Image
                  src="/touch_icon.svg"
                  alt="touch_icon"
                  width={35}
                  height={35}
                />
                <h3 className="font-bold text-xl">Let`s Get In Touch</h3>
              </div>
              <h6>
                Or just reach me out to{" "}
                <Link
                  href="mailto:ivannebayer@gmail.com"
                  className="cursor-pointer text-blue-700 border-b-1"
                >
                  ivannebayer@gmail.com
                </Link>
              </h6>
              <div className="flex items-center gap-3">
                <Image
                  src="/phone_icon.svg"
                  alt="phone_icon"
                  width={35}
                  height={35}
                />
                <h3 className="font-bold text-xl">Delivery Numbers</h3>
              </div>
              <ul className="flex flex-wrap gap-x-8 gap-y-4">
                <li>
                  <div className="text-tertiary-dark font-semibold">
                    Robinsons Galleria, Cebu City
                  </div>
                  <div>(32) 123-79000</div>
                </li>
                <li>
                  <div className="text-tertiary-dark font-semibold">
                    SM Seaside, Cebu City
                  </div>
                  <div>(32) 777-50001</div>
                </li>
                <li>
                  <div className="text-tertiary-dark font-semibold">
                    Ayala Malls, Cebu City
                  </div>
                  <div>(32) 123-79000</div>
                </li>
              </ul>
              <p className="font-light">
                Delivery service for Sprinkla is available in Cebu only. A
                minimum order of Php 350 is required to proceed with any
                transaction
              </p>
            </article>
          </div>
          <div className="hidden absolute overflow-hidden -z-10 h-full w-dvw xl:block before:absolute before:animate-slanting-elements-slow before:h-[200dvw] before:w-[20rem] before:rotate-90 before:aspect-auto before:right-1/2 before:-top-[calc(100dvw-25rem)] before:bg-repeat-y before:overflow-hidden before:bg-[url('/customer_home_circles_2.svg')]" />
        </section>
      </main>
      <footer className="relative w-screen min-h-30  bg-secondary-dark flex items-center">
        <div className="absolute w-50 h-40 -top-25 left-0 sm:w-60 sm:h-45 sm:-top-25 lg:w-85 lg:h-60 lg:-top-35">
          <Image src="/home_donut_3.png" alt="home_donut" fill />
        </div>
        <ul className="w-[min(90%,1280px)] max-w-[1280px] mx-auto flex justify-end items-center gap-6">
          <h5 className="font-bold text-xl">Follow Us</h5>
          <Link
            href="https://www.linkedin.com/in/ivanne-dave-bayer-a23b30302/"
            target="_blank"
          >
            <Image
              src="/linkedin_icon.svg"
              alt="linkedin_icon"
              width={35}
              height={35}
              className="cursor-pointer"
            />
          </Link>
          <Link href="https://github.com/h4wks123" target="_blank">
            <Image
              src="/github_icon.svg"
              alt="github_icon"
              width={35}
              height={35}
              className="cursor-pointer"
            />
          </Link>
        </ul>
      </footer>
    </>
  );
};

export default page;
