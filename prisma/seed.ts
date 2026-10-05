// Loads the starter content into an empty database and creates the admin
// login. Safe to run again: a table that already has rows is left alone.
//
//   node prisma/seed.ts
//
// Reads ADMIN_EMAIL and ADMIN_PASSWORD from .env.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { db } from "./db.ts";
import { hashPassword } from "../lib/password.ts";
import { toStoredImage } from "../lib/image.ts";
import {
  earlyDays,
  education,
  experience,
  featuredStartups,
  instagramPosts,
  places,
  startups,
  talks,
} from "./seed-data.ts";

const ASSETS = path.join(import.meta.dirname, "seed-assets");
const orm = db.orm.public;

const isEmpty = async (rows: PromiseLike<unknown[]>) =>
  (await rows).length === 0;

async function storeImage(file: string): Promise<string> {
  const image = await toStoredImage(fs.readFileSync(file));
  const media = await orm.Media.select("id").create(image);
  return media.id;
}

// "/instagram/tashkent.webp" in the seed data -> the file under seed-assets
const asset = (src: string) => path.join(ASSETS, src);

async function seedAdmin() {
  const email = process.env["ADMIN_EMAIL"]?.trim().toLowerCase();
  const password = process.env["ADMIN_PASSWORD"];
  if (!email || !password) {
    console.log("admin: skipped, set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
    return;
  }
  const existing = await orm.AdminUser.where({ email }).first();
  if (existing) {
    console.log(`admin: ${email} already exists, left unchanged`);
    return;
  }
  await orm.AdminUser.create({ email, passwordHash: hashPassword(password) });
  console.log(`admin: created ${email}`);
}

async function seedStartups() {
  if (!(await isEmpty(orm.Startup.select("id").limit(1).all()))) return;
  for (const [i, s] of startups.entries()) {
    await orm.Startup.create({
      slug: s.slug,
      name: s.name,
      role: s.role,
      description: s.desc,
      users: s.users,
      mrr: s.mrr,
      founded: s.founded,
      status: s.status,
      link: s.link,
      featured: featuredStartups.includes(s.slug),
      sortOrder: i * 10,
    });
  }
  console.log(`startups: ${startups.length}`);
}

async function seedExperience() {
  if (!(await isEmpty(orm.Experience.select("id").limit(1).all()))) return;
  const groups = { work: experience, education, early: earlyDays };
  for (const [kind, items] of Object.entries(groups)) {
    for (const [i, e] of items.entries()) {
      await orm.Experience.create({
        kind,
        company: e.company,
        slug: e.slug ?? null,
        link: e.link ?? null,
        role: e.role,
        startDate: e.start ?? null,
        endDate: e.end ?? null,
        whenLabel: e.when ?? null,
        note: e.note ?? null,
        location: e.location ?? null,
        summary: e.summary ?? null,
        highlights: e.highlights,
        sortOrder: i * 10,
      });
    }
    console.log(`experience (${kind}): ${items.length}`);
  }
}

async function seedPolaroids() {
  if (!(await isEmpty(orm.Polaroid.select("id").limit(1).all()))) return;
  const root = path.join(ASSETS, "startups");
  for (const slug of fs.readdirSync(root)) {
    const files = fs
      .readdirSync(path.join(root, slug))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort();
    for (const [i, file] of files.entries()) {
      await orm.Polaroid.create({
        ownerSlug: slug,
        mediaId: await storeImage(path.join(root, slug, file)),
        // "02-team-offsite.webp" -> "team offsite"
        caption: file
          .replace(/\.[^.]+$/, "")
          .replace(/^\d+[-_ ]*/, "")
          .replace(/[-_]+/g, " "),
        sortOrder: i * 10,
      });
    }
    console.log(`polaroids (${slug}): ${files.length}`);
  }
}

async function seedEssays() {
  if (!(await isEmpty(orm.Essay.select("id").limit(1).all()))) return;
  const dir = path.join(ASSETS, "essays");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const { data, content } = matter(fs.readFileSync(path.join(dir, file)));
    const slug = file.replace(/\.md$/, "");
    await orm.Essay.create({
      slug,
      title: (data["title"] as string) ?? slug,
      date: (data["date"] as string) ?? "",
      readTime: (data["readTime"] as string) ?? "5 min",
      description: (data["description"] as string) ?? null,
      content,
    });
  }
  console.log(`essays: ${files.length}`);
}

async function seedTalks() {
  if (!(await isEmpty(orm.Talk.select("id").limit(1).all()))) return;
  for (const [i, t] of talks.entries()) {
    await orm.Talk.create({
      title: t.title,
      place: t.place,
      dateLabel: t.dateLabel,
      text: t.text,
      href: t.href,
      photoId: t.photo ? await storeImage(asset(t.photo.src)) : null,
      photoAlt: t.photo?.alt ?? null,
      sortOrder: i * 10,
    });
  }
  console.log(`talks: ${talks.length}`);
}

async function seedPlaces() {
  if (!(await isEmpty(orm.Place.select("id").limit(1).all()))) return;
  for (const [i, p] of places.entries()) {
    await orm.Place.create({
      name: p.name,
      latitude: p.location[0],
      longitude: p.location[1],
      photoId: p.photo ? await storeImage(asset(p.photo.src)) : null,
      photoAlt: p.photo?.alt ?? null,
      photoFocus: p.photo?.focus ?? null,
      sortOrder: i * 10,
    });
  }
  console.log(`places: ${places.length}`);
}

async function seedInstagram() {
  if (!(await isEmpty(orm.InstagramPost.select("id").limit(1).all()))) return;
  for (const [i, p] of instagramPosts.entries()) {
    await orm.InstagramPost.create({
      href: p.href,
      mediaId: await storeImage(asset(p.src)),
      alt: p.alt,
      caption: p.caption,
      place: p.place,
      dateLabel: p.date,
      focus: p.focus ?? null,
      sortOrder: i * 10,
    });
  }
  console.log(`instagram posts: ${instagramPosts.length}`);
}

try {
  await seedAdmin();
  await seedStartups();
  await seedExperience();
  await seedPolaroids();
  await seedEssays();
  await seedTalks();
  await seedPlaces();
  await seedInstagram();
} finally {
  await db.close();
}
