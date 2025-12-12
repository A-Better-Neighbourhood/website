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
  const baseClasses =
    "px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm border";
  switch (status) {
    case ReportStatus.PENDING:
      return `${baseClasses} bg-amber-50 text-amber-700 border-amber-200`;
    case ReportStatus.IN_PROGRESS:
      return `${baseClasses} bg-blue-50 text-blue-700 border-blue-200`;
    case ReportStatus.RESOLVED:
      return `${baseClasses} bg-emerald-50 text-emerald-700 border-emerald-200`;
    default:
      return `${baseClasses} bg-slate-50 text-slate-700 border-slate-200`;
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
      <div className="bg-white h-full rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
        <div className="relative">
          <Image
            src={report.imageUrl[0] || "/placeholder.jpg"}
            alt={report.title}
            width={400}
            height={250}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className={getStatusBadge(report.status)}>
              {report.status.replace("_", " ").toUpperCase()}
            </span>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full px-2 py-1 shadow-sm">
            <UpvoteButton
              reportId={report.id}
              initialUpvotes={0}
              className="px-1 py-1 rounded-full"
            />
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {report.title}
          </h3>
          <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">
            {report.description}
          </p>

          <div className="flex items-center justify-between text-xs text-slate-500">
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
              <span className="font-medium">#{report.id.split("-")[1]}</span>
            </div>
            <span>{formatDate(report.createdAt)}</span>
          </div>

          {report.creator && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">
                    {report.creator.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-slate-600 font-medium">
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
