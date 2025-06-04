"use server";

import { Suspense } from "react";
import Search from "@/components/ui/search";
import ProductsTable from "@/components/ui/tables/page";
import Pagination from "@/components/ui/pagination";
import { fetchProductPages } from "@/libs/database/queries/products/displayProducts";
import createProducts from "@/libs/database/queries/products/createProducts";
import FormPopups from "@/components/ui/popups";
import { Button } from "@/components/ui/buttons";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    productType?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const productType = searchParams?.productType || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { totalPages } = await fetchProductPages(query, productType);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-black font-bold">Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search a product..." />
      </div>
      <Suspense
        key={query + currentPage + productType}
        fallback={<h1 className="text-black">Loading....</h1>}
      >
        <ProductsTable
          query={query}
          currentPage={currentPage}
          productType={productType}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-between items-center">
        <FormPopups
          action={createProducts}
          message={"Create Product"}
          variant={"success"}
          size={"default"}
        >
          <div>
            <h6 className="text-black">Product Type</h6>
            <input
              name="productType"
              type="text"
              placeholder="Donuts"
              className="h-10 text-black border-black border-2 rounded-md px-4"
            />
          </div>
          <div>
            <h6 className="text-black">Product Name</h6>
            <input
              name="productName"
              type="text"
              placeholder="Sprinkla Deluxe"
              className="h-10 text-black border-black border-2 rounded-md px-4"
            />
          </div>
          <div>
            <h6 className="text-black">Quantity</h6>
            <input
              name="quantity"
              type="number"
              min="1"
              placeholder="10"
              className="h-10 text-black border-black border-2 rounded-md px-4"
            />
          </div>
          <div>
            <h6 className="text-black">Price</h6>
            <input
              name="price"
              type="number"
              min="1"
              placeholder="120"
              className="h-10 text-black border-black border-2 rounded-md px-4"
            />
          </div>
          <Button
            type="submit"
            variant="success"
            interaction="ghost"
            className="mx-auto"
          >
            Create Product
          </Button>
        </FormPopups>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
