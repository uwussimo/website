import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { formatPeriod, startupFacts, statusLabels } from "@/lib/career";
import {
  getExperienceForSlug,
  getPolaroids,
  getStartup,
  getStartups,
} from "@/lib/content";
import { Gallery } from "@/components/gallery";
import { StatusDot } from "@/components/status-dot";
import { StartupLogo } from "../../_components/startup-card";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const startups = await getStartups();
  return startups.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const startup = await getStartup((await params).slug);
  if (!startup) return { title: "Startup not found" };
  return {
    title: `${startup.name} | Yusuf Abdurakhimov`,
    description: startup.description,
  };
}

export default async function StartupPage({ params }: Props) {
  const { slug } = await params;
  const [startup, work, polaroids] = await Promise.all([
    getStartup(slug),
    getExperienceForSlug(slug),
    getPolaroids(),
  ]);
  if (!startup) notFound();

  const photos = polaroids[slug] ?? [];
  const [cover, ...rest] = photos;
  const facts = [["role", startup.role], ...startupFacts(startup)];
  const domain = startup.link?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <main className="container-site pt-12 sm:pt-20">
      <div className="mx-auto max-w-[840px]">
        <Link
          href="/startups"
          className="meta inline-flex items-center gap-1 hover:text-foreground"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          All startups
        </Link>
        <div className="mt-8 flex items-center gap-4">
          <StartupLogo
            startup={startup}
            size={64}
            className="ring-1 ring-border"
          />
          <div className="min-w-0">
            <h1 className="h-display truncate">{startup.name}</h1>
            <p className="meta flex items-center gap-2">
              <StatusDot status={startup.status} />
              {statusLabels[startup.status] ?? startup.status}
            </p>
          </div>
        </div>
        <p className="lede mt-5 max-w-[560px]">{startup.description}</p>
        {startup.link && (
          <a
            href={startup.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            Visit {domain}
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
          </a>
        )}

        {cover && (
          <div className="img-card mt-12 aspect-[16/10]">
            <Image
              src={cover.src}
              alt={`${startup.name}: ${cover.caption}`}
              fill
              priority
              sizes="(min-width: 840px) 840px, 100vw"
              className="object-cover object-[50%_20%]"
            />
          </div>
        )}

        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-y border-border py-5">
          {facts.map(([label, value]) => (
            <div key={label} className="flex flex-col-reverse">
              <dt className="meta">{label}</dt>
              <dd className="body-text font-medium tabular-nums">
                {value.toLowerCase()}
              </dd>
            </div>
          ))}
        </dl>

        {work && (
          <section className="mt-16">
            <h2 className="h-section">what i did there</h2>
            <p className="meta mt-2">
              {work.role.toLowerCase()} · {formatPeriod(work)}
            </p>
            {work.summary && (
              <p className="lede mt-5 text-foreground">{work.summary}</p>
            )}
            {work.highlights.length > 0 && (
              <ul className="mt-5 space-y-2">
                {work.highlights.map((h) => (
                  <li
                    key={h}
                    className="body-text flex gap-3 text-foreground/80"
                  >
                    <span aria-hidden className="text-foreground/30">
                      •
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {rest.length > 0 && (
          <section className="mt-16">
            <h2 className="h-section">moments</h2>
            <Gallery photos={rest} label={startup.name} className="mt-6" />
          </section>
        )}
      </div>
    </main>
  );
}
