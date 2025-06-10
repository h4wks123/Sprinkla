"use server";

import { printRecentOrders } from "@/libs/database/queries/orders/displayRecentOrders";
import React from "react";
import Image from "next/image";

const page = async () => {
  const pendingOrderedItems = await printRecentOrders();

  return (
    <section className="w-full bg-primary flex flex-col flex-wrap justify-start gap-6 lg:flex-row">
      {/* Vertical stepper  */}
      <div className="flex flex-col">
        <div className="lg:hidden">
          {pendingOrderedItems.currentOrder?.status === "cancelled" ? (
            <>
              <h1 className="text-black font-bold text-xl">
                Order is Cancelled
              </h1>
              <p className="text-black text-lg">Your order was cancelled</p>
            </>
          ) : pendingOrderedItems.currentOrder?.status === "dispatched" ? (
            <>
              <h1 className="text-black font-bold text-xl">
                Order is Dispatched
              </h1>
              <p className="text-black text-lg">
                Ready for order to be delivered
              </p>
            </>
          ) : pendingOrderedItems.currentOrder?.status === "delivered" ? (
            <>
              <h1 className="text-black font-bold text-xl">
                Order is Delivered
              </h1>
              <p className="text-black text-lg">Thank you for ordering</p>
            </>
          ) : (
            <>
              <h1 className="text-black font-bold text-xl">Order is Queued</h1>
              <p className="text-black text-lg">Wait for order confirmation</p>
            </>
          )}
        </div>

        <ol className="hidden relative w-[320px] text-black lg:block">
          <li className="flex flex-col">
            <div className="flex items-center gap-3">
              <div
                className={`w-15 h-15 rounded-full flex justify-center items-center ${
                  pendingOrderedItems.currentOrder?.status === "dispatched" ||
                  pendingOrderedItems.currentOrder?.status === "delivered"
                    ? "bg-green-400"
                    : pendingOrderedItems.currentOrder?.status === "queued"
                    ? "bg-blue-400"
                    : pendingOrderedItems.currentOrder?.status === "cancelled"
                    ? "bg-red-400"
                    : "bg-gray-400"
                }`}
              >
                <Image
                  src={
                    pendingOrderedItems.currentOrder?.status === "queued" ||
                    pendingOrderedItems.currentOrder?.status === "cancelled"
                      ? "/queued.svg"
                      : "/completed.svg"
                  }
                  alt={
                    pendingOrderedItems.currentOrder?.status === "queued"
                      ? "/queued"
                      : "/completed.svg"
                  }
                  width={50}
                  height={50}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col">
                <h6 className="font-bold">Order is Queued</h6>
                <p>Wait for order confirmation</p>
              </div>
            </div>
            <div className="w-15 flex justify-center">
              <div
                className={`w-1 h-35 rounded-full flex justify-center items-center ${
                  pendingOrderedItems.currentOrder?.status === "dispatched" ||
                  pendingOrderedItems.currentOrder?.status === "delivered"
                    ? "bg-green-400"
                    : pendingOrderedItems.currentOrder?.status === "cancelled"
                    ? "bg-red-400"
                    : "bg-gray-400"
                }`}
              />
            </div>
          </li>
          <li className="flex flex-col">
            <div className="flex items-center gap-3">
              <div
                className={`w-15 h-15 rounded-full flex justify-center items-center ${
                  pendingOrderedItems.currentOrder?.status === "dispatched" ||
                  pendingOrderedItems.currentOrder?.status === "delivered"
                    ? "bg-green-400"
                    : pendingOrderedItems.currentOrder?.status === "cancelled"
                    ? "bg-red-400"
                    : "bg-gray-400"
                }`}
              >
                <Image
                  src="/dispatched.svg"
                  alt="dispatched"
                  width={50}
                  height={50}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col">
                <h6 className="font-bold">Order is Dispatched</h6>
                <p>Ready for order to be delivered</p>
              </div>
            </div>
            <div className="w-15 flex justify-center">
              <div
                className={`w-1 h-35 rounded-full flex justify-center items-center ${
                  pendingOrderedItems.currentOrder?.status === "delivered"
                    ? "bg-green-400"
                    : pendingOrderedItems.currentOrder?.status === "cancelled"
                    ? "bg-red-400"
                    : "bg-gray-400"
                }`}
              />
            </div>
          </li>
          <li className="flex flex-col">
            <div className="flex items-center gap-3">
              <div
                className={`w-15 h-15 rounded-full flex justify-center items-center ${
                  pendingOrderedItems.currentOrder?.status === "delivered"
                    ? "bg-green-400"
                    : pendingOrderedItems.currentOrder?.status === "cancelled"
                    ? "bg-red-400"
                    : "bg-gray-400"
                }`}
              >
                <Image
                  src={
                    pendingOrderedItems.currentOrder?.status === "cancelled"
                      ? "/cancelled.svg"
                      : "/delivered.svg"
                  }
                  alt={
                    pendingOrderedItems.currentOrder?.status === "cancelled"
                      ? "/cancelled.svg"
                      : "/delivered.svg"
                  }
                  width={50}
                  height={50}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col">
                {pendingOrderedItems.currentOrder?.status === "cancelled" ? (
                  <>
                    <h6 className="font-bold">Order Cancelled</h6>
                    <p>Your order was cancelled</p>
                  </>
                ) : (
                  <>
                    <h6 className="font-bold">Order is Delivered</h6>
                    <p>Thank you for ordering.</p>
                  </>
                )}
              </div>
            </div>
          </li>
        </ol>
      </div>

      {/* Horizontal stepper  */}
      <ol className="w-full flex items-center lg:hidden">
        <li className="w-full flex items-center">
          <div
            className={`w-15 h-15 rounded-full flex justify-center items-center ${
              pendingOrderedItems.currentOrder?.status === "dispatched" ||
              pendingOrderedItems.currentOrder?.status === "delivered"
                ? "bg-green-400"
                : pendingOrderedItems.currentOrder?.status === "queued"
                ? "bg-blue-400"
                : pendingOrderedItems.currentOrder?.status === "cancelled"
                ? "bg-red-400"
                : "bg-gray-400"
            }`}
          >
            <Image
              src={
                pendingOrderedItems.currentOrder?.status === "queued" ||
                pendingOrderedItems.currentOrder?.status === "cancelled"
                  ? "/queued.svg"
                  : "/completed.svg"
              }
              alt={
                pendingOrderedItems.currentOrder?.status === "queued"
                  ? "/queued"
                  : "/completed.svg"
              }
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
          <div
            className={`w-[calc(100%-60px)] h-1 ${
              pendingOrderedItems.currentOrder?.status === "dispatched" ||
              pendingOrderedItems.currentOrder?.status === "delivered"
                ? "bg-green-400"
                : pendingOrderedItems.currentOrder?.status === "cancelled"
                ? "bg-red-400"
                : "bg-gray-400"
            }`}
          ></div>
        </li>
        <li className="w-full flex items-center">
          <div
            className={`w-15 h-15 rounded-full flex justify-center items-center ${
              pendingOrderedItems.currentOrder?.status === "dispatched" ||
              pendingOrderedItems.currentOrder?.status === "delivered"
                ? "bg-green-400"
                : pendingOrderedItems.currentOrder?.status === "cancelled"
                ? "bg-red-400"
                : "bg-gray-400"
            }`}
          >
            <Image
              src="/dispatched.svg"
              alt="dispatched"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
          <div
            className={`w-[calc(100%-60px)] h-1 ${
              pendingOrderedItems.currentOrder?.status === "delivered"
                ? "bg-green-400"
                : pendingOrderedItems.currentOrder?.status === "cancelled"
                ? "bg-red-400"
                : "bg-gray-400"
            }`}
          ></div>
        </li>
        <li className="flex items-center">
          <div
            className={`w-15 h-15 rounded-full flex justify-center items-center ${
              pendingOrderedItems.currentOrder?.status === "delivered"
                ? "bg-green-400"
                : pendingOrderedItems.currentOrder?.status === "cancelled"
                ? "bg-red-400"
                : "bg-gray-400"
            }`}
          >
            <Image
              src={
                pendingOrderedItems.currentOrder?.status === "cancelled"
                  ? "/cancelled.svg"
                  : "/delivered.svg"
              }
              alt={
                pendingOrderedItems.currentOrder?.status === "cancelled"
                  ? "/cancelled.svg"
                  : "/delivered.svg"
              }
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
        </li>
      </ol>

      <div className="w-full lg:w-[calc(100%-344px)] border-2 border-secondary-dark rounded-lg">
        <div className="w-full bg-secondary flex flex-wrap items-center justify-between rounded-t-lg p-6 gap-6">
          <h1 className="text-3xl text-black font-bold">MOST RECENT ORDER</h1>
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
              {pendingOrderedItems.currentOrderItems?.map(
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
              ₱ {pendingOrderedItems.currentOrder?.total_price}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
