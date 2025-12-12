/** @format */

import { getReportById, getReportActivities } from "@/actions/reports";
import ReportIssueLayout from "@/components/reports/ReportIssueLayout";
import { notFound } from "next/navigation";
import React from "react";

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage(props: ReportPageProps) {
  const params = await props.params;
  const { id } = params;

  // Parallel data fetching
  const [report, activities] = await Promise.all([
    getReportById(id),
    getReportActivities(id).catch(() => []), // Handle activities error gracefully
  ]);

  if (!report) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ReportIssueLayout
        reportId={id}
        initialReport={report}
        initialActivities={activities}
      />
    </div>
  );
}
