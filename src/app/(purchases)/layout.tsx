"use server";

import { Header } from "@/components/ui/entry/header";
import { PurchasesHeader } from "@/components/ui/entry/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-full">
      <Header />
      <PurchasesHeader />
      <section className="relative bg-white w-[90%] max-w-[1640px] mx-auto mt-[4rem]">
        {children}
      </section>
    </main>
  );
}
