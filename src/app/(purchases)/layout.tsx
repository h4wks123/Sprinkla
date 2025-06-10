"use server";

import { Header } from "@/components/ui/entry/header";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-full">
      <Header />
      <nav className="w-full bg-gray-200 border-y-2 border-secondary-dark">
        <div className="w-[min(90%,1280px)] max-w-[1280px] h-13 mx-auto flex flex-wrap justify-between items-center text-black font-bold">
          <Link href="/recent">Recent</Link>
          <Link href="/history">History</Link>
        </div>
      </nav>
      <section className="relative bg-white w-[90%] max-w-[1640px] mx-auto mt-[4rem]">
        {children}
      </section>
    </main>
  );
}