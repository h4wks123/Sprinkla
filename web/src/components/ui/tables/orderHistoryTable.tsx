"use server";

import { printUserOrder } from "@/libs/database/queries/orders/displayOrders";
import ActionFormPopups from "../formPopups/actionPopup";

export default async function OrderHistoryTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const orders = await printUserOrder(currentPage);

  return (
    <table className="w-full min-w-[1080px] table-auto text-left text-black">
      <thead className="w-full bg-gray-200">
        <tr className="w-full h-13">
          <th className="pl-4 w-[30%]">Address</th>
          <th className="pl-4 w-[15%]">Status</th>
          <th className="pl-4 w-[10%]">Date</th>
          <th className="pl-4 w-[15%]">Details</th>
        </tr>
      </thead>
      <tbody>
        {orders.orders.map((order) => (
          <tr
            key={order.order_id}
            className="h-13 w-full border-y border-secondary-dark hover:bg-gray-200"
          >
            <td className="pl-4 w-[30%]">{order.address}</td>
            <td className="pl-4 w-[15%]">{order.status}</td>
            <td className="pl-4 w-[10%]">{order.date}</td>
            <td className="pl-4 w-[15%]">
              <ActionFormPopups
                message="View Items"
                variant={"update"}
                overflow={true}
              >
                <input type="hidden" name="orderID" value={order.order_id} />
                <table className="w-full table-auto text-left text-black">
                  <thead>
                    <tr className="w-full h-13">
                      <th className="w-[250px] px-4">Product Name</th>
                      <th className="w-[200px] px-4">Product Type</th>
                      <th className="w-[100px] px-4">Quantity</th>
                      <th className="w-[100px] px-4">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {order.order_items.map((items: any) => (
                      <tr
                        key={items.id}
                        className="h-13 w-full border-y border-gray-200"
                      >
                        <td className="w-[250px] px-4">{items.product_name}</td>
                        <th className="w-[200px] px-4 font-medium">
                          {items.product_type}
                        </th>
                        <th className="w-[100px] px-4 font-medium">
                          {items.quantity}
                        </th>
                        <th className="w-[100px] px-4 font-medium">
                          {items.price}
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 flex gap-3 text-black font-bold">
                  <h6>Order Status:</h6>
                  <p className="font-medium">{order.status}</p>
                </div>
              </ActionFormPopups>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
