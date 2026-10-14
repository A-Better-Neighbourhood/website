/** @format */

import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ReportGridSkeleton } from "@/components/report-card-skeleton";
import { ReportsBrowser } from "@/components/reports/reports-browser";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Reports" };

export default function ReportsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:py-16">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex max-w-2xl flex-col gap-3">
          <p className="text-sm font-semibold text-primary">Reports</p>
          <h1 className="text-4xl leading-[1.1] font-bold md:text-5xl">
            What&apos;s happening on your street
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything your neighbours have flagged, from fresh reports to
            the ones already sorted.
          </p>
        </div>
        <Button size="lg" className="self-start md:self-auto" asChild>
          <Link href="/reports/add">
            <Plus data-icon="inline-start" />
            Report an issue
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ReportGridSkeleton />}>
        <ReportsBrowser />
      </Suspense>
    </div>
  );
}
