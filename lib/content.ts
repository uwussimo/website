// Everything the public pages read from the database. Pages are rendered
// ahead of time and refreshed when the dashboard saves a change.

import { db } from "@/prisma/db";
import { mediaUrl } from "./media-url";

const orm = db.orm.public;

export async function getStartups() {
  return await orm.Startup.orderBy((s) => s.sortOrder.asc()).all();
}
export type Startup = Awaited<ReturnType<typeof getStartups>>[number];

export async function getExperience(kind: "work" | "education" | "early") {
  return await orm.Experience.where({ kind })
    .orderBy((e) => e.sortOrder.asc())
    .all();
}
export type Experience = Awaited<ReturnType<typeof getExperience>>[number];

export type Photo = { src: string; caption: string };

/** Every polaroid, grouped by the slug of the startup or job it belongs to. */
export async function getPolaroids(): Promise<Record<string, Photo[]>> {
  const rows = await orm.Polaroid.orderBy((p) => p.sortOrder.asc()).all();
  const bySlug: Record<string, Photo[]> = {};
  for (const { ownerSlug, mediaId, caption } of rows) {
    (bySlug[ownerSlug] ??= []).push({ src: mediaUrl(mediaId), caption });
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
