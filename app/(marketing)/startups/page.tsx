import type { Metadata } from "next";
import { getPolaroids, getStartups } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { StartupList } from "../_components/startup-list";

export const metadata: Metadata = {
  title: "Startups | Yusuf Abdurakhimov",
  description:
    "Startups I've founded, built and advised: what they do, where they got to, and where they are now.",
};

export default async function Startups() {
  const [startups, photos] = await Promise.all([getStartups(), getPolaroids()]);

  return (
    <main className="container-site pt-16 sm:pt-24">
      <SectionHeading
        as="h1"
        tag="Startups"
        title="Launched fast, built to last."
        lede="Everything I've founded, built or advised, from a lyceum-era edtech to a creator ecosystem for Central Asia."
        className="mb-12"
      />
      <StartupList startups={startups} photos={photos} />
    </main>
  );
}
