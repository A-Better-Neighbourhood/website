/** @format */

import Link from "next/link";
import { ArrowRight, MapPin, Plus } from "lucide-react";
import { ReportCard } from "@/components/report-card";
import { Button } from "@/components/ui/button";
import type { Report } from "@/types/api";

export function RecentReports({ reports }: { reports: Report[] }) {
  const [featured, ...rest] = reports;

  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold text-primary">
              On the noticeboard
            </p>
            <h2 className="text-4xl font-bold md:text-5xl">
              Fresh from the neighbourhood
            </h2>
          </div>
          {reports.length > 0 && (
            <Link
              href="/reports"
              className="group inline-flex items-center gap-2 font-semibold text-primary"
            >
              See all reports
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {featured ? (
          <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <ReportCard
              report={featured}
              variant="featured"
              className={rest.length ? undefined : "lg:col-span-2"}
            />
            {rest.length > 0 && (
              <div className="flex flex-col gap-5">
                {rest.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    variant="compact"
                    className="lg:flex-1"
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <EmptyNoticeboard />
        )}
      </div>
    </section>
  );
}

function EmptyNoticeboard() {
  return (
    <div className="grid items-center gap-10 overflow-hidden rounded-3xl border bg-card p-8 md:grid-cols-2 md:p-12">
      <div className="flex flex-col items-start gap-4">
        <h3 className="text-2xl font-semibold md:text-3xl">
          The noticeboard is empty, for now.
        </h3>
        <p className="max-w-md text-muted-foreground">
          Nobody has flagged anything yet. Be the first to pin something up
          and get your neighbours behind it.
        </p>
        <Button size="lg" asChild>
          <Link href="/reports/add">
            <Plus data-icon="inline-start" />
            Report an issue
          </Link>
        </Button>
      </div>

      <div aria-hidden className="relative mx-auto h-56 w-full max-w-sm">
        <Note className="top-4 left-2 -rotate-6 bg-sun" />
        <Note className="top-10 right-2 rotate-6 bg-sky" />
        <Note className="top-20 left-1/2 -translate-x-1/2 rotate-1 border-2 border-dashed border-border bg-card" empty />
      </div>
    </div>
  );
}

function Note({ className, empty }: { className: string; empty?: boolean }) {
  return (
    <div
      className={`absolute flex h-36 w-40 flex-col gap-2 rounded-xl p-4 shadow-md ${className}`}
    >
      <MapPin className={`size-5 ${empty ? "text-primary" : "text-foreground/40"}`} />
      {empty ? (
        <span className="mt-auto font-heading text-sm font-semibold">
          Your report here
        </span>
      ) : (
        <>
          <span className="h-2 w-24 rounded-sm bg-foreground/15" />
          <span className="h-2 w-16 rounded-sm bg-foreground/15" />
        </>
      )}
    </div>
  );
}
