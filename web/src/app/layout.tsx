import "./globals.css";

import { ToastContainer } from "react-toastify";
import Provider from "./provider";
import { Inter } from "next/font/google";
import { AppSidebar } from "@/components/ui/sidebar/appSidebar";

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
        <Provider>
          <AppSidebar />
          {children}
        </Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
