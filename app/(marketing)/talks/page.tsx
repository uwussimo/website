import type { Metadata } from "next";
import { FramedPhoto } from "@/components/framed-photo";
import { Reveal } from "@/components/reveal";
import { getTalks } from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";

export const metadata: Metadata = {
  title: "Talks | Mukhammadyusuf Abdurakhimov",
  description:
    "Talks, trainings and hackathons I've spoken at, mentored and judged.",
};

export default async function Talks() {
  const talks = await getTalks();

  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[760px] px-6 pt-12 sm:px-8 sm:pt-16">
      <h1 className="heading-serif mb-12">
        tech <em>talks</em>
      </h1>

      <div className="border-b border-foreground/20">
        {talks.map(
          ({ id, title, place, dateLabel, text, href, photoId, photoAlt }) => (
            <Reveal key={id}>
              <article className="grid gap-x-8 gap-y-5 border-t border-foreground/20 py-8 sm:grid-cols-[170px_1fr]">
                <div>
                  {photoId && (
                    <FramedPhoto
                      src={mediaUrl(photoId)}
                      alt={photoAlt ?? title}
                      sizes="170px"
                      className="w-[170px] -rotate-1"
                    />
                  )}
                </div>
                <div>
                  <h2 className="font-serif text-[26px] leading-tight text-foreground">
                    {title}
                  </h2>
                  <p className="meta mt-0.5">
                    {place} · {dateLabel}
                  </p>
                  {text && (
                    <p className="mt-4 text-[17px] leading-[1.55] text-foreground">
                      {text}
                    </p>
                  )}
                  {href && (
                    <p className="mt-4 text-[17px]">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-dashed font-bold"
                      >
                        see the photos
                      </a>
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ),
        )}
      </div>

      <p className="lead mt-10">
        more talks & workshops coming soon. in the meantime, catch me on{" "}
        <a
          href="https://t.me/usufdev"
          target="_blank"
          rel="noopener noreferrer"
          className="link-dashed font-bold"
        >
          telegram
        </a>
        .
      </p>
    </main>
  );
}
