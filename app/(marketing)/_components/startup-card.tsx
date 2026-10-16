"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { statusLabels } from "@/lib/career";
import type { Startup } from "@/lib/content";
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
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-background ${className}`}
      style={{ width: size, height: size }}
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

/** A startup in a grid: cover image (or a logo card), name, role. */
export function StartupCard({
  startup,
  cover,
}: {
  startup: Startup;
  cover?: string;
}) {
  const { slug, name, role, status, founded } = startup;
  return (
    <Link href={`/startups/${slug}`} className="group block">
      <div className="img-card pop aspect-[4/3]">
        {cover ? (
          <Image
            src={cover}
            alt={name}
            fill
            sizes="(min-width: 1040px) 508px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-[50%_20%]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <StartupLogo startup={startup} size={72} />
            <span className="text-[22px] font-semibold tracking-[-0.04em] lowercase">
              {name}
            </span>
          </div>
        )}
      </div>
      <h3 className="h-card mt-4">
        {name}{" "}
        <span className="text-foreground/60">– {role.toLowerCase()}</span>
      </h3>
      <p className="meta">
        {statusLabels[status] ?? status} · {founded}
      </p>
    </Link>
  );
}
