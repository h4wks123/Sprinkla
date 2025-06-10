"use server";

import { printCurrentOrders } from "@/libs/database/queries/orders/displayCurrentOrders";
import React from "react";
import Image from "next/image";

const page = async () => {
  const pendingOrderedItems = await printCurrentOrders();

  return (
    <section className="w-full bg-primary flex flex-col flex-wrap justify-start gap-6 lg:flex-row">
      {/* Vertical stepper  */}
      <ol className="hidden relative w-[320px] text-black lg:block">
        <li className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-15 h-15 rounded-full bg-green-400 flex justify-center items-center">
              <Image
                src="/queued.svg"
                alt="queued"
                width={50}
                height={50}
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <h6 className="font-bold">Order is queued</h6>
              <p>Wait for order confirmation</p>
            </div>
          </div>
          <div className="w-15 flex justify-center">
            <div className="w-1 h-35 bg-gray-400"></div>
          </div>
        </li>
        <li className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-15 h-15 rounded-full bg-gray-400 flex justify-center items-center">
              <Image
                src="/dispatched.svg"
                alt="dispatched"
                width={50}
                height={50}
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <h6 className="font-bold">Order is dispatched</h6>
              <p>Ready for order to be delivered</p>
            </div>
          </div>
          <div className="w-15 flex justify-center">
            <div className="w-1 h-35 bg-gray-400"></div>
          </div>
        </li>
        <li className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-15 h-15 rounded-full bg-gray-400 flex justify-center items-center">
              <Image
                src="/delivered.svg"
                alt="delivered"
                width={50}
                height={50}
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <h6 className="font-bold">Order is delivered</h6>
              <p>Thank you for ordering.</p>
            </div>
          </div>
        </li>
      </ol>

      {/* Horizontal stepper  */}
      <ol className="w-full flex items-center lg:hidden">
        <li className="w-full flex items-center">
          <div className="w-15 h-15 rounded-full bg-green-400 flex justify-center items-center">
            <Image
              src="/queued.svg"
              alt="queued"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
          <div className="w-[calc(100%-60px)] h-1 bg-gray-400"></div>
        </li>
        <li className="w-full flex items-center">
          <div className="w-15 h-15 rounded-full bg-gray-400 flex justify-center items-center">
            <Image
              src="/dispatched.svg"
              alt="dispatched"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
          <div className="w-[calc(100%-60px)] h-1 bg-gray-400"></div>
        </li>
        <li className="flex items-center">
          <div className="w-15 h-15 rounded-full bg-gray-400 flex justify-center items-center">
            <Image
              src="/delivered.svg"
              alt="delivered"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
        </li>
      </ol>

      <div className="w-full lg:w-[calc(100%-344px)] border-2 border-secondary-dark rounded-lg">
        <div className="w-full bg-secondary flex flex-wrap items-center justify-between rounded-t-lg p-6 gap-6">
          <h1 className="text-3xl text-black font-bold">PENDING ORDER</h1>
        </div>
        <div className="h-[480px] w-full bg-white overflow-auto">
          <table className="w-full min-w-[800px] bg-white table-auto text-left text-black border-y border-secondary-dark">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr className="h-13">
                <th className="pl-4">Product Name</th>
                <th className="pl-4 w-[200px]">Product Type</th>
                <th className="pl-4 w-[200px]">Quantity</th>
                <th className="pl-4 w-[200px]">Product Price</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrderedItems.currentOrderItems.map(
                (currentOrderItems) => (
                  <tr
                    key={currentOrderItems.id}
                    className="border-y border-secondary-dark hover:bg-gray-100"
                  >
                    <td className="p-4 flex justify-start items-center gap-10">
                      {currentOrderItems.product_name}
                    </td>
                    <td className="p-4 w-[200px]">
                      {currentOrderItems.product_type}
                    </td>
                    <td className="p-4 w-[200px]">
                      {currentOrderItems.quantity}
                    </td>
                    <td className="p-4 w-[200px]">{currentOrderItems.price}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full flex flex-wrap items-center justify-end rounded-t-lg p-6 gap-6">
          <h6 className="text-black">Total Amount:</h6>
          {!Array.isArray(pendingOrderedItems.currentOrder) && (
            <p className="font-bold text-black">
              ₱ {pendingOrderedItems.currentOrder.total_price}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
