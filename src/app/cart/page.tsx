"use server";

import { Header } from "@/components/ui/entry/header";
import { Suspense } from "react";
import CartTable from "@/components/ui/tables/cartTable";
import Image from "next/image";

const page = async () => {
  return (
    <main className="w-full h-full">
      <Header />
      <main className="relative bg-white w-[90%] max-w-[1640px] mx-auto border-2 border-secondary-dark rounded-lg mb-10">
        <div className="w-full bg-secondary flex flex-wrap items-center justify-between rounded-t-lg p-6 gap-6">
          <h1 className="text-3xl text-black font-bold">CART ITEMS</h1>
        </div>
        <Suspense
          fallback={
            <div className="w-full h-[708px] flex justify-center items-center">
              <Image src="/loader.gif" alt="loader" width={75} height={75} />
            </div>
          }
        >
          <CartTable />
        </Suspense>
      </main>
    </main>
  );
};

export default page;
