import { cn } from "@/lib/utils";

/**
 * The one spot of colour on the site: green while something is running,
 * a ring while it is unannounced, black once it was sold, grey once it ended.
 */
export function StatusDot({
  status,
  className,
}: {
  /** a startup status, or "active" for a job that is still going */
  status: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-2 shrink-0 rounded-full",
        status === "active" && "bg-[#16a34a]",
        status === "stealth" && "border border-foreground/50",
        status === "acquired" && "bg-foreground",
        status === "discontinued" && "bg-foreground/25",
        className,
      )}
    />
  );
}
