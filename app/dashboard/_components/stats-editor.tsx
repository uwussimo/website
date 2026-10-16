"use client";

import { useState } from "react";
import type { Stat } from "@/lib/settings";
import { inputClass, labelClass } from "./ui";

/** The three numbers on the home page, as value + label pairs. */
export function StatsEditor({
  name,
  value,
  onChange,
}: {
  name: string;
  value: Stat[];
  onChange?: () => void;
}) {
  const [stats, setStats] = useState<Stat[]>(
    value.length ? value : [{ value: "", label: "" }],
  );
  const edit = (i: number, key: keyof Stat, text: string) => {
    const next = stats.map((s, j) => (j === i ? { ...s, [key]: text } : s));
    setStats(next);
    onChange?.();
  };
  return (
    <div className="space-y-3">
      <input
        type="hidden"
        name={name}
        value={JSON.stringify(stats.filter((s) => s.value && s.label))}
      />
      {stats.map((stat, i) => (
        <div key={i} className="grid grid-cols-[120px_1fr] gap-3">
          <div>
            {i === 0 && <span className={labelClass}>Number</span>}
            <input
              value={stat.value}
              onChange={(e) => edit(i, "value", e.target.value)}
              placeholder="13.7k+"
              className={inputClass}
            />
          </div>
          <div>
            {i === 0 && <span className={labelClass}>Label</span>}
            <input
              value={stat.label}
              onChange={(e) => edit(i, "label", e.target.value)}
              placeholder="learners on 42.uz"
              className={inputClass}
            />
          </div>
        </div>
      ))}
      <div className="flex gap-3 text-[13px] font-medium">
        {stats.length < 4 && (
          <button
            type="button"
            onClick={() => setStats([...stats, { value: "", label: "" }])}
            className="text-foreground/60 hover:text-foreground"
          >
            + Add a number
          </button>
        )}
        {stats.length > 1 && (
          <button
            type="button"
            onClick={() => {
              setStats(stats.slice(0, -1));
              onChange?.();
            }}
            className="text-foreground/60 hover:text-foreground"
          >
            Remove the last one
          </button>
        )}
      </div>
    </div>
  );
}
