/** @format */

export enum ReportStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved",
}

export type Location = [number, number];

export interface Report {
  id: string;
  title: string;
  description: string;
  image: string;
  location: Location;
  creator?: string;
  status: ReportStatus;
  upvotes: number;
  createdAt: string;
  updatedAt: string;
}
