"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { statusLabels } from "@/lib/career";
import type { Photo, Startup } from "@/lib/content";
import { mediaUrl } from "@/lib/media-url";
import { Polaroids } from "@/components/polaroids";

// an uploaded logo wins; otherwise the site's favicon, then the first letter
function StartupLogo({
  name,
  link,
  logoId,
}: {
  name: string;
  link: string | null;
  logoId: string | null;
}) {
  const [faviconError, setFaviconError] = useState(false);
  const faviconUrl =
    link && !faviconError ? `${link.replace(/\/$/, "")}/favicon.ico` : null;
  return (
    <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-secondary">
      {logoId ? (
        <Image
          src={mediaUrl(logoId)}
          alt={name}
          fill
          sizes="48px"
          className="object-contain p-2"
        />
      ) : faviconUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={faviconUrl}
          alt={name}
          width={48}
          height={48}
          className="size-full object-contain p-2"
          // a favicon that fails before hydration never fires onError
          ref={(img) => {
            if (img?.complete && img.naturalWidth === 0) setFaviconError(true);
          }}
          onError={() => setFaviconError(true)}
        />
      ) : (
        <span className="font-serif text-xl text-foreground">
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}

export function StartupCard({
  startup,
  photos = [],
  compact = false,
}: {
  startup: Startup;
  photos?: Photo[];
  compact?: boolean;
}) {
  const { name, role, description, users, mrr, founded, status, link, logoId } =
    startup;
  const cardClass = "card-soft pop block p-6 lowercase sm:p-8";

  const body = (
    <>
      <div className="flex items-center gap-4">
        <StartupLogo name={name} link={link} logoId={logoId} />
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-[26px] leading-tight text-foreground">
            {name}
          </h3>
          <p className="meta">{role}</p>
        </div>
        <span
          className={cn(
            "shrink-0 self-start rounded-full px-3 py-1 text-[13px] font-semibold",
            status === "active"
              ? "bg-primary text-primary-foreground"
              : "border border-border text-foreground/70",
          )}
        >
          {statusLabels[status] ?? status}
        </span>
      </div>
      <p className="mt-5 text-[16px] leading-[1.55] text-foreground">
        {description}
      </p>
      {!compact && (
        <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
          {[
            ["users", users],
            ["mrr", mrr],
            ["founded", founded],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="meta text-[14px]">{label}</dt>
              <dd className="text-[16px] font-semibold text-foreground">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {!compact && <Polaroids photos={photos} label={name} />}
    </>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        cardClass,
        "transition-shadow hover:shadow-[0_8px_32px_rgb(0_0_0/0.09)]",
      )}
    >
      {body}
    </a>
  ) : (
    <div className={cardClass}>{body}</div>
  );
}
