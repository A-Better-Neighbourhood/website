/** @format */

import Link from "next/link";
import { ArrowRight, Camera, HandHeart, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const paths: {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: LucideIcon;
  className: string;
  iconClassName: string;
}[] = [
  {
    title: "Seen something on your street?",
    description:
      "A broken light, a blocked drain, a pothole you keep swerving around. Put it on the map.",
    action: "Report an issue",
    href: "/reports/add",
    icon: Camera,
    className: "bg-primary text-primary-foreground",
    iconClassName: "bg-primary-foreground/15 -rotate-6",
  },
  {
    title: "New around here?",
    description:
      "Join your neighbours, back the issues you care about, and follow them until they're sorted.",
    action: "Join your neighbours",
    href: "/auth/signup",
    icon: HandHeart,
    className: "bg-sage text-sage-foreground",
    iconClassName: "bg-card/60 rotate-3",
  },
];

export function JoinCta() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm font-semibold text-primary">Get involved</p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Your street is better with you on it.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {paths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className={cn(
                "group relative flex min-h-72 flex-col gap-4 overflow-hidden rounded-[2rem] p-8 md:p-10",
                path.className,
              )}
            >
              <span
                className={cn(
                  "flex size-14 items-center justify-center rounded-2xl",
                  path.iconClassName,
                )}
              >
                <path.icon className="size-7" />
              </span>
              <h3 className="mt-auto text-2xl font-semibold md:text-3xl">
                {path.title}
              </h3>
              <p className="max-w-md opacity-85">{path.description}</p>
              <span className="inline-flex items-center gap-2 font-semibold">
                <span className="underline-grow">{path.action}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
