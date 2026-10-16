"use client";

import Image from "next/image";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import type { Photo } from "@/lib/content";
import type { StripPhoto } from "@/lib/settings";
import { mediaUrl } from "@/lib/media-url";
import { cn } from "@/lib/utils";
import { Sortable } from "./sortable";
import { quietButton } from "./ui";

/**
 * The home page photo strip: drag to reorder, × to remove, and a picker of
 * every photo on the site to add from. Serialises to a hidden field.
 */
export function StripEditor({
  name,
  value,
  photos,
  onChange,
}: {
  name: string;
  value: StripPhoto[];
  photos: Photo[];
  onChange?: () => void;
}) {
  const [strip, setStrip] = useState(value);
  const [picking, setPicking] = useState(false);
  const used = new Set(strip.map((p) => p.mediaId));
  const available = photos.filter((p) => !used.has(p.mediaId));

  const set = (next: StripPhoto[]) => {
    setStrip(next);
    onChange?.();
  };

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(strip)} />
      {strip.length > 0 ? (
        <Sortable
          items={strip.map((p) => ({ ...p, id: p.mediaId }))}
          onReorder={(ids) =>
            set(ids.map((id) => strip.find((p) => p.mediaId === id)!))
          }
          layout="grid"
          className="grid grid-cols-3 gap-3 sm:grid-cols-4"
          render={(photo) => (
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-strong">
              <Image
                src={mediaUrl(photo.mediaId)}
                alt={photo.caption}
                fill
                sizes="160px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  set(strip.filter((p) => p.mediaId !== photo.mediaId))
                }
                aria-label={`Remove ${photo.caption}`}
                className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-full bg-background/90 text-foreground/70 backdrop-blur hover:text-destructive"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  className="size-3.5"
                  strokeWidth={2.5}
                />
              </button>
            </div>
          )}
        />
      ) : (
        <p className="text-[14px] text-foreground/55">
          No photos in the strip yet.
        </p>
      )}

      <button
        type="button"
        onClick={() => setPicking((v) => !v)}
        className={cn(quietButton, "mt-4")}
      >
        <HugeiconsIcon icon={Add01Icon} className="size-4" strokeWidth={2} />
        {picking ? "Done adding" : "Add photos"}
      </button>

      {picking && (
        <div className="mt-3 rounded-xl border border-border bg-surface p-3">
          {available.length === 0 ? (
            <p className="text-[13px] text-foreground/55">
              Every photo is already in the strip. Upload more under a startup
              or Instagram.
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {available.map((photo) => (
                <button
                  key={photo.mediaId}
                  type="button"
                  onClick={() =>
                    set([
                      ...strip,
                      { mediaId: photo.mediaId, caption: photo.caption },
                    ])
                  }
                  title={`Add ${photo.caption}`}
                  className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-strong ring-foreground transition hover:ring-2"
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
