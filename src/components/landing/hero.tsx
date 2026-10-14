/** @format */

import Link from "next/link";
import { ArrowRight, ArrowUp, CircleCheck, MapPin, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-sun/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-32 size-80 rounded-full bg-sage/70 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm font-medium shadow-xs">
            <Sparkles className="size-4 text-primary" />
            Your neighbourhood, in your hands
          </span>

          <h1 className="text-5xl leading-[1.05] font-bold md:text-6xl">
            Spot it. Share it.{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span
                aria-hidden
                className="absolute inset-x-[-0.15em] bottom-[0.08em] h-[0.45em] -rotate-1 rounded-full bg-sun"
              />
              <span className="relative">See it fixed.</span>
            </span>
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
            Potholes, broken streetlights, overflowing bins — flag what you see
            on your street, rally your neighbours behind it, and follow along
            until it&apos;s sorted.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="h-12 rounded-full px-6 text-base" asChild>
              <Link href="/reports/add">
                <Plus data-icon="inline-start" />
                Report an issue
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-full bg-card px-6 text-base"
              asChild
            >
              <Link href="/reports">
                Browse reports
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>

        <HeroIllustration />
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-lg">
      <div className="relative aspect-square rotate-2 overflow-hidden rounded-[2.5rem] bg-sage shadow-xl shadow-sage-foreground/10">
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 size-full text-card"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
        >
          <path d="M-20 120 C 120 90, 260 150, 420 110" strokeWidth="26" />
          <path d="M-20 290 C 140 310, 280 250, 420 300" strokeWidth="22" />
          <path d="M130 -20 C 110 140, 170 260, 140 420" strokeWidth="22" />
          <path d="M300 -20 C 320 120, 260 260, 300 420" strokeWidth="16" />
          <path
            d="M-20 120 C 120 90, 260 150, 420 110"
            strokeWidth="2"
            strokeDasharray="8 10"
            className="text-sage"
          />
        </svg>
        <div className="absolute top-[34%] left-[18%] size-14 rounded-2xl bg-sun/80" />
        <div className="absolute top-[56%] left-[48%] size-20 rounded-3xl bg-sky/80" />
        <div className="absolute top-[6%] left-[46%] size-16 rounded-2xl bg-card/70" />

        <Pin className="top-[22%] left-[30%] bg-primary" />
        <Pin className="top-[60%] left-[28%] bg-sage-foreground" />
        <Pin className="top-[42%] left-[70%] bg-primary" />
      </div>

      <div className="absolute -top-4 -left-4 flex -rotate-3 items-center gap-3 rounded-2xl border bg-card p-3 pr-4 shadow-lg sm:-left-10">
        <span className="flex size-9 items-center justify-center rounded-xl bg-sage text-sage-foreground">
          <CircleCheck className="size-5" />
        </span>
        <div className="text-sm">
          <p className="font-semibold">Streetlight repaired</p>
          <p className="text-muted-foreground">Marked fixed by the council</p>
        </div>
      </div>

      <div className="absolute -right-2 -bottom-6 flex rotate-2 items-center gap-3 rounded-2xl border bg-card p-3 pr-4 shadow-lg sm:-right-8">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <ArrowUp className="size-5" />
        </span>
        <div className="text-sm">
          <p className="font-semibold">Pothole on Park Road</p>
          <p className="text-muted-foreground">Neighbours are upvoting</p>
        </div>
      </div>
    </div>
  );
}

function Pin({ className }: { className: string }) {
  return (
    <span
      className={`absolute flex size-10 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full rounded-br-none rotate-45 text-primary-foreground shadow-md ${className}`}
    >
      <MapPin className="size-5 -rotate-45" />
    </span>
  );
}
