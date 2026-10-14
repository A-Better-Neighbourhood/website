/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUp,
  Check,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { LocationMap } from "@/components/location-map";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUpvoteReport } from "@/hooks/reports/useReportMutations";
import { categoryLabel } from "@/lib/categories";
import { getErrorMessage } from "@/lib/errors";
import { fullDate, statusMeta } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ReportStatus, type Report, type User } from "@/types/api";

const stages = [
  {
    status: ReportStatus.PENDING,
    label: "Reported",
    hint: "Waiting for the authorities",
  },
  {
    status: ReportStatus.IN_PROGRESS,
    label: "In progress",
    hint: "Someone is working on it",
  },
  {
    status: ReportStatus.RESOLVED,
    label: "Fixed",
    hint: "Sorted, thanks to you all",
  },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-sans text-sm font-semibold tracking-normal text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ProgressTracker({ status }: { status: ReportStatus }) {
  if (status === ReportStatus.ARCHIVED) {
    return (
      <p className="text-sm text-muted-foreground">
        This report has been archived.
      </p>
    );
  }
  const current = stages.findIndex((stage) => stage.status === status);

  return (
    <ol className="flex flex-col">
      {stages.map((stage, index) => {
        const done = index < current || status === ReportStatus.RESOLVED;
        const active = index === current;
        return (
          <li key={stage.status} className="relative flex gap-3 pb-5 last:pb-0">
            {index < stages.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "absolute top-7 bottom-1 left-3 w-px",
                  index < current ? "bg-primary" : "bg-border",
                )}
              />
            )}
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-md border-2",
                done && "border-primary bg-primary text-primary-foreground",
                active && !done && "border-primary bg-primary/10",
                !done && !active && "border-border",
              )}
            >
              {done ? (
                <Check className="size-3.5" />
              ) : (
                active && (
                  <span
                    className={cn(
                      "size-2 rounded-[2px]",
                      statusMeta[stage.status].marker,
                    )}
                  />
                )
              )}
            </span>
            <div className="flex flex-col">
              <span
                className={cn(
                  "text-sm font-semibold",
                  !done && !active && "text-muted-foreground",
                )}
              >
                {stage.label}
              </span>
              {active && (
                <span className="text-sm text-muted-foreground">
                  {stage.hint}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * "top" holds the actions people come for (upvote, progress), "bottom" the reference info.
 * Desktop shows both in the sidebar; mobile puts them either side of the timeline.
 */
export function ReportSidebar({
  report,
  user,
  part = "all",
  className,
}: {
  report: Report;
  user: User | undefined;
  part?: "all" | "top" | "bottom";
  className?: string;
}) {
  const showTop = part !== "bottom";
  const showBottom = part !== "top";
  const router = useRouter();
  const upvote = useUpvoteReport();
  // The API doesn't say whether the viewer has upvoted, so remember it for this visit.
  const [upvoted, setUpvoted] = useState(false);
  const liked = report.hasLiked || upvoted;
  const mapsUrl = `https://www.openstreetmap.org/?mlat=${report.latitude}&mlon=${report.longitude}#map=18/${report.latitude}/${report.longitude}`;

  async function handleUpvote() {
    if (!user) {
      router.push("/auth/sign");
      return;
    }
    try {
      await upvote.mutateAsync(report.id);
      setUpvoted(true);
    } catch (error) {
      const message = getErrorMessage(error);
      if (/already upvoted/i.test(message)) {
        setUpvoted(true);
        toast.info("You've already upvoted this one.");
      } else {
        toast.error(message);
      }
    }
  }

  return (
    <aside className={cn("flex flex-col gap-6", className)}>
      {showTop && (
        <>
          <div className="flex flex-col gap-2">
            <Button
              size="lg"
              variant={liked ? "secondary" : "default"}
              disabled={liked || upvote.isPending}
              onClick={handleUpvote}
            >
              {upvote.isPending ? (
                <Loader2 data-icon="inline-start" className="animate-spin" />
              ) : liked ? (
                <Check data-icon="inline-start" />
              ) : (
                <ArrowUp data-icon="inline-start" />
              )}
              {liked ? "Upvoted" : "Upvote"}
              <span className="tabular-nums opacity-80">{report.upvotes}</span>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Upvotes help the authorities see what matters most.
            </p>
          </div>

          <Separator />

          <Section title="Progress">
            <ProgressTracker status={report.status} />
          </Section>
        </>
      )}

      {showTop && showBottom && <Separator />}

      {showBottom && (
        <>
          <Section title="Location">
            <LocationMap lat={report.latitude} lng={report.longitude} />
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <span className="underline-grow">Open in maps</span>
              <ExternalLink className="size-3.5" />
            </a>
          </Section>

          <Separator />

          <Section title="Details">
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              {report.category && (
                <>
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium">
                    {categoryLabel(report.category)}
                  </dd>
                </>
              )}
              <dt className="text-muted-foreground">Reported by</dt>
              <dd className="font-medium">
                {report.creator?.fullName ?? "A neighbour"}
              </dd>
              <dt className="text-muted-foreground">Reported on</dt>
              <dd className="font-medium">{fullDate(report.createdAt)}</dd>
              {report.duplicateCount > 0 && (
                <>
                  <dt className="text-muted-foreground">Also reported</dt>
                  <dd className="font-medium">
                    {report.duplicateCount} more{" "}
                    {report.duplicateCount === 1 ? "time" : "times"}
                  </dd>
                </>
              )}
            </dl>
          </Section>
        </>
      )}
    </aside>
  );
}
