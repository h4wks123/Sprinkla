"use server";

import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full h-[100dvh]">
      <Image
        src="/bezier_curve_2.svg"
        alt="bezier_curve_2"
        width={0}
        height={0}
        style={{
          position: "fixed",
          width: "28%",
          minWidth: "325px",
          height: "auto%",
          animationName: "login_bezier_curves",
          animationDuration: "40s",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
          animationTimingFunction: "ease-in-out",
        }}
      />
      <Image
        src="/bezier_curve_1.svg"
        alt="bezier_curve_1"
        width={0}
        height={0}
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "28%",
          minWidth: "325px",
          height: "auto%",
          animationName: "login_bezier_curves",
          animationDuration: "40s",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
          animationTimingFunction: "ease-in-out",
        }}
      />
      <Image
        src="/login_donut_1.png"
        alt="login_donut_1"
        width={425}
        height={425}
        quality={100}
        style={{
          position: "fixed",
          top: -40,
          right: -50,
          animationName: "login_donut",
          animationDuration: "40s",
          animationIterationCount: "infinite",
        }}
        className="hidden lg:block"
      />
      <div
        className="fixed w-[18rem] h-[18rem] -bottom-5 -left-7.5 lg:w-[30rem] lg:h-[30rem]"
        style={{
          animationName: "login_donut",
          animationDuration: "40s",
          animationIterationCount: "infinite",
        }}
      >
        <Image
          src="/login_donut_2.png"
          alt="login_donut_2"
          fill
          quality={100}
        />
      </div>
      {children}
      <div className="animate-slanting-elements-fast fixed hidden h-[170%] w-[20rem] bg-repeat-y overflow-hidden -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[url('/login_triangles.svg')] xl:block" />
    </section>
  );
}
