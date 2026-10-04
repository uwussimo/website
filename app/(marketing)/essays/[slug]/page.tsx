import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Essay not found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Essay({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[760px] px-6 pt-12 sm:px-8 sm:pt-16">
      <Link
        href="/essays"
        className="meta mb-8 inline-flex items-center gap-2 hover:text-foreground"
      >
        <HugeiconsIcon
          icon={ArrowLeft01Icon}
          className="size-4"
          strokeWidth={1.5}
        />
        essays
      </Link>
      <header className="mb-10">
        <p className="meta">
          {post.date} · {post.readTime} read
        </p>
        <h1 className="heading-serif mt-3">{post.title}</h1>
      </header>
      <article className="space-y-6 text-[18px] [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-foreground/80 [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-[28px] [&_h2]:leading-tight [&_h2]:text-foreground [&_img]:my-6 [&_img]:max-w-full [&_img]:rounded-md [&_p]:leading-[1.6] [&_p]:text-foreground/85 [&_strong]:text-foreground [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:text-foreground/85 [&_blockquote]:border-l-2 [&_blockquote]:border-foreground/20 [&_blockquote]:pl-4 [&_blockquote]:font-serif [&_blockquote]:text-[20px] [&_blockquote]:text-foreground/85 [&_blockquote]:not-italic">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
