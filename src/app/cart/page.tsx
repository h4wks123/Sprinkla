"use server";

import { Header } from "@/components/ui/entry/header";
import getCartProducts from "@/libs/database/queries/carts/getCartProducts";
import Image from "next/image";
import ActionFormPopups from "@/components/ui/formPopups/actionPopup";
import { Button } from "@/components/ui/buttons";
import { deleteCart } from "@/libs/database/queries/carts/deleteCart";
import { createOrders } from "@/libs/database/queries/orders/createOrders";

const page = async () => {
  const cartItems = await getCartProducts();
  const totalAmount = cartItems.cartItems.reduce(
    (acc, item) => acc + item.product_price * item.cart_quantity,
    0
  );

  return (
    <main className="w-full h-full">
      <Header />
      <main className="relative bg-white  w-[90%] max-w-[1640px] mx-auto border-2 border-secondary-dark rounded-lg mb-10 overflow-x-auto">
        <div className="w-full min-w-[1280px] bg-secondary flex flex-wrap items-center justify-between rounded-t-lg p-6 gap-6">
          <h1 className="text-3xl text-black font-bold">CART ITEMS</h1>
        </div>
        <table className="w-full min-w-[1280px] table-auto text-left text-black">
          <thead className="w-full bg-gray-200">
            <tr className="w-full h-13">
              <th className="pl-4">Product Name</th>
              <th className="pl-4 w-[10%]">Product Type</th>
              <th className="pl-4 w-[10%]">Quantity</th>
              <th className="pl-4 w-[10%]">Total Price</th>
              <th className="pl-4 w-[10%]">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {cartItems.cartItems.map((cartItems) => (
              <tr
                key={cartItems.cart_id}
                className="w-full border-y border-secondary-dark hover:bg-gray-100"
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
                <td className="p-4 w-[10%]">{cartItems.product_type}</td>
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
                      Are you sure you want to delete {cartItems.product_name}?
                    </h4>
                    <Button size="small" variant="delete">
                      Delete
                    </Button>
                  </ActionFormPopups>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
            <h4 className="text-black font-semibold">
              Are you sure you want to check out all your items totaling ₱
              {totalAmount}?
            </h4>
            <Button size="small" variant="update">
              Check Out
            </Button>
          </ActionFormPopups>
          <div className="flex gap-2">
            <h6 className="text-black ">Total Amount:</h6>
            <p className="font-bold text-black">PHP {totalAmount}</p>
          </div>
        </div>
      </main>
    </main>
  );
};

export default page;
