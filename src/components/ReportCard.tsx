/** @format */

import { Report, ReportStatus } from "@/types/api";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import UpvoteButton from "./UpvoteButton";

interface ReportCardProps {
  report: Report;
}

const getStatusBadge = (status: ReportStatus) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  switch (status) {
    case ReportStatus.PENDING:
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    case ReportStatus.IN_PROGRESS:
      return `${baseClasses} bg-blue-100 text-blue-800`;
    case ReportStatus.RESOLVED:
      return `${baseClasses} bg-green-100 text-green-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const ReportCard = ({ report }: ReportCardProps) => {
  return (
    <Link href={`/reports/${report.id}`}>
      <div className="bg-white h-full rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
        <div className="relative">
          <Image
            src={report.imageUrl}
            alt={report.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className={getStatusBadge(report.status)}>
              {report.status.replace("_", " ").toUpperCase()}
            </span>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <UpvoteButton
              reportId={report.id}
              initialUpvotes={0}
              className="px-1 py-1 rounded-full"
            />
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {report.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {report.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>#{report.id.split("-")[1]}</span>
            </div>
            <span>{formatDate(report.createdAt)}</span>
          </div>

          {report.creator && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {report.creator.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-gray-600">
                  by {report.creator.fullName}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ReportCard;
