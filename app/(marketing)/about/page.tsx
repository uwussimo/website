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
  getSettings,
  getStartups,
  getTalks,
} from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";
import { fillPlaceholders } from "@/lib/settings";
import { avatarSrc, socialLinks, yearsBuilding } from "@/lib/site";
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

export default async function About() {
  const [all, polaroids, talks, places, instagram, startups, essays, settings] =
    await Promise.all([
      getAllExperience(),
      getPolaroids(),
      getTalks(),
      getPlaces(),
      getInstagramPosts(),
      getStartups(),
      getEssays(),
      getSettings(),
    ]);
  const { about, profile } = settings;
  const fill = (text: string) =>
    fillPlaceholders(text, {
      startups: startups.length,
      years: yearsBuilding(),
    });
  // "text | essay-address" lines become links to essays
  const principles = about.principles.map((line) => {
    const [text, slug] = line.split("|").map((part) => part.trim());
    return { text, slug };
  });
  const byKind = (kind: string) => all.filter((e) => e.kind === kind);
  const photographed = places.filter((p) => p.photoId);
  const cityPhoto = photographed[0];

  return (
    <main className="container-site pt-16 sm:pt-24">
      <SectionHeading
        as="h1"
        tag="About me"
        title={about.title}
        lede={fill(about.lede)}
      />

      {/* bio + how i work */}
      <div className="mt-14 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Reveal className="card p-6 sm:p-10">
          <Photo
            src={avatarSrc(profile)}
            alt={`Portrait of ${profile.name}`}
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
            {fill(about.bioLead)}
          </p>
          <p className="lede mt-5 whitespace-pre-line">{fill(about.bio)}</p>
          <div className="mt-8 flex gap-3">
            {socialLinks(profile)
              .filter((s) => s.label in SOCIAL_ICONS)
              .map((s) => (
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
            {principles.map(({ text, slug }) => (
              <Link
                key={text}
                href={slug ? `/essays/${slug}` : "/essays"}
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
            {about.stack.map((tool) => (
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
        <SectionHeading tag="Where I've worked" title={about.workTitle} />
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
        <SectionHeading tag="Education" title={about.educationTitle} />
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
        <SectionHeading tag="Talks" title={about.talksTitle} />
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
          title={about.instagramTitle}
          lede={
            <>
              More on{" "}
              <a
                href={profile.instagram || "https://www.instagram.com/"}
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
            src={about.playlistUrl}
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
