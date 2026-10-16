import Image from "next/image";
import type { Photo } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Photos in a tidy grid of rounded cards, captions underneath. */
export function Gallery({
  photos,
  label,
  columns = 2,
  className,
}: {
  photos: Photo[];
  label: string;
  columns?: 2 | 3;
  className?: string;
}) {
  if (photos.length === 0) return null;
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2",
        className,
      )}
    >
      {photos.map(({ src, caption }) => (
        <figure key={src}>
          <div className="img-card pop aspect-[4/5]">
            <Image
              src={src}
              alt={`${label}: ${caption}`}
              fill
              sizes="(min-width: 1040px) 500px, 50vw"
              className="object-cover"
            />
          </div>
          <figcaption className="meta mt-2">{caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
