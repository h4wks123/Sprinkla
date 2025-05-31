"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-screen min-h-36  bg-secondary-dark flex items-center">
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
  );
}
