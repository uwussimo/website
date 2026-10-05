import Image from "next/image";
import { listPolaroids } from "@/lib/admin/store";
import { mediaUrl } from "@/lib/media-url";
import { addPolaroids, removePolaroid, savePolaroid } from "../actions";
import { ImageInput } from "./image-input";
import { helpClass, inputClass, labelClass, quietButton } from "./ui";

/** The polaroids attached to a slug: reorder, recaption, remove, add. */
export async function PolaroidManager({
  slug,
  returnTo,
}: {
  slug: string;
  /** the page to come back to after each change */
  returnTo: string;
}) {
  const polaroids = await listPolaroids(slug);

  return (
    <section className="mt-14 border-t border-border pt-10">
      <h2 className="font-serif text-[26px] leading-tight">polaroids</h2>
      <p className={helpClass}>
        shown on the startups and work pages for anything with the slug “{slug}
        ”.
      </p>

      <div className="mt-6 space-y-4">
        {polaroids.map((polaroid) => (
          <div key={polaroid.id} className="flex items-end gap-4">
            <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-md border border-border bg-secondary">
              <Image
                src={mediaUrl(polaroid.mediaId)}
                alt={polaroid.caption}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <form
              action={savePolaroid.bind(null, polaroid.id, returnTo)}
              className="flex flex-1 flex-wrap items-end gap-3"
            >
              <div className="min-w-[160px] flex-1">
                <label className={labelClass}>caption</label>
                <input
                  name="caption"
                  defaultValue={polaroid.caption}
                  className={inputClass}
                />
              </div>
              <div className="w-20">
                <label className={labelClass}>order</label>
                <input
                  name="sortOrder"
                  inputMode="numeric"
                  defaultValue={polaroid.sortOrder}
                  className={inputClass}
                />
              </div>
              <button type="submit" className={quietButton}>
                save
              </button>
            </form>
            <form action={removePolaroid.bind(null, polaroid.id, returnTo)}>
              <button type="submit" className={quietButton}>
                remove
              </button>
            </form>
          </div>
        ))}
        {polaroids.length === 0 && (
          <p className="text-[14px] text-foreground/60">no polaroids yet.</p>
        )}
      </div>

      <form
        action={addPolaroids.bind(null, slug, returnTo)}
        className="mt-8 flex flex-wrap items-end gap-3"
      >
        <div className="min-w-[240px] flex-1">
          <label className={labelClass}>add photos</label>
          <ImageInput name="photos" multiple required />
        </div>
        <button type="submit" className={quietButton}>
          upload
        </button>
      </form>
      <p className={helpClass}>
        the file name becomes the caption; you can edit it afterwards.
      </p>
    </section>
  );
}
