"use client";

import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { Chip as ChipData } from "@/lib/admin/resources";
import { cn } from "@/lib/utils";
import { reorder } from "../actions";
import { Chip } from "./chip";
import { Sortable } from "./sortable";
import { Thumb } from "./thumb";
import { iconButton } from "./ui";

export type ListRow = {
  id: string;
  href: string;
  title: string;
  subtitle?: string;
  chip: ChipData | null;
  thumb: string | null;
};

/** The rows of one section, draggable into order when the site orders them. */
export function RecordList({
  resourceKey,
  rows,
  reorderable,
}: {
  resourceKey: string;
  rows: ListRow[];
  reorderable: boolean;
}) {
  const [, start] = useTransition();
  const row = (r: ListRow) => (
    <div
      className={cn(
        "flex items-center gap-4 border-b border-border py-3 pr-3 hover:bg-surface",
        reorderable ? "pl-10" : "pl-4",
      )}
    >
      <Link href={r.href} className="flex min-w-0 flex-1 items-center gap-4">
        <Thumb mediaId={r.thumb} title={r.title} />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="truncate text-[15px] font-medium">{r.title}</span>
            {r.chip && <Chip chip={r.chip} />}
          </span>
          {r.subtitle && (
            <span className="block truncate text-[13px] text-foreground/55">
              {r.subtitle}
            </span>
          )}
        </span>
      </Link>
      <Link href={r.href} className={iconButton} aria-label={`Edit ${r.title}`}>
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="size-4"
          strokeWidth={2}
        />
      </Link>
    </div>
  );

  if (!reorderable)
    return (
      <div>
        {rows.map((r) => (
          <div key={r.id}>{row(r)}</div>
        ))}
      </div>
    );

  return (
    <Sortable
      items={rows}
      render={row}
      onReorder={(ids) =>
        start(async () => {
          await reorder(resourceKey, ids);
          toast.success("Order saved.");
        })
      }
    />
  );
}
