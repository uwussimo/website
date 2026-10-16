import Image from "next/image";
import { mediaUrl } from "@/lib/media-url";
import { cn } from "@/lib/utils";

/** A list thumbnail: the stored image, or the first letter of the title. */
export function Thumb({
  mediaId,
  title,
  className,
}: {
  mediaId: string | null;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-strong text-[16px] font-semibold text-foreground/60",
        className,
      )}
    >
      {mediaId ? (
        <Image
          src={mediaUrl(mediaId)}
          alt=""
          fill
          sizes="48px"
          className="object-cover"
        />
      ) : (
        title.charAt(0).toUpperCase()
      )}
    </div>
  );
}
