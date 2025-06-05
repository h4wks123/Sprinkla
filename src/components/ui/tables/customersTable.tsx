"use server";

import Image from "next/image";
import { printProducts } from "@/libs/database/queries/products/displayProducts";
import SelectProductTypes from "../selectProductTypes";

export default async function CustomersTable(props: {
  searchParams?: Promise<{
    productType?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const productType = searchParams?.productType;
  const { products, productTypes } = await printProducts(
    "",
    -1,
    productType || ""
  );

  return (
    <section id="products_section" className="relative w-screen mb-20">
      <div className="relative w-full max-w-[1280px] h-[50rem] mx-auto flex flex-col justify-center items-center rounded-none bg-secondary xl:rounded-md">
        {/* Filter UI */}
        <SelectProductTypes productTypes={productTypes} />

        {/* Product List */}
        <div className="w-full h-full overflow-y-scroll flex flex-wrap items-start justify-center rounded-none p-6 gap-6 border-secondary border-b-8 bg-primary xl:border-8 xl:rounded-md">
          {products.map((product, i) => (
            <div
              key={i}
              className="flex flex-col w-[calc(1280px/4-56px)] justify-center items-start gap-2"
            >
              <Image
                src="/donut_sale.png"
                alt="donut sale"
                width={200}
                height={200}
                className="mx-auto"
              />
              <h5 className="text-quaternary text-2xl font-bold">
                {product.product}
              </h5>
              <p className="text-red-500 text-lg">PHP {product.price}</p>
              <button className="bg-quaternary-dark mx-auto w-60 h-10 rounded-lg flex justify-center items-center cursor-pointer text-white">
                ORDER NOW
              </button>
            </div>
          ))}
        </div>

        {/* Decorative Background */}
        <div className="hidden absolute overflow-hidden -z-10 h-full w-dvw xl:block before:absolute before:animate-slanting-elements-slow before:h-[200dvw] before:w-[20rem] before:rotate-85 before:aspect-auto before:right-1/2 before:-top-[calc(100dvw-25rem)] before:bg-repeat-y before:overflow-hidden before:bg-[url('/customer_home_circles_1.svg')]" />
      </div>
    </section>
  );
}
