import type { Metadata } from "next";
import { getPolaroids, getStartups } from "@/lib/content";
import { StartupList } from "../_components/startup-list";

export const metadata: Metadata = {
  title: "Startups | Mukhammadyusuf Abdurakhimov",
  description:
    "Startups I've founded, built and advised: what they do, where they got to, and where they are now.",
};

export default async function Startups() {
  const [startups, photos] = await Promise.all([getStartups(), getPolaroids()]);

  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[760px] px-6 pt-12 sm:px-8 sm:pt-16">
      <header className="mb-10 flex items-center justify-between gap-8">
        <div>
          <h1 className="heading-serif">
            startups <em>i&apos;ve founded & built</em>
          </h1>
          <p className="lead mt-6">
            i help startups to launch fast and reach the market quickly.
          </p>
        </div>
      </header>

      <StartupList startups={startups} photos={photos} />

      <p className="meta mt-16 text-center">coming soon</p>
    </main>
  );
}
