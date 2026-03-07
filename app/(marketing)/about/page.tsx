import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About me | Mukhammadyusuf Abdurakhimov",
  description:
    "Product-oriented software engineer. I write about product development, startups, and building things people love.",
};

export default function About() {
  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[680px] px-6 pb-24 pt-20 sm:px-8">
      <section className="mb-12">
        <h1 className="mb-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
          about me
        </h1>
        <p className="mb-8 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          i write about product development & startups.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/talks"
            className="font-mono text-[13px] text-foreground hover:underline"
          >
            my talks
          </Link>
          <Link
            href="/essays"
            className="font-mono text-[13px] text-foreground hover:underline"
          >
            read essays
          </Link>
        </div>
      </section>

      <article>
        <p className="text-[15px] leading-relaxed text-foreground/70">
          i grew up around people who were curious about technology. that
          curiosity stuck. i started building things early websites, small apps,
          ideas that didn&apos;t always work. some did.
        </p>
        <p className="mt-6 text-[15px] leading-relaxed text-foreground/70">
          after school i co-founded an edtech startup. we reached thousands of
          students. we won something. more importantly, i learned what it means
          to ship, to fail, and to try again.
        </p>
        <p className="mt-6 text-[15px] leading-relaxed text-foreground/70">
          i&apos;ve worked at scale, built s-commerce platforms, moved across
          continents. these days you might find me organising events, streaming
          on a quiet sunday, or speaking at a tech conference. i like to learn,
          share, and sometimes inspire.
        </p>
        <p className="mt-6 text-[15px] leading-relaxed text-foreground/70">
          i believe the best products come from teams who care about their
          users. i&apos;m that guy who likes creating and telling stories about
          things people actually want to use.
        </p>
      </article>

      <section className="mt-20 overflow-hidden pb-4" data-marquee>
        <div className="flex animate-marquee gap-4">
          {[...Array(2)].map((_, set) => (
            <div key={set} className="flex shrink-0 gap-4 p-6">
              {[
                "Istanbul",
                "Tashkent",
                "San Francisco",
                "Seattle",
                "Omaha",
                "Los Angeles",
              ].map((caption, i) => (
                <div
                  key={`${set}-${caption}`}
                  className="group shrink-0"
                  style={{
                    transform: `rotate(${[-2, 1, -1, 2, -1, 1][i]}deg)`,
                  }}
                >
                  <div className="w-36 border-4 border-border bg-secondary p-2 pb-6 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:rotate-0 group-hover:shadow-xl sm:w-40">
                    <div className="aspect-[4/5] bg-background" />
                    <p className="mt-2 text-center font-mono text-[11px] text-foreground/70">
                      {caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
