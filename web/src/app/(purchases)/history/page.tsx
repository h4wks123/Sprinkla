"use server";

import { Suspense } from "react";
import Image from "next/image";
import Pagination from "@/components/ui/pagination";
import { fetchOrderPages } from "@/libs/database/queries/orders/displayOrders";
import OrderHistoryTable from "@/components/ui/tables/orderHistoryTable";

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const { totalPages } = await fetchOrderPages("");

  return (
    <section className="w-full border-2 border-accent rounded-lg">
      <div className="w-full bg-accent flex flex-wrap items-center justify-between p-6 gap-6">
        <h1 className="text-3xl text-black font-bold">ORDERS</h1>
      </div>
      <div className="h-[480px] border-secondary-dark border-t overflow-x-auto">
        <Suspense
          key={currentPage}
          fallback={
            <div className="w-full h-full flex justify-center items-center">
              <Image
                src="/loader.gif"
                alt="loader"
                width={75}
                height={75}
                className="mx-auto"
              />
            </div>
          }
        >
          <OrderHistoryTable currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="w-full flex flex-wrap justify-end items-center p-6 border-t border-gray-200">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}
