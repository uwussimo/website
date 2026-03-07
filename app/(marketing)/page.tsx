import { getAllPosts } from "@/lib/blog";
import { PostCard } from "./_components/post-card";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[680px] px-6 pb-24 pt-20 sm:px-8">
      <section className="mb-20">
        <h1 className="mb-4 font-mono text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          building products
          <br />
          <span className="text-foreground/70">that people love.</span>
        </h1>
        <p className="max-w-[540px] text-[15px] leading-relaxed text-foreground/70">
          i&apos;m a builder & engineer sharing lessons from many startups i
          have founded & built, so you don&apos;t have to make the same
          mistakes.
        </p>
      </section>

      <section>
        <h2 className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
          latest
        </h2>
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
      </section>
    </main>
  );
}
