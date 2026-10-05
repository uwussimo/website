import Image from "next/image";
import type { Photo } from "@/lib/content";

const TILTS = [-2, 1.5, -1, 2, -1.5, 1];

/** A scrollable row of tilted polaroids. Renders nothing without photos. */
export function Polaroids({
  photos,
  label,
}: {
  photos: Photo[];
  /** what the photos are of, for the image descriptions */
  label: string;
}) {
  if (photos.length === 0) return null;

  return (
    <div className="-mx-2 mt-5 flex gap-4 overflow-x-auto px-3 pb-4 pt-3 [scrollbar-width:none]">
      {photos.map(({ src, caption }, i) => (
        <figure
          key={src}
          className="group shrink-0"
          style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
        >
          <div className="w-28 border border-border bg-card p-1.5 pb-3 shadow-md transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl sm:w-32">
            <div className="relative aspect-[4/5] bg-secondary">
              <Image
                src={src}
                alt={`${label}: ${caption}`}
                fill
                sizes="130px"
                className="object-cover"
              />
            </div>
            <figcaption className="meta mt-1.5 truncate text-center text-[12px]">
              {caption}
            </figcaption>
          </div>
        </figure>
      ))}
    </div>
  );
}
