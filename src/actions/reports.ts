/** @format */

import { CreateReportType } from "@/schemas/ReportSchema";
import {
  CreateReportRequest,
  ReportsListResponse,
  ReportDetailResponse,
  CreateReportApiResponse,
  ResolveReportResponse,
  Report as ApiReport,
  Report,
  ReportActivitiesResponse,
  ReportActivity,
  AddCommentRequest,
  AddCommentApiResponse,
  UpvoteReportApiResponse,
  UserRole,
} from "@/types/api";
import { api } from "@/lib/api";
import { mockApi, USE_MOCKS } from "@/mocks/reports";

export const getReports = async (): Promise<Report[]> => {
  if (USE_MOCKS) return mockApi.getReports();
  try {
    const response = await api.get("/reports");
    return (response.data as ReportsListResponse).data || [];
  } catch (error) {
    console.error("Get reports error:", error);
    throw error;
  }
};

export const getReportById = async (id: string): Promise<Report | null> => {
  if (USE_MOCKS) return mockApi.getReportById(id);
  try {
    const response = await api.get(`/reports/${id}`);
    return (response.data as ReportDetailResponse).data || null;
  } catch (error) {
    console.error("Get report by ID error:", error);
    throw error;
  }
};

export const getReportActivities = async (
  id: string
): Promise<ReportActivity[]> => {
  if (USE_MOCKS) return mockApi.getReportActivities(id);
  try {
    const response = await api.get(`/reports/${id}/activities`);
    return (response.data as ReportActivitiesResponse).data || [];
  } catch (error) {
    console.error("Get report activities error:", error);
    throw error;
  }
};

export const getUserReports = async (): Promise<Report[]> => {
  if (USE_MOCKS) return mockApi.getUserReports();
  try {
    const response = await api.get("/reports/user");
    return (response.data as ReportsListResponse).data || [];
  } catch (error) {
    console.error("Get user reports error:", error);
    throw error;
  }
};

export const getUnresolvedReports = async (): Promise<Report[]> => {
  try {
    const response = await api.get("/reports/unresolved");
    return (response.data as ReportsListResponse).data || [];
  } catch (error) {
    console.error("Get unresolved reports error:", error);
    throw error;
  }
};

export const getUserResolvedReports = async (): Promise<Report[]> => {
  try {
    const response = await api.get("/reports/user/resolved");
    return (response.data as ReportsListResponse).data || [];
  } catch (error) {
    console.error("Get user resolved reports error:", error);
    throw error;
  }
};

export const getUserUnresolvedReports = async (): Promise<Report[]> => {
  try {
    const response = await api.get("/reports/user/unresolved");
    return (response.data as ReportsListResponse).data || [];
  } catch (error) {
    console.error("Get user unresolved reports error:", error);
    throw error;
  }
};

export interface CreatedReport {
  report: Report;
  /** True when the API matched an existing report nearby and merged this one into it. */
  merged: boolean;
}

export const addReport = async (
  data: CreateReportType
): Promise<CreatedReport> => {
  if (USE_MOCKS) return mockApi.create(data);
  try {
    const requestData: CreateReportRequest = {
      title: data.title,
      description: data.description,
      image: data.image,
      location: data.location,
      // Required by the API, but the server replaces it with the category its image model predicts.
      category: "OTHER",
    };

    const response = await api.post("/reports/", requestData, {
      withCredentials: true,
    });
    const { report: created, deduplication } = (
      response.data as CreateReportApiResponse
    ).data!;

    return {
      merged: deduplication?.merged ?? false,
      report: {
        id: created.id,
        title: created.title,
        description: created.description,
        imageUrl: created.imageUrl,
        latitude: created.latitude,
        longitude: created.longitude,
        category: created.category,
        upvotes: 0,
        status: created.status,
        duplicateCount: 0,
        createdAt: created.createdAt,
        creatorId: created.creatorId,
        creator: { id: created.creatorId, fullName: "You", role: UserRole.USER },
      },
    };
  } catch (error) {
    console.error("Add report error:", error);
    throw error;
  }
};

export const resolveReport = async (id: string): Promise<Report> => {
  if (USE_MOCKS) return mockApi.resolve(id);
  try {
    const response = await api.patch(`/reports/${id}/resolve`, {});
    return (response.data as ResolveReportResponse).data!;
  } catch (error) {
    console.error("Resolve report error:", error);
    throw error;
  }
};

export const upvoteReport = async (id: string): Promise<void> => {
  if (USE_MOCKS) return mockApi.upvote(id);
  try {
    await api.post(`/reports/${id}/upvote`);
  } catch (error) {
    console.error("Upvote report error:", error);
    throw error;
  }
};

export const addComment = async (
  reportId: string,
  text: string,
  images: string[] = []
): Promise<ReportActivity> => {
  if (USE_MOCKS) return mockApi.addComment(reportId, text, images);
  try {
    const requestData: AddCommentRequest = {
      text,
      images,
    };
    const response = await api.post(
      `/reports/${reportId}/comments`,
      requestData
    );
    return (response.data as AddCommentApiResponse).data!;
  } catch (error) {
    console.error("Add comment error:", error);
    throw error;
  }
};
