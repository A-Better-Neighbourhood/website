/** @format */

import { getReportById } from "@/actions/reports";
import { notFound } from "next/navigation";

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage(props: ReportPageProps) {
  const { id } = await props.params;
  const report = await getReportById(id);

  if (!report) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-2xl font-semibold">{report.title}</h1>
    </main>
  );
}
