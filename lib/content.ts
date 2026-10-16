// Everything the public pages read from the database. Pages are rendered
// ahead of time and refreshed when the dashboard saves a change.

import { db } from "@/prisma/db";
import { mediaUrl } from "./media-url";

const orm = db.orm.public;

export async function getStartups() {
  return await orm.Startup.orderBy((s) => s.sortOrder.asc()).all();
}
export type Startup = Awaited<ReturnType<typeof getStartups>>[number];

export async function getExperience(kind: "work" | "education") {
  return await orm.Experience.where({ kind })
    .orderBy((e) => e.sortOrder.asc())
    .all();
}
export type Experience = Awaited<ReturnType<typeof getExperience>>[number];

export type Photo = { src: string; caption: string; mediaId: string };

/** Every polaroid, grouped by the slug of the startup or job it belongs to. */
export async function getPolaroids(): Promise<Record<string, Photo[]>> {
  const rows = await orm.Polaroid.orderBy((p) => p.sortOrder.asc()).all();
  const bySlug: Record<string, Photo[]> = {};
  for (const { ownerSlug, mediaId, caption } of rows) {
    (bySlug[ownerSlug] ??= []).push({
      src: mediaUrl(mediaId),
      caption,
      mediaId,
    });
  }
  return bySlug;
}

export async function getEssays() {
  return await orm.Essay.select(
    "slug",
    "title",
    "date",
    "readTime",
    "description",
  )
    .where({ published: true })
    .orderBy((e) => e.date.desc())
    .all();
}
export type EssayMeta = Awaited<ReturnType<typeof getEssays>>[number];

export async function getEssay(slug: string) {
  return await orm.Essay.where({ slug, published: true }).first();
}

export async function getTalks() {
  return await orm.Talk.orderBy((t) => t.sortOrder.asc()).all();
}

export async function getPlaces() {
  return await orm.Place.orderBy((p) => p.sortOrder.asc()).all();
}

export async function getInstagramPosts() {
  return await orm.InstagramPost.orderBy((p) => p.sortOrder.asc()).all();
}
export type InstagramPost = Awaited<
  ReturnType<typeof getInstagramPosts>
>[number];

export async function getStartup(slug: string) {
  return await orm.Startup.where({ slug }).first();
}

/** All work history, newest section first, for the about page. */
export async function getAllExperience() {
  return await orm.Experience.orderBy((e) => e.sortOrder.asc()).all();
}

/** The work entry that shares a startup's slug, if there is one. */
export async function getExperienceForSlug(slug: string) {
  return await orm.Experience.where({ slug }).first();
}

export type MediaSize = { width: number; height: number };

/** Pixel sizes of stored images, so tickers can keep their aspect ratio. */
export async function getMediaSizes(
  ids: string[],
): Promise<Record<string, MediaSize>> {
  if (ids.length === 0) return {};
  const rows = await orm.Media.select("id", "width", "height")
    .where((m) => m.id.in(ids))
    .all();
  return Object.fromEntries(
    rows.map(({ id, width, height }) => [id, { width, height }]),
  );
}

/** First polaroid per slug, used as the cover image of a startup. */
export async function getCovers(): Promise<Record<string, string>> {
  const photos = await getPolaroids();
  return Object.fromEntries(
    Object.entries(photos).map(([slug, list]) => [slug, list[0].src]),
  );
}

/** The curated photos in the home page strip, polaroids first. */
export async function getHomePhotos(): Promise<Photo[]> {
  const [polaroids, posts] = await Promise.all([
    orm.Polaroid.where({ onHome: true })
      .orderBy((p) => p.sortOrder.asc())
      .all(),
    orm.InstagramPost.where({ onHome: true })
      .orderBy((p) => p.sortOrder.asc())
      .all(),
  ]);
  return [...polaroids, ...posts].map(({ mediaId, caption }) => ({
    src: mediaUrl(mediaId),
    caption,
    mediaId,
  }));
}
