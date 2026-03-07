import { PostCard } from "./_components/post-card";

const posts = [
  {
    date: "24.03.2026",
    readTime: "10 min",
    title: "How we drove 100K users to our app for free.",
    href: "/",
  },
  {
    date: "20.03.2026",
    readTime: "5 min",
    title: "Building in public: lessons from 6 months.",
    href: "/",
  },
  {
    date: "15.03.2026",
    readTime: "8 min",
    title: "Why we switched from REST to GraphQL.",
    href: "/",
  },
];

export default function Home() {
  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[680px] px-6 pb-24 pt-16 sm:px-8">
      <h2 className="mb-4 text-2xl font-bold uppercase tracking-wider text-neutral-900">
        About me
      </h2>
      <div className="divide-y divide-black/[0.06]">
        {posts.map((post) => (
          <PostCard key={`${post.date}-${post.title}`} post={post} />
        ))}
      </div>
    </main>
  );
}
