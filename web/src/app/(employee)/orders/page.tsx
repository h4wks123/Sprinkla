"use server";

import React, { Suspense } from "react";
import Search from "@/components/ui/search";
import Image from "next/image";
import Pagination from "@/components/ui/pagination";
import { fetchOrderPages } from "@/libs/database/queries/orders/displayOrders";
import OrdersTable from "@/components/ui/tables/ordersTable";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { totalPages } = await fetchOrderPages(query);

  return (
    <section className="w-full border-accent border-2 rounded-lg">
      <div className="w-full bg-accent flex flex-wrap items-center justify-between p-6 gap-6">
        <h1 className="text-3xl text-black font-bold">ORDERS</h1>
        <Search placeholder="Search customer name..." />
      </div>
      <div className="h-[620px] border-accent border-t overflow-x-auto">
        <Suspense
          key={query + currentPage}
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
          <OrdersTable query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="w-full flex flex-wrap justify-end items-center p-6">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}
