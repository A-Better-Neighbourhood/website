/** @format */

import React from "react";
import {
  ActivityType,
  ActorType,
  ReportActivity,
  ReportStatus,
} from "@/types/api";
import Image from "next/image";

interface TimelineItemProps {
  activity: ReportActivity;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusColor = (status: ReportStatus) => {
  switch (status) {
    case ReportStatus.RESOLVED:
      return "text-green-700 bg-green-100 border-green-200";
    case ReportStatus.IN_PROGRESS:
      return "text-blue-700 bg-blue-100 border-blue-200";
    default:
      return "text-yellow-700 bg-yellow-100 border-yellow-200";
  }
};

const TimelineItem: React.FC<TimelineItemProps> = ({ activity }) => {
  const isAuthority = activity.actorType === ActorType.AUTHORITY;
  const isSystem = activity.actorType === ActorType.SYSTEM;
  const isComment =
    activity.type === ActivityType.USER_COMMENTED ||
    activity.type === ActivityType.AUTHORITY_COMMENTED;

  // Render System/Status Events (Milestones, Status Updates, etc.)
  if (!isComment) {
    let icon = (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );

    if (activity.type === ActivityType.STATUS_UPDATED) {
      icon = (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      );
    } else if (activity.type === ActivityType.UPVOTE_MILESTONE) {
      icon = (
        <svg
          className="w-4 h-4 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    } else if (activity.type === ActivityType.MARKED_RESOLVED) {
      icon = (
        <svg
          className="w-4 h-4 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    }

    return (
      <div className="flex items-center gap-3 py-3 pl-4 relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 ml-4 -z-10"></div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-200 z-10">
          {icon}
        </div>
        <div className="flex-1 text-sm text-gray-600">
          <span className="font-medium text-gray-900">
            {activity.createdBy?.fullName || "System"}
          </span>{" "}
          {activity.content}
          <span className="text-gray-400 ml-2 text-xs">
            {formatDate(activity.createdAt)}
          </span>
        </div>
      </div>
    );
  }

  // Render Comments
  return (
    <div className="flex gap-4 py-4 relative group">
      {/* Timeline connector line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 ml-4 -z-10"></div>

      {/* Avatar */}
      <div className="flex-shrink-0 z-10">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
            isAuthority
              ? "bg-blue-600 border-blue-200 text-white"
              : "bg-gray-100 border-white text-gray-600"
          }`}
        >
          <span className="font-medium text-sm">
            {activity.createdBy?.fullName?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>
      </div>

      {/* Comment Body */}
      <div
        className={`flex-1 rounded-xl border-2 ${
          isAuthority
            ? "border-blue-600 bg-blue-50/40"
            : "border-gray-200 bg-white"
        } overflow-hidden shadow-sm transition-all`}
      >
        {/* Header */}
        <div
          className={`px-4 py-2 border-b flex items-center justify-between ${
            isAuthority
              ? "bg-blue-100/50 border-blue-200"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`font-semibold ${
                isAuthority ? "text-blue-900" : "text-gray-900"
              }`}
            >
              {activity.createdBy?.fullName}
            </span>
            {isAuthority && (
              <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-sm">
                Official
              </span>
            )}
            <span className="text-gray-500">
              commented on {formatDate(activity.createdAt)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
          {activity.content}
        </div>

        {/* Images */}
        {activity.images && activity.images.length > 0 && (
          <div className="px-4 pb-4 flex flex-wrap gap-2">
            {activity.images.map((img, idx) => (
              <div
                key={idx}
                className="relative h-24 w-24 rounded-lg overflow-hidden border border-gray-200"
              >
                <Image
                  src={img}
                  alt={`Attachment ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
