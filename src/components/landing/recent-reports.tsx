/** @format */

import Link from "next/link";
import { ArrowRight, Megaphone, Plus } from "lucide-react";
import { ReportCard } from "@/components/report-card";
import { Button } from "@/components/ui/button";
import type { Report } from "@/types/api";

export function RecentReports({ reports }: { reports: Report[] }) {
  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="mb-3 text-4xl font-bold md:text-5xl">
              Fresh from the neighbourhood
            </h2>
            <p className="text-lg text-muted-foreground">
              What your neighbours have flagged lately.
            </p>
          </div>
          {reports.length > 0 && (
            <Button
              variant="outline"
              className="h-10 self-start rounded-full bg-card px-5 sm:self-auto"
              asChild
            >
              <Link href="/reports">
                See all reports
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          )}
        </div>

        {reports.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-3xl border-2 border-dashed bg-card/60 px-6 py-16 text-center">
            <span className="flex size-14 -rotate-6 items-center justify-center rounded-2xl bg-sun text-sun-foreground">
              <Megaphone className="size-7" />
            </span>
            <h3 className="text-xl font-semibold">It&apos;s quiet out there</h3>
            <p className="max-w-sm text-muted-foreground">
              No reports yet. Be the first to flag something on your street.
            </p>
            <Button className="h-11 rounded-full px-5" asChild>
              <Link href="/reports/add">
                <Plus data-icon="inline-start" />
                Report an issue
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
