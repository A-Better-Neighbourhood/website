/** @format */

import React from "react";
import Container from "./Container";
import Link from "next/link";

export const navigation = [
  {
    name: "Reports",
    href: "/reports",
  },
  {
    name: "Add Report",
    href: "/reports/add",
  },
];

const Navbar = () => {
  return (
    <header className="w-full h-16 border-b flex">
      <Container className="flex items-center justify-between w-full">
        <nav>Logo</nav>
        <nav className="flex gap-4">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="hover:underline">
              {item.name}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
