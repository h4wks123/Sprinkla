"use server";

import { printOrders } from "@/libs/database/queries/orders/displayOrders";
import ActionFormPopups from "../formPopups/actionPopup";
import updateOrders from "@/libs/database/queries/orders/updateOrders";
import { Button } from "../buttons";

export default async function OrdersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const orders = await printOrders(query, currentPage);

  return (
    <table className="w-full min-w-[1280px] table-auto text-left text-black">
      <thead className="w-full bg-gray-200">
        <tr className="w-full h-13">
          <th className="pl-4 w-[30%]">Email</th>
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
            <td className="pl-4 w-[30%]">{order.user_email}</td>
            <td className="pl-4 w-[30%]">{order.address}</td>
            <td className="pl-4 w-[15%]">{order.status}</td>
            <td className="pl-4 w-[10%]">{order.date}</td>
            <td className="pl-4 w-[15%]">
              <ActionFormPopups
                action={updateOrders}
                message="Update"
                variant={"update"}
                overflow={true}
              >
                <input type="hidden" name="orderID" value={order.order_id} />
                <table className="w-full table-auto text-left text-black">
                  <thead>
                    <tr className="w-full h-13">
                      <th className="w-[250px]">Product Name</th>
                      <th className="w-[200px]">Product Type</th>
                      <th className="w-[100px]">Quantity</th>
                      <th className="w-[100px]">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {order.order_items.map((items: any) => (
                      <tr key={items.id} className="h-13 w-full">
                        <td className="w-[250px]">{items.product_name}</td>
                        <th className="w-[200px] font-medium">
                          {items.product_type}
                        </th>
                        <th className="w-[100px] font-medium">
                          {items.quantity}
                        </th>
                        <th className="w-[100px] font-medium">{items.price}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-end gap-4">
                  <div className="w-[200px] flex flex-col gap-3 text-black font-bold">
                    <h6>Order Status</h6>
                    <select name="productStatus" className="border p-1 rounded">
                      <option value={order.status}>{order.status}</option>
                      {["queued", "dispatched", "delivered", "cancelled"]
                        .filter((status) => status !== order.status)
                        .map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                    </select>
                  </div>
                  <Button type="submit" variant="update" interaction="ghost">
                    Update Status
                  </Button>
                </div>
              </ActionFormPopups>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
