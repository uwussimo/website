import type { Metadata } from "next";
import Link from "next/link";
import { getEssays } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Essays | Yusuf Abdurakhimov",
  description: "Essays on product, startups and the long road from Tashkent.",
};

export default async function Essays() {
  const essays = await getEssays();

  return (
    <main className="container-site pt-16 sm:pt-24">
      <SectionHeading
        as="h1"
        tag="Writing"
        title="Things I've written."
        lede="Essays on product, startups and the long road from Tashkent."
      />
      <div className="mx-auto mt-14 max-w-[760px]">
        {essays.map((essay, i) => (
          <Reveal key={essay.slug} delay={Math.min(i, 4) * 40}>
            <Link
              href={`/essays/${essay.slug}`}
              className="group flex flex-col gap-1 border-t border-border py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <span>
                <span className="h-card block">{essay.title}</span>
                {essay.description && (
                  <span className="meta mt-1 block max-w-[520px]">
                    {essay.description}
                  </span>
                )}
              </span>
              <span className="meta shrink-0">
                {essay.date} · {essay.readTime}
              </span>
            </Link>
          </Reveal>
        ))}
        {essays.length === 0 && <p className="meta">no essays yet.</p>}
      </div>
    </main>
  );
}
