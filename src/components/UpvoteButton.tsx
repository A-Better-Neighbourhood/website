/** @format */

"use client";

import { upvoteReport } from "@/actions/reports";
import { ArrowBigUp } from "lucide-react";
import { useState } from "react";

interface UpvoteButtonProps {
  reportId: string;
  initialUpvotes: number;
  className?: string;
}

const UpvoteButton = ({
  reportId,
  initialUpvotes,
  className = "",
}: UpvoteButtonProps) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when inside a Link
    e.stopPropagation();

    if (hasUpvoted || isLoading) return;

    setIsLoading(true);
    try {
      const updatedReport = await upvoteReport(reportId);
      if (updatedReport) {
        setUpvotes(updatedReport.upvotes);
        setHasUpvoted(true);
      }
    } catch (error) {
      console.error("Failed to upvote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={hasUpvoted || isLoading}
      className={`flex items-center gap-1 transition-all duration-200 ${
        hasUpvoted
          ? "text-red-600 bg-red-50"
          : "text-gray-600 hover:text-red-500 hover:bg-red-50"
      } ${
        isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <ArrowBigUp />
      <span className="text-sm font-medium">{upvotes}</span>
      {isLoading && (
        <svg
          className="animate-spin w-3 h-3 ml-1"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default UpvoteButton;
