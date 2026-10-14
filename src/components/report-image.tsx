/** @format */

"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

/** next/image that swaps to a placeholder if the photo can't be loaded. */
export function ReportImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
        <ImageOff className="size-8" aria-label="Photo unavailable" />
      </span>
    );
  }

  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through props
  return <Image {...props} onError={() => setFailed(true)} />;
}
