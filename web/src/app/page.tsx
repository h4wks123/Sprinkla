"use server";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/ui/entry/header";
import Footer from "@/components/ui/entry/footer";
import LogoCarousel from "@/components/ui/carousels/logoCarousel";
import TestimonialCarousel from "@/components/ui/carousels/testimonial";

import CustomerProductsTable from "@/components/ui/tables/customerProductsTable";

const page = async (props: {
  searchParams?: Promise<{
    productType?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const productType = searchParams?.productType || "";

  return (
    <>
      <Header />
      <main className="w-full h-full">
        <section
          id="landing_view_section"
          className="relative w-[100vw] mb-20 h-[calc(42rem+min(175px,20vw))] xl:h-[calc(100dvh-4rem)]"
        >
          <div className="relative h-[calc(100%-87.5px)] border-b-4 border-b-accent">
            <Image
              src="/home_donut_video.gif"
              alt="my gif"
              fill
              className="-z-10 object-cover"
            />
            <div
              className="absolute w-screen left-1/2 -translate-x-1/2 flex justify-center items-center gap-4 md:gap-12"
              style={{ bottom: "calc(-1 * min(87.5px, 15vw))" }}
            >
              <Link
                href="#products_section"
                scroll={true}
                className="w-[min(175px,30vw)] h-[min(175px,30vw)] bg-cover bg-[url('/product_icon_light.svg')] cursor-pointer duration-300 ease-in-out hover:bg-[url('/product_icon_dark.svg')] hover:scale-125"
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
            <div className="relative bg-primary  md:w-full md:h-[40rem] xl:animate-push-extra-large xl:w-[calc(50vw-640px)]" />
            <div className="animate-push-small relative w-[85vw] h-[85vw] aspect-square mr-[15%] md:w-[40rem] md:h-[40rem] md:animate-push-medium xl:animate-none">
              <Image
                src="/home_donut_2.png"
                alt="home_donut_2"
                quality={100}
                fill
                className="animate-shake-soft absolute z-10"
              />
              <Image
                src="/customer_home_beizer_curve_1.svg"
                alt="cutsomer_home_bezier_curve_1"
                fill
                className="absolute object-cover w-full h-full overflow-visible"
              />
            </div>
          </div>
          <article className="relative flex flex-col gap-6 mt-20 xl:mt-0 xl:gap-8 xl:w-[min(90%,1280px)] xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-1/2">
            <h1
              className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center font-bold tracking-tight text-[50px] md:text-[60px] xl:text-right xl:text-[80px]"
              style={{ fontFamily: "Lucida Handwriting" }}
            >
              Triple the Delight
            </h1>

            <h4 className="text-charcoal text-center font-poppins text-[20px] md:text-[25px] xl:text-right xl:text-[33px]">
              THREE BRANCHES ACROSS
            </h4>
            <h3
              id="font-effect"
              className="text-center font-bold text-[40px] md:text-[58px] xl:text-right xl:text-[76px]"
            >
              Cebu City
            </h3>
          </article>
        </section>
        <section id="products_section" className="relative w-screen mb-20">
          <div className="relative w-full max-w-[1280px] mx-auto flex flex-col justify-center sm:w-[90%] sm:flex-row">
            <CustomerProductsTable productType={productType} />
            <div className="hidden absolute overflow-hidden -z-10 h-full w-dvw xl:block before:absolute before:animate-slanting-elements-slow before:h-[202dvw] before:w-[20rem] before:rotate-85 before:aspect-auto before:right-1/2 before:-top-[calc(100dvw-25rem)] before:bg-repeat-y before:overflow-hidden before:bg-[url('/customer_home_circles_1.svg')]" />
          </div>
        </section>
        <section
          id="sponsors_section"
          className="relative w-screen mb-20 overflow-x-clip overflow-y-visible"
        >
          <div className="flex justify-start overflow-y-visible overflow-x-clip">
            <div className="bg-primary relative w-[calc(50%-640px)] h-[12rem]" />
            <div className="relative bg-primary w-full max-w-[1280px] h-[12rem] bg-top bg-contain bg-no-repeat bg-[url('/brands_bezier_curve_1.svg')]">
              <Image
                src="/home_donut_1.png"
                alt="home_donut_1"
                width={350}
                height={350}
                className="animate-shake-hard absolute -top-[8rem] left-0"
              />
            </div>
            <div className="bg-primary w-[calc(50%-640px)] h-[12rem]" />
          </div>
          <div className="w-screen bg-primary py-20 flex flex-col gap-10">
            <article className="flex flex-col gap-3">
              <h3
                className="w-[min(90%,1280px)] max-w-[1280px] mx-auto text-charcoal font-bold text-center text-5xl sm:text-8xl"
                style={{ fontFamily: "Lucida Handwriting" }}
              >
                SPONSORS
              </h3>
              <p className="mx-auto text-charcoal text-lg font-semibold">
                Technologies used in making of this project...
              </p>
            </article>
            <LogoCarousel />
          </div>
          <div className="relative w-dvw max-h-[20rem] min-w-[640px] aspect-[4/1] bg-contain bg-repeat-x bg-[url('/brands_bezier_curve_2.svg')]" />
        </section>
        <section
          id="contacts_section"
          className="relative w-screen mb-20 flex flex-col justify-center items-center"
        >
          <article className="w-[min(90%,1280px)] mx-auto flex flex-col items-center justify-center gap-3 mb-10">
            <h3
              className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center text-5xl sm:text-8xl"
              style={{ fontFamily: "Lucida Handwriting" }}
            >
              DONUT JUST EAT
            </h3>
            <p className="mx-auto text-charcoal text-lg font-semibold">
              Learn some delicious facts too!
            </p>
          </article>
          <TestimonialCarousel />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default page;
