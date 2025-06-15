"use server";

import { Suspense } from "react";
import Search from "@/components/ui/search";
import ProductsTable from "@/components/ui/tables/productsTable";
import Pagination from "@/components/ui/pagination";
import { fetchProductPages } from "@/libs/database/queries/products/displayProducts";
import createProducts from "@/libs/database/queries/products/createProducts";
import ActionFormPopups from "@/components/ui/formPopups/actionPopup";
import { Button } from "@/components/ui/buttons";
import Image from "next/image";

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
    <section className="w-full border-accent border-2 rounded-lg">
      <div className="w-full bg-accent flex flex-wrap items-center justify-between p-6 gap-6">
        <h1 className="text-3xl text-black font-bold">PRODUCTS</h1>
        <Search placeholder="Search a product..." />
      </div>
      <div className="h-[620px] border-accent border-t overflow-x-auto">
        <Suspense
          key={query + currentPage + productType}
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
          <ProductsTable
            query={query}
            currentPage={currentPage}
            productType={productType}
          />
        </Suspense>
      </div>
      <div className="w-full flex flex-wrap justify-between items-center p-6 gap-6">
        <ActionFormPopups
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
        </ActionFormPopups>
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}
