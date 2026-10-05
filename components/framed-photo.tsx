import Image from "next/image";
import { cn } from "@/lib/utils";

/** A photo in a white frame with a soft shadow, cropped to its box. */
export function FramedPhoto({
  src,
  alt,
  focus = "50% 50%",
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  /** css object-position, to keep the subject in the crop */
  focus?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-2xl border-[6px] border-card bg-secondary shadow-[0_6px_24px_rgb(0_0_0/0.12)]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: focus }}
      />
    </div>
  );
}
