"use client";

import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import type { PolaroidRow } from "@/lib/admin/store";
import { mediaUrl } from "@/lib/media-url";
import {
  addPolaroids,
  removePolaroid,
  reorderPhotos,
  savePolaroid,
} from "../actions";
import { ImageInput } from "./image-input";
import { Sortable } from "./sortable";
import { helpClass, iconButton, inputClass, quietButton } from "./ui";

/**
 * The photos attached to a slug: drag to reorder, captions save when you
 * leave the field, × removes.
 */
export function PolaroidManager({
  slug,
  photos,
  returnTo,
}: {
  slug: string;
  photos: PolaroidRow[];
  returnTo: string;
}) {
  const [, start] = useTransition();
  const saveCaption = (id: string, caption: string, previous: string) => {
    if (caption.trim() === previous) return;
    const data = new FormData();
    data.set("caption", caption);
    start(async () => {
      await savePolaroid(id, returnTo, data);
      toast.success("Caption saved.");
    });
  };

  return (
    <div className="space-y-5">
      {photos.length > 0 ? (
        <Sortable
          items={photos}
          layout="grid"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3"
          onReorder={(ids) =>
            start(async () => {
              await reorderPhotos(ids);
              toast.success("Order saved.");
            })
          }
          render={(photo) => (
            <div className="rounded-xl bg-surface p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-strong">
                <Image
                  src={mediaUrl(photo.mediaId)}
                  alt={photo.caption}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() =>
                    start(async () => {
                      await removePolaroid(photo.id, returnTo);
                      toast.success("Photo removed.");
                    })
                  }
                  className={`${iconButton} absolute right-1.5 top-1.5 size-7 bg-background/90 backdrop-blur hover:text-destructive`}
                >
                  <HugeiconsIcon
                    icon={Delete02Icon}
                    className="size-3.5"
                    strokeWidth={2}
                  />
                </button>
              </div>
              <input
                defaultValue={photo.caption}
                aria-label="Caption"
                placeholder="Caption"
                onBlur={(e) =>
                  saveCaption(photo.id, e.target.value, photo.caption)
                }
                onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                className={`${inputClass} mt-2 border-transparent bg-transparent px-2 py-1.5 text-[13px] hover:border-border`}
              />
            </div>
          )}
        />
      ) : (
        <p className="text-[14px] text-foreground/55">No photos yet.</p>
      )}

      <form
        action={addPolaroids.bind(null, slug, returnTo)}
        className="space-y-3"
      >
        <ImageInput name="photos" multiple required />
        <div className="flex items-center justify-between gap-4">
          <p className={helpClass}>
            The file name becomes the caption; click a caption to change it.
          </p>
          <button type="submit" className={quietButton}>
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
