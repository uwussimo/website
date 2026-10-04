import type { Metadata } from "next";
import { Artifact } from "@/components/artifact";
import { StartupList } from "../_components/startup-list";

export const metadata: Metadata = {
  title: "Startups | Mukhammadyusuf Abdurakhimov",
  description:
    "Startups I've founded, built and advised: what they do, where they got to, and where they are now.",
};

export default function Startups() {
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
        <Artifact
          name="lion-clock"
          sizes="120px"
          priority
          className="hidden w-[110px] shrink-0 sm:flex"
        />
      </header>

      <StartupList />

      <p className="meta mt-16 text-center">coming soon</p>
    </main>
  );
}
