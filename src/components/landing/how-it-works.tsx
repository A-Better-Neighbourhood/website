/** @format */

import { Camera, CircleCheck, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const steps: {
  title: string;
  description: string;
  icon: LucideIcon;
  className: string;
}[] = [
  {
    title: "Spot it",
    description:
      "Snap a photo of the problem and drop a pin. It takes less than a minute.",
    icon: Camera,
    className: "bg-sun text-sun-foreground",
  },
  {
    title: "Rally your neighbours",
    description:
      "Neighbours upvote and comment, so the issues that matter most rise to the top.",
    icon: Users,
    className: "bg-sky text-sky-foreground",
  },
  {
    title: "See it fixed",
    description:
      "Local authorities pick it up and every update lands on the report's timeline.",
    icon: CircleCheck,
    className: "bg-sage text-sage-foreground",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three small steps from &ldquo;someone should fix that&rdquo; to
            &ldquo;someone did.&rdquo;
          </p>
        </div>

        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative flex flex-col gap-4 rounded-3xl border bg-card p-7"
            >
              <span className="absolute top-6 right-7 font-heading text-5xl font-bold text-muted">
                {index + 1}
              </span>
              <span
                className={cn(
                  "flex size-14 items-center justify-center rounded-2xl",
                  index % 2 ? "rotate-3" : "-rotate-3",
                  step.className,
                )}
              >
                <step.icon className="size-7" />
              </span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
