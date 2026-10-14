/** @format */

import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CircleCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps: {
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  className: string;
}[] = [
  {
    title: "Spot it",
    description:
      "Snap a photo of the problem and drop a pin on the map. It takes less than a minute.",
    detail: "Photo, pin, a line or two",
    icon: Camera,
    className: "bg-sun text-sun-foreground -rotate-6",
  },
  {
    title: "Rally your neighbours",
    description:
      "Neighbours upvote and comment, so the issues that matter most rise to the top.",
    detail: "Upvotes and comments",
    icon: Users,
    className: "bg-sky text-sky-foreground rotate-3",
  },
  {
    title: "See it fixed",
    description:
      "Local authorities pick it up, and every update lands on the report's timeline for everyone to follow.",
    detail: "Updates on a shared timeline",
    icon: CircleCheck,
    className: "bg-sage text-sage-foreground -rotate-3",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-sm font-semibold text-primary">How it works</p>
          <h2 className="mb-5 text-4xl leading-[1.1] font-bold md:text-5xl">
            From &ldquo;someone should&rdquo; to &ldquo;someone did.&rdquo;
          </h2>
          <p className="mb-8 max-w-md text-lg text-muted-foreground">
            No forms to chase, no phone queues. Just three small steps, out in
            the open where the whole street can see.
          </p>
          <Link
            href="/reports/add"
            className="group inline-flex items-center gap-2 font-semibold text-primary"
          >
            Start with step one
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ol className="relative flex flex-col gap-4">
          <span
            aria-hidden
            className="absolute top-10 bottom-10 left-11 border-l-2 md:left-12 border-dashed border-border"
          />
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative flex gap-6 rounded-3xl p-4 transition-colors hover:bg-card md:p-5"
            >
              <span
                className={cn(
                  "relative flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-sm",
                  step.className,
                )}
              >
                <step.icon className="size-7" />
              </span>
              <div className="flex flex-col gap-2 pt-1">
                <span className="font-heading text-sm font-semibold text-muted-foreground">
                  Step {index + 1}
                </span>
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                <p className="text-sm font-medium">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
