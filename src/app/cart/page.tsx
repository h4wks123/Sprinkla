"use server";

import { Header } from "@/components/ui/entry/header";

const page = async () => {
  return (
    <>
      <Header />
      <main className="w-full h-full">
        <section></section>
      </main>
    </>
  );
};

export default page;