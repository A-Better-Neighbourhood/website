/** @format */

export enum ReportStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
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
