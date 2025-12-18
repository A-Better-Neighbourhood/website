/** @format */

import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

const nunitoSans = Nunito_Sans({ variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ABN - Home",
  icons: "/SIH2.webp",
  description: "Empowering Communities: Report, Track, and Resolve Together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body className={`${nunitoSans.variable} antialiased`}>
        <ReactQueryProvider>
          <Toaster richColors />
          <Navbar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
