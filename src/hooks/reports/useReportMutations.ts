/** @format */

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addReport,
  resolveReport,
  upvoteReport,
  addComment,
} from "@/actions/reports";
import { CreateReportType } from "@/schemas/ReportSchema";
import { reportKeys } from "./useReports";

export function useCreateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReportType) => addReport(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
      queryClient.invalidateQueries({ queryKey: reportKeys.user() });
    },
  });
}

export function useResolveReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resolveReport(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: reportKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: reportKeys.activities(id) });
      queryClient.invalidateQueries({ queryKey: reportKeys.lists() });
    },
  });
}

export function useUpvoteReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => upvoteReport(id),
    onSuccess: (_, id) => {
      // Optimistically we could update cache, but for now invalidate
      queryClient.invalidateQueries({ queryKey: reportKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: reportKeys.activities(id) }); // Milestones might appear
    },
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reportId,
      text,
      images,
    }: {
      reportId: string;
      text: string;
      images?: string[];
    }) => addComment(reportId, text, images),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: reportKeys.activities(variables.reportId),
      });
    },
  });
}
