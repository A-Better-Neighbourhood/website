/** @format */

import { cn } from "@/lib/utils";

const SPAN = 0.004;

export function LocationMap({
  lat,
  lng,
  className,
}: {
  lat: number;
  lng: number;
  className?: string;
}) {
  const bbox = [lng - SPAN, lat - SPAN, lng + SPAN, lat + SPAN].join("%2C");

  return (
    <iframe
      title="Report location"
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={cn("aspect-[4/3] w-full rounded-xl border-0 bg-muted", className)}
    />
  );
}
