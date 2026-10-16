import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, TelegramIcon } from "@hugeicons/core-free-icons";
import { formatPeriod } from "@/lib/career";
import {
  getCovers,
  getEssays,
  getExperience,
  getMediaSizes,
  getSettings,
  getStartups,
} from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";
import { fillPlaceholders } from "@/lib/settings";
import { avatarSrc, yearsBuilding } from "@/lib/site";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Ticker } from "@/components/ticker";
import { Photo } from "@/components/photo";
import { StartupCard } from "./_components/startup-card";
import { CtaSection } from "./_components/cta-section";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default async function Home() {
  const [startups, covers, work, essays, settings] = await Promise.all([
    getStartups(),
    getCovers(),
    getExperience("work"),
    getEssays(),
    getSettings(),
  ]);
  const { home, profile } = settings;
  const featured = startups.filter((s) => s.featured);
  const numbers = { startups: startups.length, years: yearsBuilding() };
  const fill = (text: string) => fillPlaceholders(text, numbers);

  // the photo strip keeps each picture's own aspect ratio
  const sizes = await getMediaSizes(home.strip.map((p) => p.mediaId));

  const companies = [
    ...new Set([...startups.map((s) => s.name), ...work.map((w) => w.company)]),
  ];

  return (
    <main>
      {/* hero */}
      <section className="container-site flex flex-col items-center pb-16 pt-20 text-center sm:pt-28">
        <span className="tag animate-rise">
          <span className="size-2 rounded-full bg-[#22c55e]" />
          {home.badge}
        </span>
        <h1
          className="h-display animate-rise mt-6 max-w-[760px] text-balance"
          style={delay(100)}
        >
          {home.title}
        </h1>
        <p
          className="lede animate-rise mt-6 max-w-[520px] text-pretty"
          style={delay(200)}
        >
          {home.subtitle}
        </p>
        <div
          className="animate-rise mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          style={delay(300)}
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
        <div
          className="animate-rise mt-12 w-full max-w-[720px]"
          style={delay(400)}
        >
          <Ticker duration={45} gap="gap-10">
            {companies.map((name) => (
              <span
                key={name}
                className="whitespace-nowrap text-[18px] font-semibold tracking-[-0.03em] text-foreground/35 lowercase"
              >
                {name}
              </span>
            ))}
          </Ticker>
        </div>
      </section>

      {/* photo strip */}
      {home.strip.length > 0 && (
        <Reveal variant="grow" className="mt-4">
          <Ticker duration={70} gap="gap-4">
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
          </Ticker>
        </Reveal>
      )}

      {/* selected startups */}
      {featured.length > 0 && (
        <section className="container-site mt-32">
          <SectionHeading tag="Selected startups" title={home.startupsTitle} />
          <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2">
            {featured.map((startup, i) => (
              <Reveal key={startup.id} delay={(i % 2) * 80}>
                <StartupCard startup={startup} cover={covers[startup.slug]} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/startups" className="btn-secondary">
              All {startups.length} startups
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
            </Link>
          </Reveal>
        </section>
      )}

      {/* about */}
      <section className="container-site mt-32 grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <span className="tag">About</span>
          <h2 className="h-section mt-5 whitespace-pre-line">
            {home.aboutTitle}
          </h2>
          <p className="lede mt-6 max-w-[460px]">{fill(home.aboutText)}</p>
          {home.stats.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-3">
              {home.stats.map(({ value, label }) => (
                <div key={label} className="card p-4 sm:p-5">
                  <p className="text-[24px] font-semibold tracking-[-0.04em]">
                    <CountUp value={fill(value)} />
                  </p>
                  <p className="meta mt-1">{label}</p>
                </div>
              ))}
            </div>
          )}
          <Link href="/about" className="btn-secondary mt-8">
            More about me
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </Link>
        </Reveal>
        <Reveal variant="grow">
          <Photo
            src={avatarSrc(profile)}
            alt={`Portrait of ${profile.name}`}
            sizes="(min-width: 1024px) 508px, 100vw"
            className="aspect-square w-full"
          />
        </Reveal>
      </section>

      {/* work */}
      {work.length > 0 && (
        <section className="container-site mt-32">
          <SectionHeading tag="Where I've worked" title={home.workTitle} />
          <Reveal className="mx-auto mt-14 max-w-[760px]">
            {work.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                href="/about#experience"
                className="flex items-baseline justify-between gap-6 border-t border-border py-5 transition-colors hover:bg-surface"
              >
                <span className="min-w-0">
                  <span className="h-card block truncate">{item.company}</span>
                  <span className="meta block">{item.role.toLowerCase()}</span>
                </span>
                <span className="meta shrink-0">{formatPeriod(item)}</span>
              </Link>
            ))}
            <div className="border-t border-border pt-8 text-center">
              <Link href="/about#experience" className="btn-secondary">
                What I did there
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      )}

      {/* essays */}
      {essays.length > 0 && (
        <section className="container-site mt-32">
          <SectionHeading tag="Writing" title={home.essaysTitle} />
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {essays.slice(0, 4).map((essay, i) => (
              <Reveal key={essay.slug} delay={(i % 2) * 80}>
                <Link
                  href={`/essays/${essay.slug}`}
                  className="card pop flex h-full flex-col justify-between p-6 sm:p-8"
                >
                  <div>
                    <p className="meta">
                      {essay.date} · {essay.readTime} read
                    </p>
                    <h3 className="mt-3 text-[24px] font-medium leading-[1.2] tracking-[-0.03em]">
                      {essay.title}
                    </h3>
                    {essay.description && (
                      <p className="body-text mt-3 text-foreground/70">
                        {essay.description}
                      </p>
                    )}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-[14px] font-medium">
                    Read{" "}
                    <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/essays" className="btn-secondary">
              All {essays.length} essays
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
            </Link>
          </Reveal>
        </section>
      )}

      <CtaSection work={work} home={home} chatUrl={profile.chatUrl} />
    </main>
  );
}
