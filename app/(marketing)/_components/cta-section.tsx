import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { TelegramIcon } from "@hugeicons/core-free-icons";
import type { Experience } from "@/lib/content";
import type { Settings } from "@/lib/settings";
import { Reveal } from "@/components/reveal";

/** Closing pitch with a "now" list of whatever is still running. */
export function CtaSection({
  work,
  home,
  chatUrl,
}: {
  work: Experience[];
  home: Settings["home"];
  chatUrl: string;
}) {
  const now = work.filter((item) => item.endDate === "present");

  return (
    <section className="container-site mt-32 grid gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal>
        <h2 className="h-section">{home.ctaTitle}</h2>
        <p className="lede mt-6 max-w-[460px]">{home.ctaText}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <HugeiconsIcon icon={TelegramIcon} className="size-4" />
            Let&apos;s chat
          </a>
          <Link href="/about" className="btn-secondary">
            About me
          </Link>
        </div>
      </Reveal>
      <Reveal variant="right">
        <p className="meta mb-3">Right now</p>
        <div className="space-y-2">
          {now.map((item) => (
            <div
              key={item.id}
              className="card flex items-center justify-between gap-4 px-5 py-4"
            >
              <span className="body-text font-medium">{item.company}</span>
              <span className="meta text-right">{item.role.toLowerCase()}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
