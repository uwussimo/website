import Image from "next/image";
import type { InstagramPost } from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";

export function InstagramGrid({ posts }: { posts: InstagramPost[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="img-card aspect-square">
            <Image
              src={mediaUrl(post.mediaId)}
              alt={post.alt}
              fill
              sizes="(min-width: 640px) 330px, 45vw"
              className="object-cover"
              style={{ objectPosition: post.focus ?? undefined }}
            />
          </div>
          <p className="body-text mt-3 font-medium">{post.caption}</p>
          <p className="meta">
            {post.place} · {post.dateLabel}
          </p>
        </a>
      ))}
    </div>
  );
}
