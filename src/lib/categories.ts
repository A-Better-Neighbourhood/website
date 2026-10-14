/** @format */

import {
  CircleEllipsis,
  Construction,
  Droplets,
  Lightbulb,
  Trash2,
  Volume2,
  type LucideIcon,
} from "lucide-react";

/** Matches the `category` enum accepted by POST /api/reports. */
export const REPORT_CATEGORIES = [
  "ROAD_ISSUE",
  "GARBAGE",
  "STREET_LIGHT",
  "WATER_LEAK",
  "NOISE_COMPLAINT",
  "OTHER",
] as const;

export type ReportCategory = (typeof REPORT_CATEGORIES)[number];

export const categoryMeta: Record<
  ReportCategory,
  { label: string; hint: string; icon: LucideIcon }
> = {
  ROAD_ISSUE: { label: "Road issue", hint: "Potholes, broken paths", icon: Construction },
  GARBAGE: { label: "Garbage", hint: "Overflowing bins, dumping", icon: Trash2 },
  STREET_LIGHT: { label: "Street light", hint: "Out, flickering, damaged", icon: Lightbulb },
  WATER_LEAK: { label: "Water leak", hint: "Leaks, blocked drains", icon: Droplets },
  NOISE_COMPLAINT: { label: "Noise", hint: "Ongoing loud noise", icon: Volume2 },
  OTHER: { label: "Something else", hint: "Anything that needs fixing", icon: CircleEllipsis },
};

export function categoryLabel(category: string) {
  return (
    categoryMeta[category as ReportCategory]?.label ??
    category.replaceAll("_", " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())
  );
}
