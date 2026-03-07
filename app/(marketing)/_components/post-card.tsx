import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight01Icon,
  Calendar01Icon,
  ClockIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export const PostCard = ({
  post,
}: {
  post: { date: string; readTime: string; title: string; href: string };
}) => {
  return (
    <article className="group flex flex-col md:flex-row items-start justify-between gap-0 md:gap-2 py-4">
      <Link
        href={post.href}
        className={cn(buttonVariants({ variant: "link" }), "p-0 m-0")}
      >
        <span className="min-w-0 flex-1">{post.title}</span>
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          strokeWidth={2}
        />
      </Link>
      <div className="shrink-0 text-right flex flex-row md:flex-col items-start justify-between gap-2">
        <p className="text-[13px] flex items-center gap-2">
          <HugeiconsIcon
            icon={Calendar01Icon}
            className="size-4 shrink-0"
            strokeWidth={2}
          />
          <span className="text-neutral-500">{post.date}</span>
        </p>
        <p className="text-[13px] flex items-center gap-2">
          <HugeiconsIcon
            icon={ClockIcon}
            className="size-4 shrink-0"
            strokeWidth={2}
          />
          <span className="text-neutral-500">{post.readTime} read</span>
        </p>
      </div>
    </article>
  );
};
