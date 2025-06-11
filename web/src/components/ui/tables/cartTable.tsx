"use server";

import getCartProducts from "@/libs/database/queries/carts/displayCartProducts";
import Image from "next/image";
import ActionFormPopups from "../formPopups/actionPopup";
import { deleteCart } from "@/libs/database/queries/carts/deleteCart";
import { Button } from "../buttons";
import { createOrders } from "@/libs/database/queries/orders/createOrders";

export default async function CartTable() {
  const cartItems = await getCartProducts();
  const totalAmount = cartItems.cartItems.reduce(
    (acc, item) => acc + item.product_price * item.cart_quantity,
    0
  );

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="h-[620px] max-h-[620px] w-full min-w-[1024px] border border-gray-200">
          <table className="w-full table-auto text-left text-black">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr className="h-13">
                <th className="pl-4">Product Name</th>
                <th className="pl-4 w-[15%]">Product Type</th>
                <th className="pl-4 w-[10%]">Quantity</th>
                <th className="pl-4 w-[10%]">Total Price</th>
                <th className="pl-4 w-[10%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.cartItems.length > 0 ? (
                cartItems.cartItems.map((cartItems) => (
                  <tr
                    key={cartItems.cart_id}
                    className="border-y border-secondary-dark hover:bg-gray-100"
                  >
                    <td className="p-4 flex justify-start items-center gap-10">
                      <div>
                        <Image
                          src="/donut_sale.png"
                          alt="donut sale"
                          width={100}
                          height={100}
                          className="relative mx-auto"
                        />
                      </div>
                      <h3 className="font-bold text-lg">
                        {cartItems.product_name}
                      </h3>
                    </td>
                    <td className="p-4 w-[15%]">{cartItems.product_type}</td>
                    <td className="p-4 w-[10%]">{cartItems.cart_quantity}</td>
                    <td className="p-4 w-[10%]">
                      {cartItems.product_price * cartItems.cart_quantity}
                    </td>
                    <td className="p-4 w-[10%]">
                      <ActionFormPopups
                        action={deleteCart}
                        message={"Delete"}
                        variant={"delete"}
                        size={"small"}
                      >
                        <input
                          type="hidden"
                          name="cartID"
                          value={cartItems.cart_id}
                        />
                        <input
                          type="hidden"
                          name="productName"
                          value={cartItems.product_name}
                        />
                        <h4 className="text-black font-semibold">
                          Are you sure you want to delete{" "}
                          {cartItems.product_name}?
                        </h4>
                        <Button size="small" variant="delete">
                          Delete
                        </Button>
                      </ActionFormPopups>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-[532px] w-full">
                  <td
                    colSpan={5}
                    className="absolute left-1/2 top-1/2 -translate-1/2 text-center text-gray-600 font-semibold"
                  >
                    Your cart is empty. Go and order something sweet! 🍩
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-between items-center p-6 gap-6 rounded-lg">
        <ActionFormPopups
          action={createOrders}
          message={"Check Out"}
          variant={"update"}
        >
          {cartItems.cartItems.map((item) => (
            <input
              key={item.cart_id}
              type="hidden"
              name="cartIDs"
              value={item.cart_id}
            />
          ))}
          <div className="w-80">
            <h6 className="text-black">Delivery Address</h6>
            <input
              name="address"
              type="text"
              placeholder="Country, City, Street, Building Name"
              className="h-10 w-full text-black border-black border-2 rounded-md px-4"
            />
          </div>
          <h4 className="text-black font-semibold">
            Total Amount: ₱{totalAmount}
          </h4>
          <Button size="small" variant="update">
            Check Out
          </Button>
        </ActionFormPopups>
        <div className="flex gap-2">
          <h6 className="text-black">Total Amount:</h6>
          <p className="font-bold text-black">₱ {totalAmount}</p>
        </div>
      </div>
    </>
  );
}
