import Image from "next/image";
import { cn } from "@/lib/utils";

/** A rounded photo that fills its box. */
export function Photo({
  src,
  alt,
  focus,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  /** css object-position, to keep the subject in the crop */
  focus?: string | null;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("img-card", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: focus ?? undefined }}
      />
    </div>
  );
}
