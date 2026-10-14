/** @format */

"use client";

import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  Camera,
  CameraOff,
  Loader2,
  MapPin,
  MapPinOff,
  RotateCcw,
  SwitchCamera,
} from "lucide-react";
import { LocationMap } from "@/components/location-map";
import { Button } from "@/components/ui/button";
import { getCurrentLocation, type LocationData } from "@/lib/location";
import { cn } from "@/lib/utils";

type LocationState =
  | { status: "idle" | "locating" }
  | { status: "ready"; location: LocationData }
  | { status: "error"; message: string };

/**
 * Reports must be a photo taken on the spot, pinned to where it was taken.
 * There is deliberately no upload option, and the shutter stays locked until
 * a location fix is available, so a photo can never be captured without one.
 */
export function PhotoCapture({
  image,
  location,
  onChange,
  invalid,
}: {
  image: string;
  location: [number, number];
  onChange: (image: string, location: [number, number]) => void;
  invalid?: boolean;
}) {
  const webcam = useRef<Webcam>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [geo, setGeo] = useState<LocationState>({ status: "idle" });

  const locate = useCallback(async () => {
    setGeo({ status: "locating" });
    try {
      setGeo({ status: "ready", location: await getCurrentLocation() });
    } catch (error) {
      setGeo({ status: "error", message: (error as { message: string }).message });
    }
  }, []);

  function openCamera() {
    setCameraError(false);
    setCameraReady(false);
    setCameraOn(true);
    // Fetch a fresh fix every time the camera opens, so the pin matches the photo.
    locate();
  }

  function closeCamera() {
    setCameraOn(false);
    setCameraReady(false);
  }

  function capture() {
    if (geo.status !== "ready") return;
    const shot = webcam.current?.getScreenshot();
    if (!shot) return;
    closeCamera();
    onChange(shot, [geo.location.lat, geo.location.lng]);
  }

  function retake() {
    onChange("", [0, 0]);
    openCamera();
  }

  const canCapture = cameraReady && geo.status === "ready";

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-dashed bg-muted/60",
          (image || cameraOn) && "border-solid border-transparent bg-foreground",
          invalid && !image && !cameraOn && "border-destructive/60",
        )}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- local data URL
          <img src={image} alt="Your photo of the issue" className="size-full object-cover" />
        ) : cameraOn && !cameraError ? (
          <>
            <Webcam
              ref={webcam}
              audio={false}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.85}
              forceScreenshotSourceSize
              videoConstraints={{ facingMode, width: { ideal: 1600 }, height: { ideal: 1200 } }}
              onUserMedia={() => setCameraReady(true)}
              onUserMediaError={() => {
                setCameraError(true);
                closeCamera();
              }}
              className="size-full object-cover"
            />
            {!cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center text-background/80">
                <Loader2 className="size-8 animate-spin" />
              </div>
            )}

            <div className="absolute inset-x-0 top-0 flex justify-center p-4">
              <LocationStatus geo={geo} onRetry={locate} />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-6 bg-linear-to-t from-black/60 to-transparent p-5">
              <Button
                type="button"
                variant="secondary"
                size="icon-lg"
                aria-label="Switch camera"
                onClick={() => setFacingMode((m) => (m === "environment" ? "user" : "environment"))}
              >
                <SwitchCamera />
              </Button>
              <button
                type="button"
                aria-label={canCapture ? "Take photo" : "Waiting for camera and location"}
                disabled={!canCapture}
                onClick={capture}
                className="size-16 rounded-full border-4 border-white bg-white/30 transition-colors outline-none hover:bg-white/50 focus-visible:ring-4 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-40"
              />
              <Button
                type="button"
                variant="secondary"
                size="icon-lg"
                aria-label="Close camera"
                onClick={closeCamera}
              >
                <CameraOff />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-4 p-6 text-center">
            <span className="flex size-14 -rotate-6 items-center justify-center rounded-2xl bg-sun text-sun-foreground">
              <Camera className="size-7" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="font-heading text-lg font-semibold">
                {cameraError ? "We couldn't open your camera" : "Snap the problem"}
              </p>
              <p className="max-w-xs text-sm text-muted-foreground">
                {cameraError
                  ? "Allow camera access in your browser settings, then try again. Reports need a photo taken on the spot."
                  : "Take a photo right where you are. We'll ask for your camera and location."}
              </p>
            </div>
            <Button type="button" size="lg" onClick={openCamera}>
              <Camera data-icon="inline-start" />
              {cameraError ? "Try camera again" : "Open camera"}
            </Button>
          </div>
        )}
      </div>

      {image && (
        <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="size-4 text-primary" />
              Pinned at {location[0].toFixed(5)}, {location[1].toFixed(5)}
            </p>
            <Button type="button" variant="ghost" onClick={retake}>
              <RotateCcw data-icon="inline-start" />
              Retake
            </Button>
          </div>
          <LocationMap lat={location[0]} lng={location[1]} className="aspect-[16/7]" />
        </div>
      )}
    </div>
  );
}

function LocationStatus({
  geo,
  onRetry,
}: {
  geo: LocationState;
  onRetry: () => void;
}) {
  if (geo.status === "ready") {
    return (
      <p className="flex items-center gap-2 rounded-lg bg-black/55 px-3 py-1.5 text-sm font-medium text-white backdrop-blur">
        <MapPin className="size-4" />
        Location found
      </p>
    );
  }

  if (geo.status === "error") {
    return (
      <div className="flex max-w-sm flex-col items-center gap-2 rounded-lg bg-black/70 px-4 py-3 text-center text-sm text-white backdrop-blur">
        <p className="flex items-center gap-2 font-medium">
          <MapPinOff className="size-4 shrink-0" />
          {geo.message}
        </p>
        <p className="text-white/75">Reports need your location before you can take the photo.</p>
        <Button type="button" variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <p className="flex items-center gap-2 rounded-lg bg-black/55 px-3 py-1.5 text-sm font-medium text-white backdrop-blur">
      <Loader2 className="size-4 animate-spin" />
      Finding your location...
    </p>
  );
}
