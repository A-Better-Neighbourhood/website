/** @format */

// Base API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

// Authentication Types
export interface User {
  id: string;
  fullName: string;
  address: string;
  contactNo: string;
  createdAt: string;
}

export interface AuthResponse {
  token?: string;
  user?: User;
  id?: string;
  contactNo?: string;
  fullName?: string;
  address?: string;
}

export interface SignUpRequest {
  phoneNumber: string;
  password: string;
  name: string;
  address: string;
}

export interface SignInRequest {
  phoneNumber: string;
  password: string;
}

// Issue/Report Types (using Report naming for frontend)
export enum ReportStatus {
  RESOLVED = "RESOLVED",
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
}

export interface Report {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  status: ReportStatus;
  createdAt: string;
  upvotes: number;
  creatorId: string;
  creator?: {
    id: string;
    fullName: string;
    contactNo: string;
  };
}

export interface CreateReportRequest {
  title: string;
  description: string;
  image: string; // URL or base64
  location: [number, number]; // [latitude, longitude]
}

export interface CreateReportResponse {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  status: ReportStatus;
  createdAt: string;
  creatorId: string;
}

// API Response Types
export type AuthApiResponse = ApiResponse<AuthResponse>;
export type UserProfileResponse = ApiResponse<User>;
export type ReportsListResponse = ApiResponse<Report[]>;
export type ReportDetailResponse = ApiResponse<Report>;
export type CreateReportApiResponse = ApiResponse<CreateReportResponse>;
export type ResolveReportResponse = ApiResponse<Report>;

// Health Check
export interface HealthResponse {
  status: string;
  message: string;
}
