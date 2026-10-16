import Image from "next/image";
import type { InstagramPost } from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";
import { Reveal } from "@/components/reveal";

export function InstagramGrid({ posts }: { posts: InstagramPost[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {posts.map((post, i) => (
        <Reveal key={post.id} delay={(i % 3) * 80}>
          <a
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="img-card pop aspect-square">
              <Image
                src={mediaUrl(post.mediaId)}
                alt={post.alt}
                fill
                sizes="(min-width: 640px) 330px, 45vw"
                className="object-cover"
                style={{ objectPosition: post.focus ?? undefined }}
              />
            </div>
            <p className="h-card mt-3 text-[16px]">{post.caption}</p>
            <p className="meta">
              {post.place} · {post.dateLabel}
            </p>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
