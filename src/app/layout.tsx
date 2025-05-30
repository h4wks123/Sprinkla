import "./globals.css";

import { ToastContainer } from "react-toastify";
import Provider from "./provider";
import Footer from "@/components/(footer)/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
          <Footer />
        </Provider>
        <ToastContainer />
      </body>
    </html>
  );
}
