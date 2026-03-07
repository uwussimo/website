import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export const PostCard = ({
  post,
}: {
  post: { date: string; readTime: string; title: string; href: string };
}) => (
  <article className="group flex flex-col gap-2 py-5 md:flex-row md:items-start md:justify-between md:gap-4">
    <Link
      href={post.href}
      className="flex min-w-0 flex-1 items-center gap-2 text-[17px] font-medium leading-snug tracking-[-0.02em] text-foreground transition-colors hover:underline"
    >
      <span className="min-w-0 flex-1">{post.title}</span>
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        className="size-4 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        strokeWidth={1.5}
      />
    </Link>
    <div className="flex shrink-0 gap-4 text-right md:flex-col md:gap-0.5">
      <span className="font-mono text-[12px] text-foreground/70">
        {post.date}
      </span>
      <span className="font-mono text-[12px] text-foreground/70">
        {post.readTime} read
      </span>
    </div>
  </article>
);
