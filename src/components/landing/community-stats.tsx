/** @format */

import { ReportStatus, type Report } from "@/types/api";
import { cn } from "@/lib/utils";

function Figure({ value, className }: { value: number; className: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-[-0.1em] bottom-[0.1em] h-[0.4em] -rotate-1 rounded-sm",
          className,
        )}
      />
      <span className="relative">{value.toLocaleString("en")}</span>
    </span>
  );
}

export function CommunityStats({ reports }: { reports: Report[] }) {
  const fixed = reports.filter((r) => r.status === ReportStatus.RESOLVED).length;
  const upvotes = reports.reduce((sum, r) => sum + r.upvotes, 0);

  return (
    <section className="border-y border-border/60 bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <p className="mb-4 text-sm font-semibold text-primary">
          The neighbourhood so far
        </p>
        <p className="max-w-4xl font-heading text-3xl leading-snug font-semibold tracking-tight md:text-4xl md:leading-snug">
          Neighbours have flagged <Figure value={reports.length} className="bg-sun" />{" "}
          {reports.length === 1 ? "issue" : "issues"}, seen{" "}
          <Figure value={fixed} className="bg-sage" /> fixed, and backed each
          other with <Figure value={upvotes} className="bg-sky" />{" "}
          {upvotes === 1 ? "upvote" : "upvotes"}.
        </p>
      </div>
    </section>
  );
}
