/** @format */

import { getReportById } from "@/actions/reports";
import Container from "@/components/Container";
import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import UpvoteButton from "@/components/UpvoteButton";
import { ReportStatus } from "@/types/report";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

const getStatusBadge = (status: ReportStatus) => {
  const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
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
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ReportPage = async ({ params }: ReportPageProps) => {
  const { id } = await params;
  const report = await getReportById(id);

  if (!report) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link
                href="/reports"
                className="hover:text-blue-600 transition-colors"
              >
                Reports
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li className="text-gray-900 font-medium">
              #{report.id.split("-")[1]}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={getStatusBadge(report.status)}>
                      {report.status.replace("_", " ").toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">
                      #{report.id.split("-")[1]}
                    </span>
                  </div>
                  <UpvoteButton
                    reportId={report.id}
                    initialUpvotes={report.upvotes}
                    className="px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-red-300"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {report.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Reported {formatDate(report.createdAt)}</span>
                  {report.creator && (
                    <div className="flex items-center gap-2">
                      <span>by</span>
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {report.creator.fullName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-gray-700">
                          {report.creator.fullName}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <Image
                  src={report.imageUrl}
                  alt={report.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>

              {/* Description */}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {report.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    Share Report
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
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
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Add Update
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
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
                        d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"
                      />
                    </svg>
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Location
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 text-gray-400"
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
                  <span>
                    Lat: {report.latitude}, Lng: {report.longitude}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg h-fit flex items-center justify-center text-gray-500">
                  <Map
                    className="w-full"
                    zoom={5000}
                    lat={report.latitude}
                    lng={report.longitude}
                  />
                </div>
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${report.latitude},${report.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    View on Map
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Report Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Upvotes</span>
                  <span className="font-semibold text-gray-900">
                    {report.upvotes}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className="font-semibold text-gray-900 capitalize">
                    {report.status.replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Updated</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Related Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Related
              </h3>
              <div className="space-y-3">
                <Link
                  href="/reports"
                  className="block w-full px-4 py-2 text-center bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                >
                  View All Reports
                </Link>
                <Link
                  href="/reports/add"
                  className="block w-full px-4 py-2 text-center bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
                >
                  Report New Issue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ReportPage;
