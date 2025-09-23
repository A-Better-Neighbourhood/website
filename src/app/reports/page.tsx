/** @format */

import { getReports } from "@/actions/reports";
import Container from "@/components/Container";
import ReportCard from "@/components/ReportCard";
import React from "react";

const ReportsPage = async () => {
  const reports = await getReports();

  return (
    <Container className="py-8">
      <h1 className="text-3xl mb-4">Reports</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </Container>
  );
};

export default ReportsPage;
