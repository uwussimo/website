import type { Chip as ChipData } from "@/lib/admin/resources";
import { cn } from "@/lib/utils";

export function Chip({ chip }: { chip: ChipData }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium leading-none",
        chip.tone === "live" && "bg-[#e6f6ea] text-[#1d7a3a]",
        chip.tone === "warn" && "bg-[#fff3d6] text-[#8a5a00]",
        chip.tone === "quiet" && "bg-surface-strong text-foreground/60",
      )}
    >
      {chip.tone === "live" && (
        <span className="size-1.5 rounded-full bg-current" />
      )}
      {chip.label}
    </span>
  );
}
