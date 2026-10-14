/** @format */

import { ReportStatus } from "@/types/api";

const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
];

export function timeAgo(date: string) {
  const seconds = (new Date(date).getTime() - Date.now()) / 1000;
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) {
      return relativeTime.format(Math.round(seconds / size), unit);
    }
  }
  return "just now";
}

export const statusMeta: Record<
  ReportStatus,
  { label: string; marker: string }
> = {
  [ReportStatus.PENDING]: {
    label: "Open",
    marker: "bg-chart-3",
  },
  [ReportStatus.IN_PROGRESS]: {
    label: "In progress",
    marker: "bg-chart-4",
  },
  [ReportStatus.RESOLVED]: {
    label: "Fixed",
    marker: "bg-chart-2",
  },
  [ReportStatus.ARCHIVED]: {
    label: "Archived",
    marker: "bg-muted-foreground",
  },
};
