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
  const isAuthority =
    report.creator?.role === "AUTHORITY" || report.creator?.role === "ADMIN";

  return (
    <Link href={`/reports/${report.id}`}>
      <div className="bg-white h-full rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col">
        <div className="relative h-52 shrink-0">
          <Image
            src={report.imageUrl[0] || "/placeholder.jpg"}
            alt={report.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span className={getStatusBadge(report.status)}>
              {report.status.replace("_", " ").toUpperCase()}
            </span>
            {report.category && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm border bg-slate-800 text-white border-slate-700 backdrop-blur-md">
                {report.category.replace("_", " ")}
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full px-2 py-1 shadow-sm z-10">
            <UpvoteButton
              reportId={report.id}
              initialUpvotes={report.upvotes}
              className="px-1 py-1 rounded-full"
            />
          </div>
          {/* Gradient overlay for text readability if needed, but we have image */}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {report.title}
          </h3>
          <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
            {report.description}
          </p>

          <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-medium bg-slate-100 px-2 py-1 rounded-md">
                #{report.id.split("-")[1] || report.id.slice(0, 6)}
              </span>
              <span>{formatDate(report.createdAt)}</span>
            </div>

            {report.creator && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium">
                  {report.creator.fullName}
                </span>
                {isAuthority && (
                  <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-blue-200">
                    OFFICIAL
                  </span>
                )}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isAuthority
                      ? "bg-blue-600 text-white"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {report.creator.fullName.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReportCard;
