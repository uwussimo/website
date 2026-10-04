import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About me | Mukhammadyusuf Abdurakhimov",
  description:
    "Product-oriented software engineer. I write about product development, startups, and building things people love.",
};

export default function About() {
  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[760px] px-6 pt-12 sm:px-8 sm:pt-16">
      <section className="mb-12">
        <p className="meta mb-3">about me</p>
        <h1 className="heading-serif mb-8">
          i write about <em>product development & startups.</em>
        </h1>
        <div className="flex flex-wrap gap-6 text-[18px] font-bold">
          <Link href="/work" className="link-dashed">
            where i&apos;ve worked
          </Link>
          <Link href="/essays" className="link-dashed">
            read essays
          </Link>
          <Link href="/talks" className="link-dashed">
            my talks
          </Link>
        </div>
      </section>

      <article>
        <p className="lead">
          i grew up around people who were curious about technology. that
          curiosity stuck. i started building things early websites, small apps,
          ideas that didn&apos;t always work. some did.
        </p>
        <p className="lead mt-6">
          after school i co-founded an edtech startup. we reached thousands of
          students. we won something. more importantly, i learned what it means
          to ship, to fail, and to try again.
        </p>
        <p className="lead mt-6">
          i&apos;ve worked at scale, built s-commerce platforms, moved across
          continents. these days you might find me organising events, streaming
          on a quiet sunday, or speaking at a tech conference. i like to learn,
          share, and sometimes inspire.
        </p>
        <p className="lead mt-6">
          i believe the best products come from teams who care about their
          users. i&apos;m that guy who likes creating and telling stories about
          things people actually want to use.
        </p>
      </article>

      <section className="mt-24">
        <h2 className="heading-serif mb-6">
          my <em>playlist</em>
        </h2>
        <iframe
          src="https://open.spotify.com/embed/playlist/2HMFDNtUN8CzRy1vShvYDQ"
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-2xl"
        />
      </section>

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
                  <div className="w-36 border border-border bg-card p-2 pb-6 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:rotate-0 group-hover:shadow-xl sm:w-40">
                    <div className="aspect-[4/5] bg-secondary" />
                    <p className="meta mt-2 text-center text-[13px]">
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
