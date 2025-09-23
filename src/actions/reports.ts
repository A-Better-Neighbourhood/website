/** @format */

import { mockReports } from "@/mock/reports";
import { CreateReportType } from "@/schemas/ReportSchema";
import { Report, ReportStatus } from "@/types/report";

export const getReports = async () => {
  return mockReports;
};

export const getReportById = async (id: string) => {
  return mockReports.find((report) => report.id === id);
};

export const addReport = async (data: CreateReportType) => {
  const newReport: Report = {
    id: String(mockReports.length + 1),
    title: data.title,
    description: data.description,
    image: data.image,
    location: data.location,
    creator: data.creator,
    status: ReportStatus.PENDING,
    upvotes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockReports.push(newReport);
  return newReport;
};

export const upvoteReport = async (id: string) => {
  const report = mockReports.find((report) => report.id === id);
  if (report) {
    report.upvotes += 1;
  }
  return report;
};
