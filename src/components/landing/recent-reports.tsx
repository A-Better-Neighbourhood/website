/** @format */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReportCard } from "@/components/report-card";
import { EmptyNoticeboard } from "@/components/empty-noticeboard";
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
