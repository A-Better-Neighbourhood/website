/** @format */

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ImageOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { statusMeta, timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Report } from "@/types/api";

export function ReportCard({ report }: { report: Report }) {
  const status = statusMeta[report.status];
  const image = report.imageUrl?.[0];

  return (
    <Link
      href={`/reports/${report.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border bg-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <ImageOff className="size-8" />
          </div>
        )}
        {status && (
          <Badge
            className={cn(
              "absolute top-3 left-3 rounded-full border-0 px-2.5 shadow-sm",
              status.className,
            )}
          >
            {status.label}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {report.category && (
          <span className="text-xs font-medium tracking-wide text-primary uppercase">
            {report.category.replaceAll("_", " ")}
          </span>
        )}
        <h3 className="line-clamp-2 text-lg leading-snug font-semibold">
          {report.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {report.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3 text-sm text-muted-foreground">
          <span>
            {report.creator?.fullName ?? "A neighbour"} ·{" "}
            {timeAgo(report.createdAt)}
          </span>
          <span className="flex items-center gap-1 font-medium text-foreground">
            <ArrowUp className="size-4 text-primary" />
            {report.upvotes}
          </span>
        </div>
      </div>
    </Link>
  );
}
