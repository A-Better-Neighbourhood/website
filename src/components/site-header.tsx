/** @format */

"use client";

import Link from "next/link";
import { Menu, Plus } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";

const navigation = [
  { name: "Reports", href: "/reports" },
  { name: "How it works", href: "/#how-it-works" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function SiteHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Avatar className="hidden md:flex">
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                {initials(user.fullName)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <Link href="/auth/sign">Sign in</Link>
            </Button>
          )}
          <Button className="hidden sm:inline-flex" asChild>
            <Link href="/reports/add">
              <Plus data-icon="inline-start" />
              Report an issue
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="gap-6">
              <SheetHeader>
                <SheetTitle className="font-heading text-lg">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navigation.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="rounded-xl px-3 py-2.5 text-base font-medium hover:bg-muted"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <SheetClose asChild>
                  <Button size="lg" asChild>
                    <Link href="/reports/add">
                      <Plus data-icon="inline-start" />
                      Report an issue
                    </Link>
                  </Button>
                </SheetClose>
                {!user && (
                  <SheetClose asChild>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/auth/sign">Sign in</Link>
                    </Button>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
