/** @format */

"use client";

import { useQuery } from "@tanstack/react-query";
import { getReportById, getReportActivities } from "@/actions/reports";
import { reportKeys } from "./useReports";

// Missing reports and auth failures won't fix themselves, so don't retry them.
const retryUnlessClientError = (failureCount: number, error: any) =>
  !(error?.status >= 400 && error?.status < 500) && failureCount < 3;

export function useReportById(id: string) {
  return useQuery({
    queryKey: reportKeys.detail(id),
    queryFn: () => getReportById(id),
    enabled: !!id,
    retry: retryUnlessClientError,
  });
}

export function useReportActivities(id: string) {
  return useQuery({
    queryKey: reportKeys.activities(id),
    queryFn: () => getReportActivities(id),
    enabled: !!id,
    retry: retryUnlessClientError,
  });
}
