"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/shadcn/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/carousel";
import { cn } from "@/libs/utils/utils";
import type { CarouselApi } from "@/components/shadcn/carousel";

const triviaFacts = [
  {
    title: "Sprinkla is not a real brand!",
    description:
      "This website was created as a personal project to demonstrate my full-stack development skills. You can find the full project breakdown and source code on my GitHub.",
    image: "/trivia/trivia_1.png",
  },
  {
    title: "Designed with Figma and AI tools!",
    description:
      "Most of the UI was prototyped in Figma. The logo and a few assets were generated using AI image tools like Canva’s AI and similar platforms.",
    image: "/trivia/trivia_2.png",
  },
  {
    title: "Hosted on two different platforms!",
    description:
      "That’s right! I wanted to push myself by implementing Server-Sent Events (SSE) on a separate server outside of Vercel. This helped me improve my skills on cross-platform communication between services hosted on different providers.",
    image: "/trivia/trivia_3.png",
  },
  {
    title: "Mostly custom-built components!",
    description:
      "Nearly every component on this site was built manually. The only third-party components I used were the carousel and sidebar from ShadCN, Toastify for notifications, and reactjs-popup for modals.",
    image: "/trivia/trivia_4.png",
  },
  {
    title: "Inspired by Dunkin' Donuts!",
    description:
      "As a huge donut fan, working on this site was both fun and torturous, I was thinking about donuts constantly while designing and building this website.",
    image: "/trivia/trivia_5.png",
  },
];

export default function TriviaCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative mx-auto w-full max-w-[1640px] flex flex-col justify-center items-center">
      <Carousel
        setApi={setApi}
        className="relative w-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="py-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className={cn("basis-[calc(80%)] sm:basis-1/2 xl:basis-1/3", {})}
            >
              <Card
                className={cn(
                  "h-[25rem] transition-transform duration-500 overflow-y-scroll sm:h-[30rem]",
                  index === 1 || index === 4
                    ? "bg-primary"
                    : index === 2
                    ? "bg-decorative"
                    : "bg-accent",
                  {
                    "scale-[0.6]": index !== current - 1,
                    "opacity-30": index !== current - 1,
                  }
                )}
              >
                <CardContent className="flex flex-col justify-start items-center px-6">
                  <div className="relative w-full h-[10rem] aspect-square sm:h-[12rem]">
                    <Image
                      src={`${triviaFacts[index].image}`}
                      alt="trivia_donut"
                      fill
                      className="object-contain aspect-square"
                    />
                  </div>
                  <article
                    className={`flex flex-col gap-3 pt-3 sm:gap-6 sm:pt-6 ${
                      index === 1 || index === 4 || index === 2
                        ? "text-charcoal"
                        : "text-background"
                    }`}
                  >
                    <h4 className="text-center font-bold text-lg sm:text-xl lg:text-3xl">
                      {triviaFacts[index].title}
                    </h4>
                    <p className="text-sm sm:text-md">
                      {triviaFacts[index].description}
                    </p>
                  </article>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-1/2 left-1/2 -translate-1/2 hidden sm:block sm:w-[calc(50%-64px)] xl:w-[calc(33%-64px)]">
          <CarouselPrevious className="absolute bg-accent-light hover:bg-accent-hover" />
          <CarouselNext className="absolute bg-accent-light hover:bg-accent-hover" />
        </div>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 sm:hidden">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-3.5 w-3.5 rounded-full border-2 border-accent cursor-pointer",
                {
                  "bg-accent": current === index + 1,
                }
              )}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
