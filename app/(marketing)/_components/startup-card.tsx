"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { statusLabels, type Startup } from "@/lib/career";

function StartupLogo({ name, link }: { name: string; link: string | null }) {
  const [faviconError, setFaviconError] = useState(false);
  const faviconUrl =
    link && !faviconError ? `${link.replace(/\/$/, "")}/favicon.ico` : null;
  return (
    <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-secondary">
      {faviconUrl ? (
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
  compact = false,
}: {
  startup: Startup;
  compact?: boolean;
}) {
  const { name, role, desc, users, mrr, founded, status, link } = startup;
  const cardClass = "card-soft pop block p-6 lowercase sm:p-8";

  const body = (
    <>
      <div className="flex items-center gap-4">
        <StartupLogo name={name} link={link} />
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
          {statusLabels[status]}
        </span>
      </div>
      <p className="mt-5 text-[16px] leading-[1.55] text-foreground">{desc}</p>
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
