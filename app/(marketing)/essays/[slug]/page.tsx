import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
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
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[680px] px-6 pb-24 pt-20 sm:px-8">
      <Link
        href="/essays"
        className="mb-8 inline-flex items-center gap-2 font-mono text-[13px] text-foreground/70 hover:text-foreground"
      >
        <HugeiconsIcon
          icon={ArrowLeft01Icon}
          className="size-4"
          strokeWidth={1.5}
        />
        essays
      </Link>
      <header className="mb-10">
        <p className="font-mono text-[12px] text-foreground/70">
          {post.date} · {post.readTime} read
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {post.title}
        </h1>
      </header>
      <article className="space-y-6 [&_a]:text-foreground [&_a]:underline hover:[&_a]:text-foreground/80 [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:leading-relaxed [&_p]:text-foreground/70 [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:text-foreground/70 [&_blockquote]:border-l-2 [&_blockquote]:border-foreground/10 [&_blockquote]:pl-4 [&_blockquote]:text-foreground/70 [&_blockquote]:not-italic">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
