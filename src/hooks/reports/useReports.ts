/** @format */

"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getReports,
  getUserReports,
  getUnresolvedReports,
  getUserResolvedReports,
  getUserUnresolvedReports,
} from "@/actions/reports";

// Query Keys
export const reportKeys = {
  all: ["reports"] as const,
  lists: () => [...reportKeys.all, "list"] as const,
  list: (filters: string) => [...reportKeys.lists(), filters] as const,
  details: () => [...reportKeys.all, "detail"] as const,
  detail: (id: string) => [...reportKeys.details(), id] as const,
  activities: (id: string) => [...reportKeys.detail(id), "activities"] as const,
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
