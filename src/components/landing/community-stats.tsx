/** @format */

import { ReportStatus, type Report } from "@/types/api";

export function CommunityStats({ reports }: { reports: Report[] }) {
  const stats = [
    { label: "Issues reported", value: reports.length },
    {
      label: "Fixed so far",
      value: reports.filter((r) => r.status === ReportStatus.RESOLVED).length,
    },
    {
      label: "Neighbour upvotes",
      value: reports.reduce((sum, r) => sum + r.upvotes, 0),
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4">
      <dl className="grid grid-cols-1 divide-y rounded-3xl border bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 p-6 text-center">
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="font-heading text-4xl font-bold">
              {stat.value.toLocaleString("en")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
