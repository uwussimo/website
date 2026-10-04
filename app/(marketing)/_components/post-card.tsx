import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export const PostCard = ({
  post,
}: {
  post: { date: string; readTime: string; title: string; href: string };
}) => (
  <article className="border-b border-foreground/20">
    <Link
      href={post.href}
      className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
    >
      <span className="min-w-0 flex-1 text-[18px] font-medium leading-snug tracking-[-0.01em] text-foreground sm:text-[20px]">
        {post.title}
      </span>
      <span className="meta flex shrink-0 items-center gap-2">
        {post.date} · {post.readTime} read
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      </span>
    </Link>
  </article>
);
