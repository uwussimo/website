"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { statusLabels } from "@/lib/career";
import type { Photo, Startup } from "@/lib/content";
import { StatusDot } from "@/components/status-dot";
import { StartupCard } from "./startup-card";

const FILTERS = ["all", "active", "stealth", "discontinued", "acquired"];

export function StartupList({
  startups,
  photos,
}: {
  startups: Startup[];
  /** polaroids per slug */
  photos: Record<string, Photo[]>;
}) {
  const [filter, setFilter] = useState("all");
  const matching = (value: string) =>
    value === "all" ? startups : startups.filter((s) => s.status === value);
  const shown = matching(filter);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((value) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium leading-none transition-colors",
              filter === value
                ? "bg-foreground text-background"
                : "bg-surface-strong text-foreground hover:bg-[#e8e8e8]",
            )}
          >
            {value !== "all" && (
              <StatusDot
                status={value}
                // the black and grey dots need a light edge on the black pill
                className={cn(
                  filter === value &&
                    value !== "active" &&
                    "border border-background/70",
                )}
              />
            )}
            {value === "all" ? "all" : statusLabels[value]}
            <span className="tabular-nums opacity-60">
              {matching(value).length}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {shown.map((startup) => (
          <StartupCard
            key={startup.id}
            startup={startup}
            photos={photos[startup.slug]}
          />
        ))}
      </div>
      {shown.length === 0 && (
        <p className="meta py-12">no startups in this category.</p>
      )}
    </>
  );
}
