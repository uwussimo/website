import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, TelegramIcon } from "@hugeicons/core-free-icons";
import { formatPeriod } from "@/lib/career";
import {
  getEssays,
  getExperience,
  getMediaSizes,
  getPolaroids,
  getSettings,
  getStartups,
} from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";
import { fillPlaceholders, liveNumbers } from "@/lib/settings";
import { avatarSrc, yearsBuilding } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { StatusDot } from "@/components/status-dot";
import { Photo } from "@/components/photo";
import { StartupCard } from "./_components/startup-card";
import { EssayRow } from "./_components/essay-row";
import { CtaSection } from "./_components/cta-section";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default async function Home() {
  const [startups, photos, work, essays, settings] = await Promise.all([
    getStartups(),
    getPolaroids(),
    getExperience("work"),
    getEssays(),
    getSettings(),
  ]);
  const { home, profile } = settings;
  const featured = startups.filter((s) => s.featured);
  const numbers = liveNumbers(startups, yearsBuilding());
  const fill = (text: string) => fillPlaceholders(text, numbers);

  // the photo strip keeps each picture's own aspect ratio
  const sizes = await getMediaSizes(home.strip.map((p) => p.mediaId));

  return (
    <main>
      {/* the count, then the listings themselves */}
      <section className="container-site pt-16 sm:pt-24">
        <h1 className="h-display animate-rise max-w-[760px] text-balance">
          {fill(home.title)}
        </h1>
        <p
          className="lede animate-rise mt-5 max-w-[520px] text-pretty"
          style={delay(80)}
        >
          {home.subtitle}
        </p>
        <div
          className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row"
          style={delay(160)}
        >
          <a
            href={profile.chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <HugeiconsIcon icon={TelegramIcon} className="size-4" />
            {home.primaryLabel}
          </a>
          <Link href="/essays" className="btn-secondary">
            {home.secondaryLabel}
          </Link>
        </div>

        {featured.length > 0 && (
          <div className="animate-rise mt-14" style={delay(240)}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {featured.map((startup) => (
                <StartupCard
                  key={startup.id}
                  startup={startup}
                  photos={photos[startup.slug]}
                />
              ))}
            </div>
            <Link href="/startups" className="btn-secondary mt-8">
              All {startups.length} startups
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
            </Link>
          </div>
        )}
      </section>

      {/* photo strip: scrolls by hand, runs to both edges of the window */}
      {home.strip.length > 0 && (
        <div className="mt-24 flex gap-4 overflow-x-auto px-6 [scrollbar-width:none]">
          {home.strip.map(({ mediaId, caption }) => {
            const size = sizes[mediaId];
            const ratio = size ? size.width / size.height : 0.8;
            return (
              <div
                key={mediaId}
                className="img-card h-[260px] shrink-0 sm:h-[360px]"
                style={{ aspectRatio: ratio }}
              >
                <Image
                  src={mediaUrl(mediaId)}
                  alt={caption}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* about */}
      <section className="container-site mt-24 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="h-section whitespace-pre-line text-balance">
            {home.aboutTitle}
          </h2>
          <p className="lede mt-4 max-w-[460px]">{fill(home.aboutText)}</p>
          {home.stats.length > 0 && (
            <dl className="mt-8 flex gap-8">
              {home.stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex max-w-[160px] flex-col-reverse"
                >
                  <dt className="meta mt-1">{label}</dt>
                  <dd className="text-[24px] font-medium leading-[32px] tracking-[-0.03em] tabular-nums">
                    {fill(value)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <Link href="/about" className="btn-secondary mt-8">
            More about me
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </Link>
        </div>
        <Photo
          src={avatarSrc(profile)}
          alt={`Portrait of ${profile.name}`}
          sizes="(min-width: 1024px) 508px, 100vw"
          className="aspect-square w-full"
        />
      </section>

      {/* work */}
      {work.length > 0 && (
        <section className="container-site mt-24">
          <SectionHeading title={home.workTitle} />
          <div className="mt-8">
            {work.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                href="/about#experience"
                className="flex items-baseline justify-between gap-6 border-t border-border py-4 transition-colors hover:bg-surface"
              >
                <span className="min-w-0">
                  <span className="h-card block truncate">{item.company}</span>
                  <span className="meta block">{item.role.toLowerCase()}</span>
                </span>
                <span className="meta flex shrink-0 items-center gap-2 tabular-nums">
                  {item.endDate === "present" && <StatusDot status="active" />}
                  {formatPeriod(item)}
                </span>
              </Link>
            ))}
            <div className="border-t border-border pt-8">
              <Link href="/about#experience" className="btn-secondary">
                What I did there
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* essays */}
      {essays.length > 0 && (
        <section className="container-site mt-24">
          <SectionHeading title={home.essaysTitle} />
          <div className="mt-8">
            {essays.slice(0, 4).map((essay) => (
              <EssayRow key={essay.slug} essay={essay} />
            ))}
            <div className="border-t border-border pt-8">
              <Link href="/essays" className="btn-secondary">
                All {essays.length} essays
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaSection work={work} home={home} chatUrl={profile.chatUrl} />
    </main>
  );
}
