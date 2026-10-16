"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { statusLabels } from "@/lib/career";
import type { Startup } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { StartupCard } from "./startup-card";

const FILTERS = ["all", "active", "stealth", "discontinued", "acquired"];

export function StartupList({
  startups,
  covers,
}: {
  startups: Startup[];
  /** cover image per slug */
  covers: Record<string, string>;
}) {
  const [filter, setFilter] = useState("all");
  const shown =
    filter === "all" ? startups : startups.filter((s) => s.status === filter);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((value) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={cn(
              "rounded-full px-4 py-2 text-[14px] font-medium leading-none tracking-[-0.02em] transition-colors",
              filter === value
                ? "bg-foreground text-background"
                : "bg-surface-strong text-foreground hover:bg-[#e8e8e8]",
            )}
          >
            {value === "all" ? "All" : statusLabels[value]}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2">
        {shown.map((startup, i) => (
          <Reveal key={startup.id} delay={(i % 2) * 80}>
            <StartupCard startup={startup} cover={covers[startup.slug]} />
          </Reveal>
        ))}
      </div>
      {shown.length === 0 && (
        <p className="meta py-12 text-center">no startups in this category.</p>
      )}
    </>
  );
}
