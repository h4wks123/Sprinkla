"use server";

import { Suspense } from "react";
import Search from "@/components/ui/search";
import { Button } from "@/components/ui/buttons";
import ProductsTable from "@/components/ui/tables/products";
import Pagination from "@/components/ui/pagination";
import { fetchProductPages } from "@/libs/database/queries/products/displayProducts";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { totalPages } = await fetchProductPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-black font-bold">Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search a product..." />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<h1 className="text-black">Loading....</h1>}
      >
        <ProductsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
