import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, TelegramIcon } from "@hugeicons/core-free-icons";
import { formatPeriod } from "@/lib/career";
import {
  getCovers,
  getEssays,
  getExperience,
  getHomePhotos,
  getMediaSizes,
  getStartups,
} from "@/lib/content";
import { CHAT_URL, yearsBuilding } from "@/lib/site";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Ticker } from "@/components/ticker";
import { Photo } from "@/components/photo";
import { StartupCard } from "./_components/startup-card";
import { CtaSection } from "./_components/cta-section";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default async function Home() {
  const [startups, covers, strip, work, essays] = await Promise.all([
    getStartups(),
    getCovers(),
    getHomePhotos(),
    getExperience("work"),
    getEssays(),
  ]);
  const featured = startups.filter((s) => s.featured);

  // the photo strip keeps each picture's own aspect ratio
  const sizes = await getMediaSizes(strip.map((p) => p.mediaId));

  const companies = [
    ...new Set([...startups.map((s) => s.name), ...work.map((w) => w.company)]),
  ];

  const stats = [
    {
      value: String(startups.length),
      label: "startups founded, built or advised",
    },
    { value: `${yearsBuilding()}+`, label: "years building products" },
    { value: "13.7k+", label: "learners on 42.uz" },
  ];

  return (
    <main>
      {/* hero */}
      <section className="container-site flex flex-col items-center pb-16 pt-20 text-center sm:pt-28">
        <span className="tag animate-rise">
          <span className="size-2 rounded-full bg-[#22c55e]" />
          Founder & engineer · Building Oqim
        </span>
        <h1
          className="h-display animate-rise mt-6 max-w-[760px] text-balance"
          style={delay(100)}
        >
          Building products that people love
        </h1>
        <p
          className="lede animate-rise mt-6 max-w-[520px] text-pretty"
          style={delay(200)}
        >
          Sharing lessons from the startups I&apos;ve founded and built, so you
          don&apos;t have to make the same mistakes.
        </p>
        <div
          className="animate-rise mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          style={delay(300)}
        >
          <a
            href={CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <HugeiconsIcon icon={TelegramIcon} className="size-4" />
            Say hi
          </a>
          <Link href="/essays" className="btn-secondary">
            Read essays
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
      <Reveal variant="grow" className="mt-4">
        <Ticker duration={70} gap="gap-4">
          {strip.map(({ src, caption, mediaId }) => {
            const size = sizes[mediaId];
            const ratio = size ? size.width / size.height : 0.8;
            return (
              <div
                key={src}
                className="img-card h-[260px] shrink-0 sm:h-[360px]"
                style={{ aspectRatio: ratio }}
              >
                <Image
                  src={src}
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

      {/* selected startups */}
      <section className="container-site mt-32">
        <SectionHeading
          tag="Selected startups"
          title="Built on speed, finished with care."
        />
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

      {/* about */}
      <section className="container-site mt-32 grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <span className="tag">About</span>
          <h2 className="h-section mt-5">
            Hi, I am
            <br />
            Yusuf
          </h2>
          <p className="lede mt-6 max-w-[460px]">
            A builder and engineer from Tashkent, now between Uzbekistan and the
            Bay Area. I&apos;ve founded, built and advised {startups.length}{" "}
            startups, and I write about what shipping them taught me.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {stats.map(({ value, label }) => (
              <div key={label} className="card p-4 sm:p-5">
                <p className="text-[24px] font-semibold tracking-[-0.04em]">
                  <CountUp value={value} />
                </p>
                <p className="meta mt-1">{label}</p>
              </div>
            ))}
          </div>
          <Link href="/about" className="btn-secondary mt-8">
            More about me
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </Link>
        </Reveal>
        <Reveal variant="grow">
          <Photo
            src="/avatar.webp"
            alt="Portrait of Yusuf"
            sizes="(min-width: 1024px) 508px, 100vw"
            className="aspect-square w-full"
          />
        </Reveal>
      </section>

      {/* work */}
      <section className="container-site mt-32">
        <SectionHeading
          tag="Where I've worked"
          title="From Tashkent to the Bay, one team at a time."
        />
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

      {/* essays */}
      <section className="container-site mt-32">
        <SectionHeading tag="Writing" title="Things I've written." />
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

      <CtaSection work={work} />
    </main>
  );
}
