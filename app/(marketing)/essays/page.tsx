import { getAllPosts } from "@/lib/blog";
import { PostCard } from "../_components/post-card";

export default function Essays() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[680px] px-6 pb-24 pt-20 sm:px-8">
      <h1 className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
        essays
      </h1>
      <div className="divide-y divide-border">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={{
              title: post.title,
              date: post.date,
              readTime: post.readTime,
              href: `/essays/${post.slug}`,
            }}
          />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="font-mono text-[13px] text-foreground/70">
          no essays yet.
        </p>
      )}
    </main>
  );
}
