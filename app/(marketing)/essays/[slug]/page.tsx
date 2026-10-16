import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { Metadata } from "next";
import { getEssay, getEssays } from "@/lib/content";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const essays = await getEssays();
  return essays.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getEssay(slug);
  if (!post) return { title: "Essay not found" };
  return {
    title: post.title,
    description: post.description ?? undefined,
  };
}

export default async function Essay({ params }: Props) {
  const { slug } = await params;
  const post = await getEssay(slug);
  if (!post) notFound();

  return (
    <main className="container-site pt-12 sm:pt-20">
      <article className="mx-auto max-w-[720px]">
        <Link
          href="/essays"
          className="meta mb-8 inline-flex items-center gap-1 hover:text-foreground"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          All essays
        </Link>
        <header className="mb-10">
          <h1 className="h-section text-balance">{post.title}</h1>
          <p className="meta mt-5">
            {post.date} · {post.readTime} read
          </p>
        </header>
        <div className="space-y-6 text-[18px] leading-[1.6] tracking-[-0.01em] text-foreground/85 [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-foreground/70 [&_blockquote]:border-l-2 [&_blockquote]:border-foreground/20 [&_blockquote]:pl-5 [&_blockquote]:text-[20px] [&_blockquote]:font-medium [&_blockquote]:tracking-[-0.02em] [&_blockquote]:text-foreground [&_h2]:mt-12 [&_h2]:text-[28px] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.03em] [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:text-[22px] [&_h3]:font-semibold [&_h3]:tracking-[-0.03em] [&_h3]:text-foreground [&_img]:my-6 [&_img]:max-w-full [&_img]:rounded-2xl [&_strong]:text-foreground [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-1">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
