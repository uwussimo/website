import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  GithubIcon,
  InstagramIcon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import {
  getAllExperience,
  getEssays,
  getInstagramPosts,
  getPlaces,
  getPolaroids,
  getStartups,
  getTalks,
} from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";
import { SOCIALS, yearsBuilding } from "@/lib/site";
import { Globe } from "@/components/globe";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ExperienceItem } from "../_components/experience-item";
import { InstagramGrid } from "../_components/instagram-grid";

export const metadata: Metadata = {
  title: "About me | Yusuf Abdurakhimov",
  description:
    "Builder and engineer from Tashkent. The startups, the jobs, the cities and the lessons behind them.",
};

const SOCIAL_ICONS = {
  GitHub: GithubIcon,
  "X (Twitter)": NewTwitterIcon,
  Instagram: InstagramIcon,
  LinkedIn: Linkedin01Icon,
};

// the stack from the github profile
const STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Expo",
  "Node.js",
];

// essays that double as working principles
const PRINCIPLES = [
  { text: "Ship it, then make it better", slug: "art-of-shipping" },
  { text: "Say no now, not later", slug: "say-no-now-or-die-later" },
  {
    text: "Ask why people are frustrated",
    slug: "stop-asking-what-people-want",
  },
  { text: "Answer fast, latency kills teams", slug: "latency-kills-teams" },
];

export default async function About() {
  const [all, polaroids, talks, places, instagram, startups, essays] =
    await Promise.all([
      getAllExperience(),
      getPolaroids(),
      getTalks(),
      getPlaces(),
      getInstagramPosts(),
      getStartups(),
      getEssays(),
    ]);
  const byKind = (kind: string) => all.filter((e) => e.kind === kind);
  const photographed = places.filter((p) => p.photoId);
  const cityPhoto = photographed[0];

  return (
    <main className="container-site pt-16 sm:pt-24">
      <SectionHeading
        as="h1"
        tag="About me"
        title="The builder behind the products."
        lede={`${yearsBuilding()} years of turning ideas into startups, from Tashkent to the Bay Area. Founder at Oqim, engineer at Dorim.`}
      />

      {/* bio + how i work */}
      <div className="mt-14 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Reveal className="card p-6 sm:p-10">
          <Photo
            src="/avatar.webp"
            alt="Portrait of Yusuf"
            sizes="64px"
            className="size-16 rounded-xl"
          />
          <div className="mt-24 flex flex-wrap gap-2">
            <span className="tag bg-background">
              {startups.length} startups
            </span>
            <span className="tag bg-background">
              {yearsBuilding()}+ years building
            </span>
            <span className="tag bg-background">{essays.length} essays</span>
          </div>
          <p className="mt-6 text-[22px] font-medium leading-[1.3] tracking-[-0.03em] sm:text-[26px]">
            I grew up around people who were curious about technology, and that
            curiosity stuck. I started building things early: websites, small
            apps, ideas that didn&apos;t always work. Some did.
          </p>
          <p className="lede mt-5">
            After school I co-founded an edtech startup. We reached thousands of
            students. We won something. More importantly, I learned what it
            means to ship, to fail, and to try again. Since then I&apos;ve
            worked at scale, built s-commerce platforms, and moved across
            continents. I believe the best products come from teams who care
            about their users.
          </p>
          <div className="mt-8 flex gap-3">
            {SOCIALS.filter((s) => s.label in SOCIAL_ICONS).map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex size-10 items-center justify-center rounded-full bg-background transition-colors hover:bg-surface-strong"
              >
                <HugeiconsIcon
                  icon={SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS]}
                  className="size-4"
                  strokeWidth={1.5}
                />
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal variant="right" className="card p-6 sm:p-8">
          <div className="space-y-2">
            {PRINCIPLES.map(({ text, slug }) => (
              <Link
                key={slug}
                href={`/essays/${slug}`}
                className="flex items-center justify-between gap-3 rounded-xl bg-background px-4 py-3 text-[15px] font-medium tracking-[-0.02em] transition-colors hover:bg-surface-strong"
              >
                {text}
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  className="size-4 shrink-0 text-foreground/40"
                />
              </Link>
            ))}
          </div>
          <h3 className="h-card mt-8">How I work</h3>
          <p className="meta mt-1">
            Four essays that double as my rules. Click through for the long
            version.
          </p>
        </Reveal>
      </div>

      {/* stack, cities, photo */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Reveal className="card p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {STACK.map((tool) => (
              <span key={tool} className="tag bg-background">
                {tool}
              </span>
            ))}
          </div>
          <h3 className="h-card mt-10">Stack I use daily</h3>
          <p className="meta mt-1">
            Web, mobile and backend, mostly in TypeScript.
          </p>
        </Reveal>
        <Reveal delay={80} className="card flex flex-col p-6 sm:p-8">
          <div className="-mt-2 h-[160px] overflow-hidden">
            <Globe
              locations={places.map((p) => [p.latitude, p.longitude])}
              className="relative left-1/2 aspect-square w-[320px] -translate-x-1/2"
            />
          </div>
          <h3 className="h-card mt-auto pt-6">Cities so far</h3>
          <p className="meta mt-1 lowercase">
            {places.map((p) => p.name).join(", ")}. Drag to spin.
          </p>
        </Reveal>
        {cityPhoto?.photoId && (
          <Reveal delay={160}>
            <Photo
              src={mediaUrl(cityPhoto.photoId)}
              alt={cityPhoto.photoAlt ?? cityPhoto.name}
              focus={cityPhoto.photoFocus}
              sizes="(min-width: 768px) 340px, 100vw"
              className="h-full min-h-[280px]"
            />
          </Reveal>
        )}
      </div>

      {/* experience */}
      <section id="experience" className="mt-32 scroll-mt-24">
        <SectionHeading
          tag="Where I've worked"
          title="Every team, for how long, and what I did there."
        />
        <div className="mx-auto mt-14 max-w-[840px] border-b border-border">
          {byKind("work").map((item) => (
            <Reveal key={item.id}>
              <ExperienceItem
                experience={item}
                photos={item.slug ? polaroids[item.slug] : undefined}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-32">
        <SectionHeading tag="Education" title="Where I studied." />
        <div className="mx-auto mt-14 max-w-[840px] border-b border-border">
          {byKind("education").map((item) => (
            <Reveal key={item.id}>
              <ExperienceItem experience={item} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* talks */}
      <section id="talks" className="mt-32 scroll-mt-24">
        <SectionHeading tag="Talks" title="Rooms I've spoken in." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {talks.map((talk, i) => (
            <Reveal
              key={talk.id}
              delay={(i % 2) * 80}
              className="card overflow-hidden"
            >
              {talk.photoId && (
                <Photo
                  src={mediaUrl(talk.photoId)}
                  alt={talk.photoAlt ?? talk.title}
                  sizes="(min-width: 640px) 508px, 100vw"
                  className="aspect-[16/10] rounded-none"
                />
              )}
              <div className="p-6 sm:p-8">
                <h3 className="h-card">{talk.title}</h3>
                <p className="meta mt-1">
                  {talk.place} · {talk.dateLabel}
                </p>
                {talk.text && (
                  <p className="body-text mt-4 text-foreground/80">
                    {talk.text}
                  </p>
                )}
                {talk.href && (
                  <a
                    href={talk.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link mt-4 inline-block text-[15px] font-medium"
                  >
                    See the photos
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* instagram */}
      <section className="mt-32">
        <SectionHeading
          tag="Life is good"
          title="A few moments from Instagram."
          lede={
            <>
              More on{" "}
              <a
                href="https://www.instagram.com/usufdev/"
                target="_blank"
                rel="noopener noreferrer"
                className="link font-medium text-foreground"
              >
                @usufdev
              </a>
              .
            </>
          }
        />
        <div className="mt-14">
          <InstagramGrid posts={instagram} />
        </div>
      </section>

      {/* playlist */}
      <section className="mx-auto mt-32 max-w-[760px]">
        <SectionHeading tag="Playlist" title="What I build to." />
        <Reveal className="mt-10">
          <iframe
            src="https://open.spotify.com/embed/playlist/2HMFDNtUN8CzRy1vShvYDQ"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-2xl"
            title="Builder playlist on Spotify"
          />
        </Reveal>
      </section>
    </main>
  );
}
