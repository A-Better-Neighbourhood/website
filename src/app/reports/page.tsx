/** @format */

"use client";

import Container from "@/components/Container";
import ReportsGridWithFilters from "@/components/ReportsGridWithFilters";
import { useReports } from "@/hooks/useReports";
import { ReportStatus } from "@/types/api";
import Link from "next/link";
import React from "react";

const ReportsPage = () => {
  const { data: reports, isLoading } = useReports();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <Container className="py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Community Reports
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Together, we make our neighborhood better. Report issues, track
              progress, and see real change happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reports/add"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Report an Issue
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {isLoading ? "..." : reports?.length || 0}
            </div>
            <div className="text-gray-600">Total Reports</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {isLoading
                ? "..."
                : reports?.filter((r) => r.status === ReportStatus.RESOLVED)
                    .length || 0}
            </div>
            <div className="text-gray-600">Resolved</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {isLoading
                ? "..."
                : reports?.filter((r) => r.status === ReportStatus.IN_PROGRESS)
                    .length || 0}
            </div>
            <div className="text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {isLoading
                ? "..."
                : reports?.filter((r) => r.status === ReportStatus.PENDING)
                    .length || 0}
            </div>
            <div className="text-gray-600">Pending</div>
          </div>
        </div>

        <ReportsGridWithFilters />
      </Container>
    </div>
  );
};

export default ReportsPage;
