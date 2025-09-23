/** @format */

import { Report } from "@/types/report";
import React from "react";
import Image from "next/image";

interface ReportCardProps {
  report: Report;
}

const ReportCard = ({ report }: ReportCardProps) => {
  return (
    <div key={report.id} className="border rounded-lg overflow-clip">
      <Image
        src={report.image}
        alt={report.title}
        width={500}
        height={300}
        className="mb-2"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold">{report.title}</h3>
        <p>{report.description}</p>
        <div>
          <span className="text-sm text-gray-500">{report.status}</span>
          <span className="text-sm text-gray-500">{report.createdAt}</span>
          <span className="text-sm text-gray-500">
            Upvotes: {report.upvotes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
