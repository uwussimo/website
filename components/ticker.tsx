import { cn } from "@/lib/utils";

/**
 * A row that scrolls sideways forever. The children are rendered twice so
 * the loop is seamless; pass them with stable keys.
 */
export function Ticker({
  children,
  duration = 40,
  gap = "gap-4",
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  gap?: string;
  className?: string;
}) {
  return (
    <div className={cn("marquee-fade overflow-hidden", className)} data-marquee>
      <div
        className="flex w-max animate-marquee"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className={cn("flex shrink-0 items-center pr-4", gap)}
            aria-hidden={copy === 1}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
