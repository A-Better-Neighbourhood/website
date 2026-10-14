/** @format */

import {
  ArrowUp,
  CircleCheck,
  Copy,
  RefreshCw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { StatusLabel } from "@/components/report-card";
import { PhotoGrid } from "@/components/report-detail/photo-grid";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fullDate, initials, timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  ActivityType,
  ActorType,
  type Creator,
  type ReportActivity,
} from "@/types/api";

/** The vertical rail every timeline entry hangs off. */
export function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <ol className="relative flex flex-col gap-6 before:absolute before:top-0 before:bottom-0 before:left-5 before:w-px before:bg-border">
      {children}
    </ol>
  );
}

function Time({ date }: { date: string }) {
  return (
    <time dateTime={date} title={fullDate(date)}>
      {timeAgo(date)}
    </time>
  );
}

function AuthorAvatar({
  person,
  authority,
}: {
  person: Creator | null;
  authority?: boolean;
}) {
  return (
    <Avatar className="relative z-10 size-10 shrink-0 ring-4 ring-background">
      <AvatarFallback
        className={cn(
          "font-semibold",
          authority
            ? "bg-sky text-sky-foreground"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        {person ? initials(person.fullName) : "?"}
      </AvatarFallback>
    </Avatar>
  );
}

/** A post with a header bar, like a GitHub issue body or comment. */
export function TimelinePost({
  author,
  authority,
  verb,
  date,
  children,
}: {
  author: Creator | null;
  authority?: boolean;
  verb: string;
  date: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <AuthorAvatar person={author} authority={authority} />
      <div
        className={cn(
          "min-w-0 flex-1 overflow-hidden rounded-2xl border bg-card",
          authority && "border-sky-foreground/25",
        )}
      >
        <div
          className={cn(
            "flex flex-wrap items-center gap-x-1.5 gap-y-1 border-b px-5 py-3 text-sm text-muted-foreground",
            authority ? "border-sky-foreground/20 bg-sky/60" : "bg-muted/50",
          )}
        >
          <span className="font-semibold text-foreground">
            {author?.fullName ?? "A neighbour"}
          </span>
          {authority && (
            <span className="inline-flex items-center gap-1 font-medium text-sky-foreground">
              <ShieldCheck className="size-4" />
              Local authority
            </span>
          )}
          <span>
            {verb} <Time date={date} />
          </span>
        </div>
        <div className="flex flex-col gap-4 px-5 py-4">{children}</div>
      </div>
    </li>
  );
}

const eventIcons: Partial<Record<ActivityType, { icon: LucideIcon; className: string }>> = {
  [ActivityType.STATUS_UPDATED]: { icon: RefreshCw, className: "bg-sky text-sky-foreground" },
  [ActivityType.MARKED_RESOLVED]: { icon: CircleCheck, className: "bg-sage text-sage-foreground" },
  [ActivityType.UPVOTE_MILESTONE]: { icon: ArrowUp, className: "bg-primary text-primary-foreground" },
  [ActivityType.DUPLICATE_MERGED]: { icon: Copy, className: "bg-muted text-muted-foreground" },
  [ActivityType.MARKED_AS_DUPLICATE]: { icon: Copy, className: "bg-muted text-muted-foreground" },
};

function EventRow({
  activity,
  children,
}: {
  activity: ReportActivity;
  children: React.ReactNode;
}) {
  const meta = eventIcons[activity.type] ?? eventIcons[ActivityType.DUPLICATE_MERGED]!;
  return (
    <li className="flex items-center gap-4 py-1">
      <span className="flex w-10 shrink-0 justify-center">
        <span
          className={cn(
            "relative z-10 flex size-8 items-center justify-center rounded-lg ring-4 ring-background",
            meta.className,
          )}
        >
          <meta.icon className="size-4" />
        </span>
      </span>
      <p className="text-sm text-muted-foreground">
        {children} <Time date={activity.createdAt} />
      </p>
    </li>
  );
}

function Actor({ activity }: { activity: ReportActivity }) {
  return (
    <span className="font-semibold text-foreground">
      {activity.createdBy?.fullName ??
        (activity.actorType === ActorType.SYSTEM ? "ABN" : "Someone")}
    </span>
  );
}

export function ActivityItem({ activity }: { activity: ReportActivity }) {
  switch (activity.type) {
    case ActivityType.USER_COMMENTED:
    case ActivityType.AUTHORITY_COMMENTED:
      return (
        <TimelinePost
          author={activity.createdBy}
          authority={activity.type === ActivityType.AUTHORITY_COMMENTED}
          verb="commented"
          date={activity.createdAt}
        >
          {activity.content && (
            <p className="leading-relaxed whitespace-pre-line">{activity.content}</p>
          )}
          <PhotoGrid
            images={activity.images ?? []}
            alt="Photo attached to comment"
            className="max-w-md"
          />
        </TimelinePost>
      );

    case ActivityType.STATUS_UPDATED:
      return (
        <EventRow activity={activity}>
          <Actor activity={activity} /> changed the status
          {activity.oldStatus && (
            <>
              {" "}from <StatusLabel status={activity.oldStatus} className="align-middle text-foreground" />
            </>
          )}
          {activity.newStatus && (
            <>
              {" "}to <StatusLabel status={activity.newStatus} className="align-middle text-foreground" />
            </>
          )}
        </EventRow>
      );

    case ActivityType.MARKED_RESOLVED:
      return (
        <EventRow activity={activity}>
          <Actor activity={activity} /> marked this as fixed
        </EventRow>
      );

    case ActivityType.UPVOTE_MILESTONE: {
      const count = activity.content.match(/\d+/)?.[0];
      return (
        <EventRow activity={activity}>
          {count ? (
            <>
              Neighbours pushed this past{" "}
              <span className="font-semibold text-foreground">{count} upvotes</span>
            </>
          ) : (
            activity.content
          )}
        </EventRow>
      );
    }

    case ActivityType.DUPLICATE_MERGED:
      return (
        <EventRow activity={activity}>
          A duplicate report was merged into this one
        </EventRow>
      );

    case ActivityType.MARKED_AS_DUPLICATE:
      return (
        <EventRow activity={activity}>This was marked as a duplicate</EventRow>
      );

    case ActivityType.REPORT_CREATED:
      // The opening post already covers creation.
      return null;

    default:
      return <EventRow activity={activity}>{activity.content}</EventRow>;
  }
}
