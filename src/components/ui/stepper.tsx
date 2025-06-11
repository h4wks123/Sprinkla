"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Stepper({
  deliveryId,
  fetchedStatus,
}: {
  deliveryId: number | undefined;
  fetchedStatus: string | undefined;
}) {
  const [status, setStatus] = useState(fetchedStatus);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:4000/events/${deliveryId}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data.status);
      console.log("Received status update:");
    };

    return () => eventSource.close();
  }, [deliveryId]);

  return (
    <>
      <div className="flex flex-col">
        <div className="lg:hidden">
          {status === "cancelled" ? (
            <>
              <h1 className="text-black font-bold text-xl">
                Order is Cancelled
              </h1>
              <p className="text-black text-lg">Your order was cancelled</p>
            </>
          ) : status === "dispatched" ? (
            <>
              <h1 className="text-black font-bold text-xl">
                Order is Dispatched
              </h1>
              <p className="text-black text-lg">
                Ready for order to be delivered
              </p>
            </>
          ) : status === "delivered" ? (
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
                  status === "dispatched" || status === "delivered"
                    ? "bg-green-400"
                    : status === "queued"
                    ? "bg-blue-400"
                    : status === "cancelled"
                    ? "bg-red-400"
                    : "bg-gray-400"
                }`}
              >
                <Image
                  src={
                    status === "queued" || status === "cancelled"
                      ? "/queued.svg"
                      : "/completed.svg"
                  }
                  alt={status === "queued" ? "/queued" : "/completed.svg"}
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
                  status === "dispatched" || status === "delivered"
                    ? "bg-green-400"
                    : status === "cancelled"
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
                  status === "dispatched" || status === "delivered"
                    ? "bg-green-400"
                    : status === "cancelled"
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
                  status === "delivered"
                    ? "bg-green-400"
                    : status === "cancelled"
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
                  status === "delivered"
                    ? "bg-green-400"
                    : status === "cancelled"
                    ? "bg-red-400"
                    : "bg-gray-400"
                }`}
              >
                <Image
                  src={
                    status === "cancelled" ? "/cancelled.svg" : "/delivered.svg"
                  }
                  alt={
                    status === "cancelled" ? "/cancelled.svg" : "/delivered.svg"
                  }
                  width={50}
                  height={50}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col">
                {status === "cancelled" ? (
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

      <ol className="w-full flex items-center lg:hidden">
        <li className="w-full flex items-center">
          <div
            className={`w-15 h-15 rounded-full flex justify-center items-center ${
              status === "dispatched" || status === "delivered"
                ? "bg-green-400"
                : status === "queued"
                ? "bg-blue-400"
                : status === "cancelled"
                ? "bg-red-400"
                : "bg-gray-400"
            }`}
          >
            <Image
              src={
                status === "queued" || status === "cancelled"
                  ? "/queued.svg"
                  : "/completed.svg"
              }
              alt={status === "queued" ? "/queued" : "/completed.svg"}
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
          <div
            className={`w-[calc(100%-60px)] h-1 ${
              status === "dispatched" || status === "delivered"
                ? "bg-green-400"
                : status === "cancelled"
                ? "bg-red-400"
                : "bg-gray-400"
            }`}
          ></div>
        </li>
        <li className="w-full flex items-center">
          <div
            className={`w-15 h-15 rounded-full flex justify-center items-center ${
              status === "dispatched" || status === "delivered"
                ? "bg-green-400"
                : status === "cancelled"
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
              status === "delivered"
                ? "bg-green-400"
                : status === "cancelled"
                ? "bg-red-400"
                : "bg-gray-400"
            }`}
          ></div>
        </li>
        <li className="flex items-center">
          <div
            className={`w-15 h-15 rounded-full flex justify-center items-center ${
              status === "delivered"
                ? "bg-green-400"
                : status === "cancelled"
                ? "bg-red-400"
                : "bg-gray-400"
            }`}
          >
            <Image
              src={status === "cancelled" ? "/cancelled.svg" : "/delivered.svg"}
              alt={status === "cancelled" ? "/cancelled.svg" : "/delivered.svg"}
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
        </li>
      </ol>
    </>
  );
}
