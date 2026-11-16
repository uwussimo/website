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
  getInstagramPosts,
  getPlaces,
  getPolaroids,
  getSettings,
  getStartups,
  getTalks,
} from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";
import { fillPlaceholders, liveNumbers } from "@/lib/settings";
import { avatarSrc, socialLinks, yearsBuilding } from "@/lib/site";
import { Globe } from "@/components/globe";
import { Photo } from "@/components/photo";
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
  const [all, polaroids, talks, places, instagram, startups, settings] =
    await Promise.all([
      getAllExperience(),
      getPolaroids(),
      getTalks(),
      getPlaces(),
      getInstagramPosts(),
      getStartups(),
      getSettings(),
    ]);
  const { about, profile } = settings;
  const fill = (text: string) =>
    fillPlaceholders(text, liveNumbers(startups, yearsBuilding()));
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
      {/* who, in words and one photo */}
      <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
        <div>
          <h1 className="h-display text-balance">{about.title}</h1>
          <p className="lede mt-5 max-w-[560px] text-pretty">
            {fill(about.lede)}
          </p>
          <p className="mt-10 max-w-[600px] text-[22px] font-medium leading-[1.3] tracking-[-0.02em] sm:text-[24px]">
            {fill(about.bioLead)}
          </p>
          <p className="lede mt-5 max-w-[600px] whitespace-pre-line">
            {fill(about.bio)}
          </p>
          <div className="mt-8 flex gap-2">
            {socialLinks(profile)
              .filter((s) => s.label in SOCIAL_ICONS)
              .map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full bg-surface-strong transition-colors hover:bg-[#e8e8e8]"
                >
                  <HugeiconsIcon
                    icon={SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS]}
                    className="size-4"
                    strokeWidth={1.5}
                  />
                </a>
              ))}
          </div>
        </div>
        <Photo
          src={avatarSrc(profile)}
          alt={`Portrait of ${profile.name}`}
          sizes="(min-width: 1024px) 360px, 100vw"
          priority
          className="aspect-[4/5] w-full self-start"
        />
      </div>

      {/* how i work, stack, cities: the same label-and-content rows as below */}
      <div className="mt-24 border-b border-border">
        {principles.length > 0 && (
          <section className="ledger-row">
            <h2 className="body-text font-medium">how i work</h2>
            <ul className="max-w-[640px]">
              {principles.map(({ text, slug }) => (
                <li key={text}>
                  <Link
                    href={slug ? `/essays/${slug}` : "/essays"}
                    className="h-card flex items-center justify-between gap-3 py-1 transition-colors hover:text-foreground/60"
                  >
                    {text}
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      className="size-4 shrink-0 text-foreground/40"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        {about.stack.length > 0 && (
          <section className="ledger-row">
            <h2 className="body-text font-medium">stack i use daily</h2>
            <p className="h-card max-w-[640px]">{about.stack.join(", ")}</p>
          </section>
        )}
        {places.length > 0 && (
          <section className="ledger-row">
            <h2 className="body-text font-medium">cities so far</h2>
            <div className="grid max-w-[640px] gap-6 sm:grid-cols-2">
              <div>
                <p className="h-card lowercase">
                  {places.map((p) => p.name).join(", ")}
                </p>
                <div className="mt-6 h-[160px] overflow-hidden">
                  <Globe
                    locations={places.map((p) => [p.latitude, p.longitude])}
                    className="aspect-square w-[320px] max-w-full"
                  />
                </div>
                <p className="meta mt-2">drag to spin</p>
              </div>
              {cityPhoto?.photoId && (
                <Photo
                  src={mediaUrl(cityPhoto.photoId)}
                  alt={cityPhoto.photoAlt ?? cityPhoto.name}
                  focus={cityPhoto.photoFocus}
                  sizes="(min-width: 640px) 310px, 100vw"
                  className="aspect-[4/5] w-full"
                />
              )}
            </div>
          </section>
        )}
      </div>

      {/* experience */}
      <section id="experience" className="mt-24 scroll-mt-24">
        <SectionHeading title={about.workTitle} />
        <div className="mt-8 border-b border-border">
          {byKind("work").map((item) => (
            <ExperienceItem
              key={item.id}
              experience={item}
              photos={item.slug ? polaroids[item.slug] : undefined}
            />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading title={about.educationTitle} />
        <div className="mt-8 border-b border-border">
          {byKind("education").map((item) => (
            <ExperienceItem key={item.id} experience={item} />
          ))}
        </div>
      </section>

      {/* talks */}
      <section id="talks" className="mt-24 scroll-mt-24">
        <SectionHeading title={about.talksTitle} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {talks.map((talk) => (
            <div key={talk.id} className="card overflow-hidden">
              {talk.photoId && (
                <Photo
                  src={mediaUrl(talk.photoId)}
                  alt={talk.photoAlt ?? talk.title}
                  sizes="(min-width: 640px) 508px, 100vw"
                  className="aspect-[16/10] rounded-none"
                />
              )}
              <div className="p-6">
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
            </div>
          ))}
        </div>
      </section>

      {/* instagram */}
      <section className="mt-24">
        <SectionHeading
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
            </>
          }
        />
        <div className="mt-8">
          <InstagramGrid posts={instagram} />
        </div>
      </section>

      {/* playlist */}
      <section className="mt-24">
        <SectionHeading title="what i build to" />
        <iframe
          src={about.playlistUrl}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="mt-8 max-w-[760px] rounded-2xl"
          title="Builder playlist on Spotify"
        />
      </section>
    </main>
  );
}
