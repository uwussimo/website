import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

// [glow, glow, base] for each poster, cycled through
const PALETTES = [
  ["#f4a259", "#e2622a", "#7a2e3a"],
  ["#9fc76b", "#3f7d3a", "#14452f"],
  ["#f7b267", "#c2518f", "#3b2a6e"],
  ["#7fd1d8", "#2f79c2", "#173a63"],
  ["#f2c08f", "#c4521d", "#5a2412"],
  ["#c79bf2", "#5a4fcf", "#1d1b4b"],
  ["#cfe3d4", "#7d9794", "#2f4a4a"],
];

export function EssayMarquee({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="marquee-fade overflow-hidden py-6" data-marquee>
      <div
        className="flex w-max animate-marquee"
        style={{ "--marquee-duration": "60s" } as React.CSSProperties}
      >
        {[0, 1].map((set) => (
          <div
            key={set}
            className="flex shrink-0 gap-6 pr-6"
            aria-hidden={set === 1}
          >
            {posts.map((post, i) => {
              const [a, b, base] = PALETTES[i % PALETTES.length];
              return (
                <Link
                  key={post.slug}
                  href={`/essays/${post.slug}`}
                  tabIndex={set === 1 ? -1 : undefined}
                  className="poster pop flex aspect-[3/4] w-[200px] shrink-0 flex-col justify-between rounded-2xl border-[6px] border-card p-4 lowercase text-white shadow-[0_6px_24px_rgb(0_0_0/0.12)] sm:w-[230px]"
                  style={
                    {
                      "--a": a,
                      "--b": b,
                      "--base": base,
                    } as React.CSSProperties
                  }
                >
                  <span className="text-[12px] font-medium opacity-90">
                    {post.date} · {post.readTime}
                  </span>
                  <span className="line-clamp-5 font-serif text-[23px] leading-[1.05] tracking-[-0.02em] sm:text-[25px]">
                    {post.title}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
