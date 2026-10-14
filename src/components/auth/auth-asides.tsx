/** @format */

import { Camera, CircleCheck, MapPin, Users, type LucideIcon } from "lucide-react";
import { StatusLabel } from "@/components/report-card";
import { cn } from "@/lib/utils";
import { ReportStatus } from "@/types/api";

const notes: { title: string; status: ReportStatus; className: string }[] = [
  {
    title: "Streetlight out on the corner",
    status: ReportStatus.RESOLVED,
    className: "top-[24%] left-[8%] -rotate-6",
  },
  {
    title: "Bins overflowing by the market",
    status: ReportStatus.IN_PROGRESS,
    className: "top-[46%] right-[8%] rotate-3",
  },
  {
    title: "Pothole near the bus stop",
    status: ReportStatus.PENDING,
    className: "bottom-[6%] left-[16%] -rotate-2",
  },
];

export function SignInAside() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-sage">
      <p className="absolute top-10 right-10 max-w-[12ch] text-right font-heading text-3xl leading-tight font-semibold text-sage-foreground">
        Good to see you again.
      </p>
      {notes.map((note) => (
        <div
          key={note.title}
          className={cn(
            "absolute flex w-60 flex-col gap-3 rounded-2xl border bg-card p-5 shadow-lg",
            note.className,
          )}
        >
          <MapPin className="size-5 text-primary" />
          <p className="font-heading text-lg leading-snug font-semibold">
            {note.title}
          </p>
          <StatusLabel status={note.status} />
        </div>
      ))}
    </div>
  );
}

const steps: {
  title: string;
  description: string;
  icon: LucideIcon;
  className: string;
}[] = [
  {
    title: "Spot it",
    description: "Snap a photo and drop a pin.",
    icon: Camera,
    className: "bg-sun text-sun-foreground -rotate-6",
  },
  {
    title: "Rally your neighbours",
    description: "Upvotes push what matters to the top.",
    icon: Users,
    className: "bg-sky text-sky-foreground rotate-3",
  },
  {
    title: "See it fixed",
    description: "Follow every update on the timeline.",
    icon: CircleCheck,
    className: "bg-sage text-sage-foreground -rotate-3",
  },
];

export function SignUpAside() {
  return (
    <div className="relative flex flex-col gap-12 overflow-hidden rounded-[2.5rem] bg-sun p-10">
      <p className="max-w-[14ch] font-heading text-3xl leading-tight font-semibold text-sun-foreground">
        Three small steps, one better street.
      </p>
      <ol className="flex flex-col gap-5">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={cn(
              "flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-lg",
              index === 1 && "ml-8",
              index === 2 && "ml-16",
            )}
          >
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl",
                step.className,
              )}
            >
              <step.icon className="size-5" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-heading text-lg font-semibold">
                {step.title}
              </span>
              <span className="text-sm text-muted-foreground">
                {step.description}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
