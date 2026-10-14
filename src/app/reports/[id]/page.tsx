/** @format */

import type { Metadata } from "next";
import { ReportDetail } from "@/components/report-detail/report-detail";
import { shortId } from "@/lib/format";

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  props: ReportPageProps,
): Promise<Metadata> {
  const { id } = await props.params;
  return { title: `Report #${shortId(id)}` };
}

export default async function ReportPage(props: ReportPageProps) {
  const { id } = await props.params;

  // Report details need the visitor's session cookie, so they load in the browser.
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <ReportDetail id={id} />
    </div>
  );
}
