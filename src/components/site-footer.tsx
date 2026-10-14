/** @format */

import Link from "next/link";
import { Logo } from "@/components/logo";

const links = [
  { name: "Reports", href: "/reports" },
  { name: "Report an issue", href: "/reports/add" },
  { name: "Sign in", href: "/auth/sign" },
  { name: "Join", href: "/auth/signup" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Made by neighbours, for neighbours.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
