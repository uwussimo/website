import Image from "next/image";
import type { InstagramPost } from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";
import { Reveal } from "@/components/reveal";

export function InstagramGrid({ posts }: { posts: InstagramPost[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {posts.map((post, i) => (
        <Reveal key={post.id} delay={(i % 3) * 90}>
          <a
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pop group relative block aspect-square overflow-hidden rounded-2xl border-[6px] border-card bg-secondary shadow-[0_6px_24px_rgb(0_0_0/0.12)]"
          >
            <Image
              src={mediaUrl(post.mediaId)}
              alt={post.alt}
              fill
              sizes="(min-width: 640px) 240px, 45vw"
              className="object-cover"
              style={{ objectPosition: post.focus ?? undefined }}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-3 text-white">
              <p className="font-serif text-[15px] leading-[1.1] tracking-[-0.01em] sm:text-[19px]">
                {post.caption}
              </p>
              <p className="mt-1.5 text-[11px] font-medium opacity-85">
                {post.place} · {post.dateLabel}
              </p>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
