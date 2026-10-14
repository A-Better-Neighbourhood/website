/** @format */

"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Copy,
  FileQuestion,
  Lock,
  RotateCcw,
  WifiOff,
} from "lucide-react";
import { StatusLabel } from "@/components/report-card";
import { CommentComposer } from "@/components/report-detail/comment-composer";
import { ReportSidebar } from "@/components/report-detail/report-sidebar";
import {
  ActivityItem,
  Timeline,
  TimelinePost,
} from "@/components/report-detail/timeline";
import { PhotoGrid } from "@/components/report-detail/photo-grid";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useReportActivities,
  useReportById,
} from "@/hooks/reports/useReportDetails";
import { useAuth } from "@/hooks/useAuth";
import { fullDate, shortId, timeAgo } from "@/lib/format";
import { ActivityType } from "@/types/api";

export function ReportDetail({ id }: { id: string }) {
  const report = useReportById(id);
  const activities = useReportActivities(id);
  const { user } = useAuth();

  if (report.isPending) return <ReportDetailSkeleton />;

  if (report.isError) {
    const status = (report.error as { status?: number }).status;
    if (status === 401 || status === 403) {
      return (
        <StateMessage
          icon={Lock}
          title="Sign in to see this report"
          description="Reports and their updates are visible to signed-in neighbours."
          action={
            <Button size="lg" asChild>
              <Link href="/auth/sign">Sign in</Link>
            </Button>
          }
        />
      );
    }
    if (status === 404) return <NotFound />;
    return (
      <StateMessage
        icon={WifiOff}
        title="We couldn't load this report"
        description="Something went wrong on our side or your connection dropped."
        action={
          <Button variant="outline" onClick={() => report.refetch()}>
            <RotateCcw data-icon="inline-start" />
            Try again
          </Button>
        }
      />
    );
  }

  if (!report.data) return <NotFound />;

  const data = report.data;
  const timeline = (activities.data ?? []).toSorted(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
  const commentCount = timeline.filter(
    (a) =>
      a.type === ActivityType.USER_COMMENTED ||
      a.type === ActivityType.AUTHORITY_COMMENTED,
  ).length;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 border-b pb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/reports" className="group font-medium hover:text-foreground">
            <span className="underline-grow">Reports</span>
          </Link>
          <ChevronRight className="size-4" />
          <span>#{shortId(data.id)}</span>
        </nav>
        <h1 className="text-3xl leading-tight font-bold md:text-4xl">
          {data.title}{" "}
          <span className="font-normal text-muted-foreground">#{shortId(data.id)}</span>
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <StatusLabel status={data.status} className="text-base font-semibold text-foreground" />
          <span>
            <span className="font-semibold text-foreground">
              {data.creator?.fullName ?? "A neighbour"}
            </span>{" "}
            reported this{" "}
            <time dateTime={data.createdAt} title={fullDate(data.createdAt)}>
              {timeAgo(data.createdAt)}
            </time>
          </span>
          <span aria-hidden>·</span>
          <span>
            {commentCount} {commentCount === 1 ? "comment" : "comments"}
          </span>
        </div>
      </header>

      {data.isDuplicate && data.originalReportId && (
        <div className="flex flex-col gap-3 rounded-2xl border bg-sky/50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-sm">
            <Copy className="mt-0.5 size-4 shrink-0 text-sky-foreground" />
            <span>
              <span className="font-semibold">This was merged into an earlier report.</span>{" "}
              Someone had already reported the same issue nearby, so updates,
              comments and upvotes happen there.
            </span>
          </p>
          <Button variant="outline" asChild>
            <Link href={`/reports/${data.originalReportId}`}>
              Go to the original
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="flex min-w-0 flex-col gap-6">
          <ReportSidebar report={data} user={user} part="top" className="mb-2 lg:hidden" />
          <Timeline>
            <TimelinePost author={data.creator} verb="reported" date={data.createdAt}>
              <p className="leading-relaxed whitespace-pre-line">{data.description}</p>
              <PhotoGrid images={data.imageUrl ?? []} alt={data.title} />
            </TimelinePost>

            {activities.isPending &&
              Array.from({ length: 2 }, (_, i) => (
                <li key={i} className="flex items-center gap-4">
                  <Skeleton className="size-10 rounded-full" />
                  <Skeleton className="h-4 w-64" />
                </li>
              ))}

            {timeline.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </Timeline>

          {activities.isError && (
            <p className="text-sm text-muted-foreground">
              We couldn&apos;t load the updates for this report.{" "}
              <button
                type="button"
                className="group font-semibold text-primary"
                onClick={() => activities.refetch()}
              >
                <span className="underline-grow">Try again</span>
              </button>
            </p>
          )}

          {!data.isDuplicate && (
            <div className="border-t pt-6">
              <CommentComposer reportId={data.id} user={user} />
            </div>
          )}

          <ReportSidebar
            report={data}
            user={user}
            part="bottom"
            className="border-t pt-6 lg:hidden"
          />
        </div>

        <ReportSidebar report={data} user={user} className="hidden lg:flex" />
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <StateMessage
      icon={FileQuestion}
      title="We couldn't find that report"
      description="It may have been removed, or the link is mistyped."
      action={
        <Button variant="outline" asChild>
          <Link href="/reports">Back to reports</Link>
        </Button>
      }
    />
  );
}

function StateMessage({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border bg-card px-6 py-20 text-center">
      <span className="flex size-14 -rotate-6 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <Icon className="size-7" />
      </span>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="max-w-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

function ReportDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 border-b pb-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="flex gap-4">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <Skeleton className="h-80 flex-1 rounded-2xl" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-11" />
          <Skeleton className="h-40" />
        </div>
      </div>
    </div>
  );
}
