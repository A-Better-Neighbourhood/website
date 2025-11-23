/** @format */

import { CreateReportType } from "@/schemas/ReportSchema";
import {
  CreateReportRequest,
  ReportsListResponse,
  ReportDetailResponse,
  CreateReportApiResponse,
  ResolveReportResponse,
  Report,
} from "@/types/api";
import { api } from "@/lib/api";

export const getReports = async (): Promise<Report[]> => {
  try {
    const response = await api.get("/reports/");
    return (response.data as ReportsListResponse).data || [];
  } catch (error) {
    console.error("Get reports error:", error);
    throw error;
  }
};

export const getReportById = async (id: string): Promise<Report | null> => {
  try {
    const response = await api.get(`/reports/${id}`);
    return (response.data as ReportDetailResponse).data || null;
  } catch (error) {
    console.error("Get report by ID error:", error);
    throw error;
  }
};

export const getUserReports = async (): Promise<Report[]> => {
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

export const addReport = async (data: CreateReportType): Promise<Report> => {
  try {
    const requestData: CreateReportRequest = {
      title: data.title,
      description: data.description,
      image: data.image,
      location: data.location,
    };

    const response = await api.post("/reports/", requestData, {
      withCredentials: true,
    });
    const apiResponse = response.data as CreateReportApiResponse;

    // Convert API response to our Report type
    const newReport: Report = {
      id: apiResponse.data!.id,
      title: apiResponse.data!.title,
      description: apiResponse.data!.description,
      imageUrl: apiResponse.data!.imageUrl,
      latitude: apiResponse.data!.latitude,
      longitude: apiResponse.data!.longitude,
      upvotes: 0,
      status: apiResponse.data!.status,
      createdAt: apiResponse.data!.createdAt,
      creatorId: apiResponse.data!.creatorId,
    };

    return newReport;
  } catch (error) {
    console.error("Add report error:", error);
    throw error;
  }
};

export const resolveReport = async (id: string): Promise<Report> => {
  try {
    const response = await api.patch(`/reports/${id}/resolve`, {});
    return (response.data as ResolveReportResponse).data!;
  } catch (error) {
    console.error("Resolve report error:", error);
    throw error;
  }
};

// Legacy function for compatibility - will be deprecated
export const upvoteReport = async (id: string): Promise<Report | null> => {
  // This functionality doesn't exist in the backend API yet
  // Return the report without upvoting for now
  try {
    return await getReportById(id);
  } catch (error) {
    console.error("Upvote report error:", error);
    return null;
  }
};
