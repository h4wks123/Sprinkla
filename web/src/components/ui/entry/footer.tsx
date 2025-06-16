"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-screen bg-primary flex flex-wrap items-center text-charcoal">
      <ul className="w-[min(90%,1280px)] max-w-[1280px] mx-auto flex flex-wrap justify-center items-center gap-6 p-6 sm:justify-between">
        <li className="flex justify-center items-center">
          <h6 className="flex flex-nowrap">© By&nbsp;</h6>
          <Link
            className="text-accent font-semibold"
            href="https://www.linkedin.com/in/ivanne-dave-bayer-a23b30302/"
          >
            Ivanne;
          </Link>
          <h6 className="flex flex-nowrap">&nbsp;designed on 2025</h6>
        </li>
        <li className="flex justify-center items-center gap-6">
          <h5 className="font-semibold text-lg">Follow Me</h5>
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
        </li>
      </ul>
    </footer>
  );
}
