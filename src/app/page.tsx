/** @format */
"use client";

import Container from "@/components/Container";
import ReportCard from "@/components/ReportCard";
import { useReports } from "@/hooks/reports/useReports";
import { ReportStatus } from "@/types/api";
import Link from "next/link";

export default function Home() {
  const { data: reports } = useReports();

  if (!reports) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading reports...</p>
      </div>
    );
  }

  const recentReports = reports.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-900"></div>
        <Container className="py-24 lg:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Community Updates
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white tracking-tight">
              Building a{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Better
              </span>
              <br />
              Neighbourhood Together
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Report issues, track progress, and see real change happen in your
              community. Every voice matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link
                href="/reports/add"
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-900/20 inline-flex items-center justify-center gap-2"
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
              <Link
                href="/reports"
                className="bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-700 transition-all duration-300 inline-flex items-center justify-center gap-2"
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
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                View Reports
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  {reports.length}
                </div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                  Total Reports
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  {
                    reports.filter((r) => r.status === ReportStatus.PENDING)
                      .length
                  }
                </div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                  Active Issues
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  {reports.reduce((sum, r) => sum + r.upvotes, 0)}
                </div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                  Upvotes
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  100%
                </div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                  Community Driven
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple steps to make a difference in your community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-100 transition-colors">
                <svg
                  className="w-10 h-10 text-emerald-600"
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
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Report
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Spot an issue? Take a photo, add details, and pin the location.
                Your report helps identify problems that need attention.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Engage
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Community members upvote important reports, share experiences,
                and track progress together as a unified voice.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 transition-colors">
                <svg
                  className="w-10 h-10 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Resolve
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Local authorities and community leaders take action based on
                reports, creating visible improvements in your neighborhood.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Recent Reports */}
      <section className="py-24 bg-slate-50">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Recent Reports
              </h2>
              <p className="text-xl text-slate-600">
                See what your neighbors are reporting
              </p>
            </div>
            <Link
              href="/reports"
              className="hidden sm:flex bg-white text-emerald-600 border border-emerald-200 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-medium items-center gap-2"
            >
              View All Reports
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>

          <div className="text-center sm:hidden">
            <Link
              href="/reports"
              className="bg-white text-emerald-600 border border-emerald-200 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-medium inline-flex items-center gap-2"
            >
              View All Reports
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-10 text-emerald-100 leading-relaxed">
              Join thousands of neighbors working together to improve our
              community. Your voice matters, and together we can create lasting
              change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reports/add"
                className="bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2"
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
                Submit Your First Report
              </Link>
              <Link
                href="/auth/sign"
                className="border-2 border-emerald-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-800 transition-all duration-300 inline-flex items-center justify-center gap-2"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Join the Community
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
