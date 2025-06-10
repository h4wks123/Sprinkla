"use server";

import Image from "next/image";

import { printProductsByProductType } from "@/libs/database/queries/products/displayProducts";
import SelectProductTypes from "../selectProductTypes";
import { Button } from "../buttons";
import HandlerFormPopups from "../formPopups/handlerPopup";
import NumberPicker from "../numberPicker";
import { SubmitProductsForm } from "@/app/(handlers)/cart/storeProduct/products";

export default async function CustomerProductsTable({
  productType,
}: {
  productType: string;
}) {
  const { products, productTypes, finalProductType } =
    await printProductsByProductType(productType);

  return (
    <>
      <SelectProductTypes productTypes={productTypes} />
      <div className="w-full h-16 bg-tertiary-dark flex justify-center items-center text-3xl font-bold tracking-wider uppercase overflow-x-auto md:hidden">
        {finalProductType}
      </div>
      <div className="w-full h-full overflow-y-auto flex flex-wrap items-start justify-center rounded-none p-6 gap-6 border-secondary border-b-8 bg-primary xl:border-x-8 xl:rounded-md">
        {products.map((product, i) => (
          <div
            key={i}
            className="w-[calc(100%/2-24px)] flex flex-col justify-center items-start gap-2 sm:w-[calc(100%/3-24px)]  lg:w-[calc(100%/4-24px)]"
          >
            <Image
              src="/donut_sale.png"
              alt="donut sale"
              width={200}
              height={200}
              className="mx-auto"
            />
            <h5 className="h-20 text-xl text-quaternary font-bold sm:h-16 sm:text-2xl">
              {product.product_name.length > 25
                ? product.product_name.substring(0, 25) + "..."
                : product.product_name}
            </h5>
            <p className="text-red-500 text-md sm:text-lg">
              PHP{" "}
              {product.price % 1 === 0 ? product.price + ".00" : product.price}
            </p>
            <div className="w-full">
              {" "}
              <HandlerFormPopups
                message={"ORDER NOW"}
                size={"full"}
                handler={SubmitProductsForm}
              >
                <input
                  type="hidden"
                  name="productID"
                  value={product.product_id}
                />
                <Image
                  src="/donut_sale.png"
                  alt="donut sale"
                  width={250}
                  height={250}
                  className="mx-auto"
                />
                <div>
                  <h6 className="text-black">Product Name</h6>
                  <input
                    name="productName"
                    value={product.product_name}
                    readOnly
                    className="h-10 text-black border-black border-2 rounded-md px-4"
                  />
                </div>
                <NumberPicker
                  maxQuantity={product.quantity}
                  price={product.price}
                />
                <Button type="submit" className="mx-auto">
                  ADD TO CART
                </Button>
              </HandlerFormPopups>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}