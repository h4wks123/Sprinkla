"use server";

import Image from "next/image";

import { printProductsByProductType } from "@/libs/database/queries/products/displayProducts";
import SelectProductTypes from "../selectProductTypes";
import { Button } from "../buttons";
import HandlerFormPopups from "../formPopups/handlerPopup";
import NumberPicker from "../numberPicker";
import { SubmitProductsForm } from "@/app/(handlers)/cart/products";

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
      <div className="flex flex-col w-full h-[50rem] rounded-lg">
        <div className="w-full bg-accent pl-6 py-10 font-bold text-3xl rounded-t-none sm:rounded-tr-lg">
          {finalProductType.toUpperCase()}
        </div>
        <div className="w-full h-full flex flex-wrap justify-center overflow-y-auto gap-3 p-6 border-x-2 border-b-2 border-accent bg-background rounded-b-4xl sm:justify-normal">
          {products.map((product, i) => (
            <div key={i} className="w-[10rem] h-[15rem]">
              <Image
                src="/donut_sale.png"
                alt="donut sale"
                width={100}
                height={100}
                className="mx-auto"
              />
              <article className="h-18">
                <h5 className="text-md text-accent font-semibold">
                  {product.product_name.length > 23
                    ? product.product_name.substring(0, 23) + "..."
                    : product.product_name}
                </h5>
                <p className="text-sm text-delete font-medium">
                  Php{" "}
                  {product.price % 1 === 0
                    ? product.price + ".00"
                    : product.price}
                </p>
              </article>
              <div className="w-full">
                {" "}
                <HandlerFormPopups
                  message={"ORDER NOW"}
                  size={"full"}
                  interaction={"store"}
                  text={"small"}
                  cart={true}
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
      </div>
    </>
  );
}
