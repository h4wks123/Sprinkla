"use client";

import React from "react";
import Image from "next/image";

const techGroup1 = [
  { url: "/technologies/html-5.svg", name: "HTML5" },
  { url: "/technologies/css-3.svg", name: "CSS3" },
  { url: "/technologies/javascript.svg", name: "JavaScript" },
  { url: "/technologies/typescript.svg", name: "TypeScript" },
  { url: "/technologies/nodejs.svg", name: "Node.js" },
  { url: "/technologies/react.svg", name: "React" },
  { url: "/technologies/nextjs.svg", name: "Next.js" },
  { url: "/technologies/html-5.svg", name: "HTML5" },
  { url: "/technologies/css-3.svg", name: "CSS3" },
  { url: "/technologies/javascript.svg", name: "JavaScript" },
  { url: "/technologies/typescript.svg", name: "TypeScript" },
  { url: "/technologies/nodejs.svg", name: "Node.js" },
  { url: "/technologies/react.svg", name: "React" },
  { url: "/technologies/nextjs.svg", name: "Next.js" },
];

const techGroup2 = [
  { url: "/technologies/nextauth.svg", name: "NextAuth.js" },
  { url: "/technologies/tailwindcss.svg", name: "Tailwind CSS" },
  { url: "/technologies/shadcn.svg", name: "shadcn/ui" },
  { url: "/technologies/turso.svg", name: "Turso" },
  { url: "/technologies/drizzle-orm.svg", name: "Drizzle ORM" },
  { url: "/technologies/vercel.svg", name: "Vercel" },
  { url: "/technologies/render.svg", name: "Render" },
  { url: "/technologies/nextauth.svg", name: "NextAuth.js" },
  { url: "/technologies/tailwindcss.svg", name: "Tailwind CSS" },
  { url: "/technologies/shadcn.svg", name: "shadcn/ui" },
  { url: "/technologies/turso.svg", name: "Turso" },
  { url: "/technologies/drizzle-orm.svg", name: "Drizzle ORM" },
  { url: "/technologies/vercel.svg", name: "Vercel" },
  { url: "/technologies/render.svg", name: "Render" },
];

const LogoCarousel = () => {
  return (
    <div className="flex flex-col gap-10 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-100px),transparent_100%)]">
      <div className="mx-auto w-full max-w-[2460px] flex flex-nowrap overflow-x-auto">
        <ul className="w-full min-w-[2560px] flex justify-between gap-4 animate-logo-carousel">
          {techGroup1.map((tech, index) => (
            <li
              key={index}
              className="flex flex-col gap-4 justify-between items-center"
            >
              <Image
                src={tech.url}
                alt={tech.name}
                width={100}
                height={100}
                className="aspect-square"
              />
              <h6 className="font-semibold text-charcoal">{tech.name}</h6>
            </li>
          ))}
          <li className="w-[100px] h-[100px] aspect-square" />
        </ul>
        <ul className="w-full min-w-[2560px] flex justify-between gap-4 ml-[-100px] animate-logo-carousel">
          {techGroup1.map((tech, index) => (
            <li
              key={index}
              className="flex flex-col gap-4 justify-between items-center"
            >
              <Image
                src={tech.url}
                alt={tech.name}
                width={100}
                height={100}
                className="aspect-square"
              />
              <h6 className="font-semibold text-charcoal">{tech.name}</h6>
            </li>
          ))}
          <li className="w-[100px] h-[100px] aspect-square" />
        </ul>
      </div>
      <div className="mx-auto w-full max-w-[2460px] flex flex-nowrap overflow-x-auto">
        <ul className="w-full min-w-[2560px] flex justify-between gap-4 ml-[-2460px] mr-[-100px] animate-logo-carousel-reverse">
          <li className="w-[100px] h-[100px] aspect-square" />
          {techGroup2.map((tech, index) => (
            <li
              key={index}
              className="flex flex-col gap-4 justify-between items-center"
            >
              <Image
                src={tech.url}
                alt={tech.name}
                width={100}
                height={100}
                className="aspect-square"
              />
              <h6 className="font-semibold text-charcoal">{tech.name}</h6>
            </li>
          ))}
        </ul>
        <ul className="w-full min-w-[2560px] flex justify-between gap-4 animate-logo-carousel-reverse">
          <li className="w-[100px] h-[100px] aspect-square" />
          {techGroup2.map((tech, index) => (
            <li
              key={index}
              className="flex flex-col gap-4 justify-between items-center"
            >
              <Image
                src={tech.url}
                alt={tech.name}
                width={100}
                height={100}
                className="aspect-square"
              />
              <h6 className="font-semibold text-charcoal">{tech.name}</h6>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LogoCarousel;
