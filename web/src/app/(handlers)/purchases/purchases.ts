"use client";

import React from "react";
import { SetStateAction } from "react";

export async function SSEPurchases(
  orderID: number | undefined,
  setStatus: React.Dispatch<SetStateAction<string | undefined>>
) {
  const eventSource = new EventSource(
    `${process.env.NEXT_PUBLIC_SSE_DOMAIN}/events/${orderID}`
  );

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setStatus(data.status);
    console.log("Received status update:");
  };

  return () => eventSource.close();
}
