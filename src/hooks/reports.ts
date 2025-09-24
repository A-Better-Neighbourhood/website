/** @format */
"use client";

import { getReports } from "@/actions/reports";
import { useQuery } from "@tanstack/react-query";

export const useReports = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      return getReports();
    },
  });
};
