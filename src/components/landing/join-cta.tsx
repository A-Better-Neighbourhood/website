/** @format */

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function JoinCta() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-center text-primary-foreground md:px-16 md:py-20">
          <div
            aria-hidden
            className="absolute -top-16 -left-16 size-56 rounded-full bg-primary-foreground/10"
          />
          <div
            aria-hidden
            className="absolute -right-10 -bottom-20 size-72 rounded-full bg-primary-foreground/10"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-4xl font-bold md:text-5xl">
              Your street is better with you on it.
            </h2>
            <p className="text-lg text-primary-foreground/85">
              Join your neighbours, back the issues you care about, and help
              make where you live a little better every week.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                className="h-12 rounded-full bg-background px-6 text-base text-foreground hover:bg-background/90"
                asChild
              >
                <Link href="/auth/signup">Join your neighbours</Link>
              </Button>
              <Button
                variant="ghost"
                className="h-12 rounded-full px-6 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link href="/reports/add">Report an issue</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
