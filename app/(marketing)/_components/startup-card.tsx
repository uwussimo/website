"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { statusLabels } from "@/lib/career";
import type { Photo, Startup } from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";

/** The startup's logo: an uploaded one, else its favicon, else a letter. */
export function StartupLogo({
  startup,
  size = 48,
  className = "",
}: {
  startup: Pick<Startup, "name" | "link" | "logoId">;
  size?: number;
  className?: string;
}) {
  const { name, link, logoId } = startup;
  const [faviconError, setFaviconError] = useState(false);
  const faviconUrl =
    link && !faviconError ? `${link.replace(/\/$/, "")}/favicon.ico` : null;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-background ${className}`}
      // the app icon squircle, scaled with the icon
      style={{ width: size, height: size, borderRadius: size * 0.225 }}
    >
      {logoId ? (
        <Image
          src={mediaUrl(logoId)}
          alt={name}
          fill
          sizes={`${size}px`}
          className="object-contain p-[18%]"
        />
      ) : faviconUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={faviconUrl}
          alt={name}
          width={size}
          height={size}
          className="size-full object-contain p-[18%]"
          // a favicon that fails before hydration never fires onError
          ref={(img) => {
            if (img?.complete && img.naturalWidth === 0) setFaviconError(true);
          }}
          onError={() => setFaviconError(true)}
        />
      ) : (
        <span
          className="font-semibold tracking-[-0.04em]"
          style={{ fontSize: size * 0.42 }}
        >
          {name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

/**
 * "4,500+ creators" reads as a big number over a small noun, the way a store
 * listing shows "4.8" over "ratings". Anything else stays whole.
 */
function splitUsers(users: string): [label: string, value: string] {
  const match = users.trim().match(/^(\S*\d\S*)\s+(\D+)$/);
  return match ? [match[2], match[1]] : ["users", users];
}

/** A startup as an app store listing: icon, name, facts, screenshots. */
export function StartupCard({
  startup,
  photos = [],
}: {
  startup: Startup;
  /** its polaroids; the first three become the screenshots */
  photos?: Photo[];
}) {
  const { slug, name, role, description, status, founded, users, mrr } =
    startup;
  const shots = photos.slice(0, 3);
  const facts = [
    splitUsers(users),
    ["mrr", mrr],
    ["founded", founded],
    ["status", statusLabels[status] ?? status],
  ];

  return (
    <Link
      href={`/startups/${slug}`}
      className="card pop group flex h-full flex-col p-5 sm:p-6"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <StartupLogo
          startup={startup}
          size={64}
          className="ring-1 ring-border"
        />
        <div className="min-w-0 flex-1">
          <h3 className="h-card truncate font-semibold leading-[1.25]">
            {name}
          </h3>
          <p className="meta truncate">{role.toLowerCase()}</p>
        </div>
        <span className="shrink-0 rounded-full bg-surface-strong px-4 py-2 text-[15px] sm:px-5 font-semibold leading-none tracking-[-0.02em] transition-colors duration-200 group-hover:bg-foreground group-hover:text-background">
          Open
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-4 divide-x divide-border border-y border-border py-3 text-center">
        {facts.map(([label, value]) => (
          <div key={label} className="flex min-w-0 flex-col-reverse px-2">
            <dt className="truncate text-[12px] leading-[1.4] tracking-[-0.01em] text-foreground/50">
              {label.toLowerCase()}
            </dt>
            <dd className="truncate text-[17px] font-semibold leading-[1.4] tracking-[-0.03em] text-foreground/80">
              {value.toLowerCase()}
            </dd>
          </div>
        ))}
      </dl>

      {shots.length > 0 && (
        <div
          className="mt-5 grid aspect-[9/4] gap-2"
          style={{ gridTemplateColumns: `repeat(${shots.length}, 1fr)` }}
        >
          {shots.map(({ src, caption, mediaId }) => (
            <div
              key={mediaId}
              className="relative overflow-hidden rounded-xl bg-surface-strong"
            >
              <Image
                src={src}
                alt={`${name}: ${caption}`}
                fill
                sizes="(min-width: 640px) 240px, 50vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
          ))}
        </div>
      )}

      <p className="body-text mt-5 line-clamp-3 text-pretty text-foreground/70">
        {description}
      </p>
    </Link>
  );
}
