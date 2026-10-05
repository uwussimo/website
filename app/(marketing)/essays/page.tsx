import { getEssays } from "@/lib/content";
import { PostCard } from "../_components/post-card";

export default async function Essays() {
  const posts = await getEssays();

  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[760px] px-6 pt-12 sm:px-8 sm:pt-16">
      <h1 className="heading-serif mb-10">
        <em>essays</em>
      </h1>
      <div className="border-t border-foreground/20">
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
      {posts.length === 0 && <p className="meta mt-6">no essays yet.</p>}
    </main>
  );
}
