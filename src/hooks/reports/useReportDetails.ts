/** @format */

"use client";

import { useQuery } from "@tanstack/react-query";
import { getReportById, getReportActivities } from "@/actions/reports";
import { reportKeys } from "./useReports";

export function useReportById(id: string) {
  return useQuery({
    queryKey: reportKeys.detail(id),
    queryFn: () => getReportById(id),
    enabled: !!id,
  });
}

export function useReportActivities(id: string) {
  return useQuery({
    queryKey: reportKeys.activities(id),
    queryFn: () => getReportActivities(id),
    enabled: !!id,
  });
}
