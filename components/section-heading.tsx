import { cn } from "@/lib/utils";

/** A section's heading, left-aligned, with an optional line under it. */
export function SectionHeading({
  title,
  lede,
  as: Heading = "h2",
  className,
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={className}>
      <Heading
        className={cn(
          Heading === "h1" ? "h-display" : "h-section",
          "max-w-[720px] text-balance",
        )}
      >
        {title}
      </Heading>
      {lede && <p className="lede mt-4 max-w-[560px] text-pretty">{lede}</p>}
    </div>
  );
}
