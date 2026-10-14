/** @format */

import type { Metadata } from "next";
import { AddReportForm } from "@/components/add-report/add-report-form";

export const metadata: Metadata = { title: "Report an issue" };

export default function AddReportPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:py-16">
      <div className="flex max-w-2xl flex-col gap-3">
        <p className="text-sm font-semibold text-primary">Report an issue</p>
        <h1 className="text-4xl leading-[1.1] font-bold md:text-5xl">
          What did you spot?
        </h1>
        <p className="text-lg text-muted-foreground">
          Two quick steps. Your neighbours can back it and the authorities
          will see it right away.
        </p>
      </div>
      <AddReportForm />
    </div>
  );
}
