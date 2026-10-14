/** @format */

import Image from "next/image";
import { assetUrl } from "@/lib/api";
import { cn } from "@/lib/utils";

/**
 * Uploads served by our own API may live on a local/private host in development,
 * which the Next image optimizer refuses to fetch, so those skip optimization.
 */
function isApiUpload(path: string) {
  return !/^https?:/.test(path);
}

export function PhotoGrid({
  images,
  alt,
  className,
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  if (!images.length) return null;

  return (
    <div
      className={cn(
        "grid gap-2",
        images.length === 1 ? "grid-cols-1" : "grid-cols-2",
        className,
      )}
    >
      {images.map((src, index) => (
        <a
          key={src}
          href={assetUrl(src)}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "relative overflow-hidden rounded-xl bg-muted",
            images.length === 1 ? "aspect-[16/9]" : "aspect-[4/3]",
            images.length === 3 && index === 0 && "col-span-2 aspect-[16/9]",
          )}
        >
          <Image
            src={assetUrl(src)}
            alt={`${alt}, photo ${index + 1}`}
            fill
            unoptimized={isApiUpload(src)}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </a>
      ))}
    </div>
  );
}
