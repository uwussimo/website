import type { Metadata } from "next";
import { getEssays } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { EssayRow } from "../_components/essay-row";

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
        title="essays"
        lede="On product, startups and the long road from Tashkent."
      />
      <div className="mt-10 border-b border-border">
        {essays.map((essay) => (
          <EssayRow key={essay.slug} essay={essay} />
        ))}
        {essays.length === 0 && <p className="meta py-6">no essays yet.</p>}
      </div>
    </main>
  );
}
