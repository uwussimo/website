"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { startups, statusLabels, type StartupStatus } from "@/lib/career";
import { StartupCard } from "./startup-card";

const STATUS_FILTERS: ("all" | StartupStatus)[] = [
  "all",
  "active",
  "stealth",
  "discontinued",
  "acquired",
];

export function StartupList() {
  const [statusFilter, setStatusFilter] = useState<"all" | StartupStatus>(
    "all",
  );

  const filteredStartups =
    statusFilter === "all"
      ? startups
      : startups.filter((s) => s.status === statusFilter);

  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        {STATUS_FILTERS.map((value) => (
          <button
            key={value}
            onClick={() => setStatusFilter(value)}
            aria-pressed={statusFilter === value}
            className={cn(
              "rounded-full px-4 py-2 text-[15px] leading-none transition-colors",
              statusFilter === value
                ? "bg-primary font-bold text-primary-foreground"
                : "text-foreground/70 hover:text-foreground",
            )}
          >
            {value === "all" ? "all" : statusLabels[value]}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {filteredStartups.map((startup) => (
          <StartupCard key={startup.name} startup={startup} />
        ))}
      </div>

      {filteredStartups.length === 0 && (
        <p className="meta py-12 text-center">no startups in this category</p>
      )}
    </>
  );
}
