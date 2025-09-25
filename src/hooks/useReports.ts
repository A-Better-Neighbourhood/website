/** @format */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getReports,
  getReportById,
  getUserReports,
  getUnresolvedReports,
  getUserResolvedReports,
  getUserUnresolvedReports,
  addReport,
  resolveReport,
} from "@/actions/reports";
import { CreateReportType } from "@/schemas/ReportSchema";

// Query Keys
export const reportKeys = {
  all: ["reports"] as const,
  lists: () => [...reportKeys.all, "list"] as const,
  list: (filters: string) => [...reportKeys.lists(), filters] as const,
  details: () => [...reportKeys.all, "detail"] as const,
  detail: (id: string) => [...reportKeys.details(), id] as const,
  user: () => [...reportKeys.all, "user"] as const,
  userList: (filters: string) => [...reportKeys.user(), filters] as const,
};

// List Hooks
export function useReports() {
  return useQuery({
    queryKey: reportKeys.list("all"),
    queryFn: getReports,
  });
}

export function useUnresolvedReports() {
  return useQuery({
    queryKey: reportKeys.list("unresolved"),
    queryFn: getUnresolvedReports,
  });
}

export function useUserReports() {
  return useQuery({
    queryKey: reportKeys.userList("all"),
    queryFn: getUserReports,
  });
}

export function useUserResolvedReports() {
  return useQuery({
    queryKey: reportKeys.userList("resolved"),
    queryFn: getUserResolvedReports,
  });
}

export function useUserUnresolvedReports() {
  return useQuery({
    queryKey: reportKeys.userList("unresolved"),
    queryFn: getUserUnresolvedReports,
  });
}

// Detail Hook
export function useReportById(id: string) {
  return useQuery({
    queryKey: reportKeys.detail(id),
    queryFn: () => getReportById(id),
    enabled: !!id,
  });
}

// Mutation Hooks
export function useCreateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReportType) => addReport(data),
    onSuccess: () => {
      // Invalidate and refetch report lists
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reportKeys.user() });
    },
  });
}

export function useResolveReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resolveReport(id),
    onSuccess: (data, id) => {
      // Update the specific report in cache
      queryClient.setQueryData(reportKeys.detail(id), data);

      // Invalidate relevant lists
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reportKeys.user() });
    },
  });
}

// Utility hooks
export function useInvalidateReports() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () =>
      queryClient.invalidateQueries({ queryKey: reportKeys.all }),
    invalidateLists: () =>
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() }),
    invalidateUserReports: () =>
      queryClient.invalidateQueries({ queryKey: reportKeys.user() }),
    invalidateReport: (id: string) =>
      queryClient.invalidateQueries({ queryKey: reportKeys.detail(id) }),
  };
}
