/** @format */

"use client";

import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CameraCaptureProps {
  onCapture: (image: string, location: { lat: number; lng: number }) => void;
  onError?: (error: string) => void;
}

const CAMERA_HEIGHT = 320;

const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  onError,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [captured, setCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showLocationFallback, setShowLocationFallback] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCapture = async () => {
    if (!webcamRef.current) return;

    setIsCapturing(true);
    setPermissionError(null);

    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        throw new Error("Failed to capture image");
      }

      // Get current location with improved error handling
      if ("geolocation" in navigator) {
        const locationOptions = {
          enableHighAccuracy: false, // Set to false for better compatibility
          timeout: 15000, // Increased timeout
          maximumAge: 300000, // 5 minutes cache
        };

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCapturedImage(imageSrc);
            onCapture(imageSrc, location);
            setCaptured(true);
            setIsCapturing(false);
          },
          (err) => {
            console.error("Location error:", err);
            let errorMsg = "Unable to get location. ";

            switch (err.code) {
              case err.PERMISSION_DENIED:
                errorMsg +=
                  "Please allow location access in your browser settings and refresh the page.";
                break;
              case err.POSITION_UNAVAILABLE:
                errorMsg +=
                  "Location services are unavailable. Please enable GPS/location services and try again.";
                break;
              case err.TIMEOUT:
                errorMsg += "Location request timed out. Please try again.";
                break;
              default:
                errorMsg +=
                  "Please ensure location services are enabled and try again.";
            }

            setLocationError(errorMsg);
            setShowLocationFallback(true);
            setIsCapturing(false);
          },
          locationOptions
        );
      } else {
        throw new Error("Geolocation is not supported by this browser");
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to capture image";
      setPermissionError(errorMsg);
      onError?.(errorMsg);
      setIsCapturing(false);
    }
  };

  const handleRetake = () => {
    setCaptured(false);
    setCapturedImage(null);
    setPermissionError(null);
    setLocationError(null);
    setShowLocationFallback(false);
  };

  const handleLocationFallback = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      // Use a default location (you can customize this)
      const defaultLocation = { lat: 0, lng: 0 };
      setCapturedImage(imageSrc);
      onCapture(imageSrc, defaultLocation);
      setCaptured(true);
      setShowLocationFallback(false);
    }
  };

  if (!mounted) {
    return (
      <div
        className="w-full bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ height: CAMERA_HEIGHT }}
      >
        <div className="text-gray-500">Loading camera...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {!captured && (
        <>
          <div
            className="w-full flex justify-center border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
            style={{ height: CAMERA_HEIGHT }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full object-cover"
              videoConstraints={{
                facingMode: "environment",
                height: CAMERA_HEIGHT,
                width: { ideal: 640 },
              }}
              style={{ height: CAMERA_HEIGHT }}
              onUserMediaError={(error) => {
                console.error("Camera error:", error);
                setPermissionError(
                  "Camera access denied. Please allow camera access and refresh the page."
                );
                onError?.(
                  "Camera access denied. Please allow camera access and refresh the page."
                );
              }}
            />
          </div>

          {permissionError && (
            <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{permissionError}</p>
            </div>
          )}

          {locationError && showLocationFallback && (
            <div className="w-full p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm mb-3">{locationError}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  onClick={handleLocationFallback}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Continue Without Location
                </Button>
                <Button
                  type="button"
                  onClick={handleCapture}
                  size="sm"
                  className="flex-1"
                >
                  Try Location Again
                </Button>
              </div>
            </div>
          )}

          {!showLocationFallback && (
            <Button
              type="button"
              onClick={handleCapture}
              disabled={isCapturing || !!permissionError}
              className="w-full sm:w-auto"
            >
              {isCapturing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                  Capturing...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Capture Photo & Location
                </>
              )}
            </Button>
          )}
        </>
      )}

      {captured && capturedImage && (
        <div className="w-full space-y-4">
          <div
            className="relative w-full border-2 border-green-300 rounded-lg overflow-hidden"
            style={{ height: CAMERA_HEIGHT }}
          >
            <Image
              src={capturedImage}
              alt="Captured"
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2">
              <Button
                type="button"
                onClick={handleRetake}
                variant="secondary"
                size="sm"
                className="bg-white/90 hover:bg-white text-gray-900"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Retake
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-green-600">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">
              Photo and location captured successfully!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
