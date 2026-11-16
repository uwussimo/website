import Link from "next/link";
import { formatDay } from "@/lib/career";
import type { EssayMeta } from "@/lib/content";

/** One essay in a list: title and what it argues, date at the far end. */
export function EssayRow({ essay }: { essay: EssayMeta }) {
  return (
    <Link
      href={`/essays/${essay.slug}`}
      className="flex flex-col gap-1 border-t border-border py-6 transition-colors hover:bg-surface sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
    >
      <span>
        <span className="h-card block">{essay.title}</span>
        {essay.description && (
          <span className="meta mt-1 block max-w-[520px]">
            {essay.description}
          </span>
        )}
      </span>
      <span className="meta shrink-0 tabular-nums">
        {formatDay(essay.date)} · {essay.readTime}
      </span>
    </Link>
  );
}
