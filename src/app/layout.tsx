/** @format */

import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";

export const metadata: Metadata = {
  title: "A Better Neighbourhood",
  icons: "/SIH2.webp",
  description: "Empowering Communities: Report, Track, and Resolve Together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
