import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/** A grey tag above a big headline, centred by default like the reference. */
export function SectionHeading({
  tag,
  title,
  lede,
  align = "center",
  as: Heading = "h2",
  className,
}: {
  tag?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {tag && <span className="tag">{tag}</span>}
      <Heading
        className={cn(
          Heading === "h1" ? "h-display" : "h-section",
          "max-w-[720px] text-balance",
        )}
      >
        {title}
      </Heading>
      {lede && <p className="lede max-w-[560px] text-pretty">{lede}</p>}
    </Reveal>
  );
}
