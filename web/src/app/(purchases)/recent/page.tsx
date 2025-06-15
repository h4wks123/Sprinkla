"use server";

import { printRecentOrders } from "@/libs/database/queries/orders/displayRecentOrders";
import React from "react";
import Stepper from "@/components/ui/stepper";

const page = async () => {
  const pendingOrderedItems = await printRecentOrders();

  return (
    <section className="w-full bg-background flex flex-col flex-wrap justify-start gap-6 lg:flex-row">
      <Stepper
        orderID={pendingOrderedItems.currentOrder?.order_id}
        fetchedStatus={pendingOrderedItems.currentOrder?.status}
      />
      <div className="w-full lg:w-[calc(100%-344px)] border-2 border-accent rounded-lg">
        <div className="w-full bg-accent flex flex-wrap items-center justify-between p-6 gap-6">
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
        <div className="w-full bg-white flex flex-wrap items-center justify-between p-6 border-t border-gray-200 rounded-b-lg">
          <div className="flex gap-4">
            <h6 className="text-black font-bold">Address:</h6>
            <p className="text-black">
              {pendingOrderedItems.currentOrder?.address}
            </p>
          </div>
          <div className="flex gap-4">
            <h6 className="text-black font-bold">Total Amount:</h6>
            {!Array.isArray(pendingOrderedItems.currentOrder) && (
              <p className="text-black">
                ₱ {pendingOrderedItems.currentOrder?.total_price}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
