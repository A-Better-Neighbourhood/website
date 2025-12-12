/** @format */

"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useAddComment } from "@/hooks/reports/useReportMutations";

interface CommentBoxProps {
  reportId: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ reportId }) => {
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addCommentMutation = useAddComment();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && images.length === 0) return;

    setIsSubmitting(true);
    try {
      await addCommentMutation.mutateAsync({
        reportId,
        text,
        images,
      });
      setText("");
      setImages([]);
    } catch (error) {
      console.error("Failed to post comment", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">
        Add a comment
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <textarea
          className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y text-sm mb-3"
          placeholder="Leave a comment... (Markdown supported)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitting}
        />

        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== idx))}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-xs font-medium px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              disabled={isSubmitting}
            >
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Attach photos
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex items-center gap-3">
            {/* If we had close functionality, it would go here */}
            <Button
              type="submit"
              disabled={isSubmitting || (!text && images.length === 0)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-1.5 h-auto text-sm"
            >
              {isSubmitting ? "Commenting..." : "Comment"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentBox;
