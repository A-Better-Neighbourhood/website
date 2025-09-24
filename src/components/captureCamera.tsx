"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

interface CameraCaptureProps {
  onCapture: (image: string, location: { lat: number; lng: number }) => void;
}

const CameraCaptureWithLocation: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [captured, setCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = () => {
    if (!captured && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCapturedImage(imageSrc);
          onCapture(imageSrc, location);
          setCaptured(true);
        },
        (err) => {
          console.error("Location error:", err);
          setCapturedImage(imageSrc);
          onCapture(imageSrc, { lat: 0, lng: 0 });
          setCaptured(true);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const handleRetake = () => {
    setCaptured(false);
    setCapturedImage(null);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Capture Photo</h2>
      <div className="space-y-6">
        {!captured && (
          <div className="relative">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg border-2 border-gray-200"
              videoConstraints={{ facingMode: "environment" }}
            />
            <div className="flex gap-4 mt-4 justify-center">
              <button
                type="button"
                onClick={handleRetake}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition font-semibold"
              >
                Retake Photo
              </button>
              <button
                type="button"
                onClick={handleCapture}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition font-semibold"
              >
                Capture Photo
              </button>
            </div>
          </div>
        )}

        {captured && capturedImage && (
          <div className="flex flex-col items-center space-y-4">
            <img
              src={capturedImage}
              alt="Captured"
              className="rounded-lg shadow-lg max-h-80 w-full object-contain border-2 border-gray-200"
            />
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-green-600 font-medium">Photo captured successfully!</p>
            </div>
            <button
              type="button"
              onClick={handleRetake}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition font-semibold"
            >
              Retake Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCaptureWithLocation;