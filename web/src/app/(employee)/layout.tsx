"use server";

import { Header } from "@/components/ui/entry/header";
import Footer from "@/components/ui/entry/footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-full">
      <Header />
      <section className="relative bg-white  w-[90%] max-w-[1640px] mx-auto border-2 border-secondary-dark rounded-lg my-30">
        {children}
      </section>
      <Footer />
    </main>
  );
}
