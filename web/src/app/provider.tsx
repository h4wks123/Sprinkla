"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/shadcn/sidebar";

type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <SessionProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </SessionProvider>
  );
};

export default Provider;
