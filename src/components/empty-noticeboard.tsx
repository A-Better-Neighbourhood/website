/** @format */

import Link from "next/link";
import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyNoticeboard() {
  return (
    <div className="grid items-center gap-10 overflow-hidden rounded-3xl border bg-card p-8 md:grid-cols-2 md:p-12">
      <div className="flex flex-col items-start gap-4">
        <h3 className="text-2xl font-semibold md:text-3xl">
          The noticeboard is empty, for now.
        </h3>
        <p className="max-w-md text-muted-foreground">
          Nobody has flagged anything yet. Be the first to pin something up
          and get your neighbours behind it.
        </p>
        <Button size="lg" asChild>
          <Link href="/reports/add">
            <Plus data-icon="inline-start" />
            Report an issue
          </Link>
        </Button>
      </div>

      <div aria-hidden className="relative mx-auto h-56 w-full max-w-sm">
        <Note className="top-4 left-2 -rotate-6 bg-sun" />
        <Note className="top-10 right-2 rotate-6 bg-sky" />
        <Note
          className="top-20 left-1/2 -translate-x-1/2 rotate-1 border-2 border-dashed border-border bg-card"
          empty
        />
      </div>
    </div>
  );
}

function Note({ className, empty }: { className: string; empty?: boolean }) {
  return (
    <div
      className={cn(
        "absolute flex h-36 w-40 flex-col gap-2 rounded-xl p-4 shadow-md",
        className,
      )}
    >
      <MapPin
        className={cn("size-5", empty ? "text-primary" : "text-foreground/40")}
      />
      {empty ? (
        <span className="mt-auto font-heading text-sm font-semibold">
          Your report here
        </span>
      ) : (
        <>
          <span className="h-2 w-24 rounded-sm bg-foreground/15" />
          <span className="h-2 w-16 rounded-sm bg-foreground/15" />
        </>
      )}
    </div>
  );
}
