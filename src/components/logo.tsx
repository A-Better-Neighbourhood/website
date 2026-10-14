/** @format */

import Link from "next/link";
import { HouseHeart } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 font-heading", className)}
    >
      <span className="flex size-9 -rotate-6 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <HouseHeart className="size-5" />
      </span>
      <span className="text-lg leading-none font-semibold tracking-tight">
        A Better
        <span className="text-primary"> Neighbourhood</span>
      </span>
    </Link>
  );
}
