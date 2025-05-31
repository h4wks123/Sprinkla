"use server";

import { Header } from "@/components/(header)/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-full">
      <Header />
      {children}
    </main>
  );
}
