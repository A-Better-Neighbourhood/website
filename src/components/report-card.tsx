/** @format */

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ImageOff } from "lucide-react";
import { statusMeta, timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Report, ReportStatus } from "@/types/api";

export function StatusLabel({
  status,
  className,
}: {
  status: ReportStatus;
  className?: string;
}) {
  const meta = statusMeta[status];
  if (!meta) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium",
        className,
      )}
    >
      <span className={cn("size-2 rounded-[2px]", meta.marker)} />
      {meta.label}
    </span>
  );
}

type ReportCardProps = {
  report: Report;
  variant?: "default" | "featured" | "compact";
  className?: string;
};

export function ReportCard({
  report,
  variant = "default",
  className,
}: ReportCardProps) {
  const image = report.imageUrl?.[0];
  const compact = variant === "compact";
  const featured = variant === "featured";

  return (
    <Link
      href={`/reports/${report.id}`}
      className={cn(
        "group flex overflow-hidden rounded-3xl border bg-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5",
        compact ? "flex-row" : "flex-col",
        className,
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-muted",
          compact && "w-32 sm:w-40",
          !compact && (featured ? "aspect-[16/9]" : "aspect-[4/3]"),
        )}
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 66vw, 100vw"
                : compact
                  ? "160px"
                  : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full min-h-24 items-center justify-center text-muted-foreground">
            <ImageOff className="size-8" />
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col gap-2",
          compact ? "p-4" : "p-5",
          featured && "lg:p-7",
        )}
      >
        <div className="flex items-center justify-between gap-3 text-muted-foreground">
          {report.category ? (
            <span className="truncate text-xs font-semibold tracking-wide text-primary uppercase">
              {report.category.replaceAll("_", " ")}
            </span>
          ) : (
            <span />
          )}
          <StatusLabel status={report.status} className="shrink-0 text-foreground" />
        </div>
        <h3
          className={cn(
            "line-clamp-2 leading-snug font-semibold",
            featured ? "text-2xl lg:text-3xl" : compact ? "text-base" : "text-lg",
          )}
        >
          {report.title}
        </h3>
        <p
          className={cn(
            "text-sm text-muted-foreground",
            featured && "line-clamp-3 lg:text-base",
            compact && "line-clamp-2 max-lg:hidden",
            variant === "default" && "line-clamp-2",
          )}
        >
          {report.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-sm text-muted-foreground">
          <span className="truncate">
            {report.creator?.fullName ?? "A neighbour"}, {timeAgo(report.createdAt)}
          </span>
          <span className="flex shrink-0 items-center gap-1 font-medium text-foreground">
            <ArrowUp className="size-4 text-primary" />
            {report.upvotes}
          </span>
        </div>
      </div>
    </Link>
  );
}
