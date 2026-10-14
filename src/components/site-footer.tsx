/** @format */

import Link from "next/link";
import { Logo } from "@/components/logo";

const groups = [
  {
    title: "Explore",
    links: [
      { name: "Reports", href: "/reports" },
      { name: "How it works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { name: "Report an issue", href: "/reports/add" },
      { name: "Join", href: "/auth/signup" },
      { name: "Sign in", href: "/auth/sign" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="font-heading text-2xl leading-snug font-semibold tracking-tight">
              Made by neighbours, for neighbours.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <p className="text-sm font-semibold">{group.title}</p>
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-12 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} A Better Neighbourhood
        </p>
      </div>
    </footer>
  );
}
