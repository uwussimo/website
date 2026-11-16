import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { TelegramIcon } from "@hugeicons/core-free-icons";
import type { Experience } from "@/lib/content";
import type { Settings } from "@/lib/settings";
import { StatusDot } from "@/components/status-dot";

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
    <section className="container-site mt-24 grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 className="h-section text-balance">{home.ctaTitle}</h2>
        <p className="lede mt-4 max-w-[460px]">{home.ctaText}</p>
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
      </div>
      {now.length > 0 && (
        <div>
          <p className="meta">right now</p>
          <ul className="mt-2">
            {now.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 border-b border-border py-4"
              >
                <StatusDot status="active" />
                <span className="body-text font-medium">{item.company}</span>
                <span className="meta ml-auto text-right">
                  {item.role.toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
