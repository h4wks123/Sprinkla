import "./globals.css";

import { ToastContainer } from "react-toastify";
import Provider from "./provider";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Provider>{children}</Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
