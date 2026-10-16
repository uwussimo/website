"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdmin, requireAdmin, signIn, signOut } from "@/lib/auth";
import { getSettingsPage } from "@/lib/admin/settings-forms";
import type { SettingGroup } from "@/lib/settings";
import { getSettings } from "@/lib/content";
import { hashPassword, verifyPassword } from "@/lib/password";
import { db } from "@/prisma/db";
import { getResource, type Field, type Resource } from "@/lib/admin/resources";
import { slugify } from "@/lib/admin/slug";
import {
  changePassword,
  createPolaroid,
  createRecord,
  deleteMedia,
  deletePolaroid,
  deleteRecord,
  getPolaroid,
  getRecord,
  lastSortOrder,
  listPolaroids,
  movePolaroids,
  reorderPolaroids,
  reorderRecords,
  saveSetting,
  slugInUse,
  storeUpload,
  swapPolaroidWithNeighbour,
  swapWithNeighbour,
  updatePolaroid,
  updateRecord,
} from "@/lib/admin/store";

export type FormState = {
  error: string | null;
  /** the field the error is about, when there is one */
  field?: string;
  /** set after a successful save, so the form can say so */
  savedAt?: number;
};

// every public page is rendered ahead of time; this throws them all away
const refreshSite = () => revalidatePath("/", "layout");

// `returnTo` travels through the browser, so only ever go back to a
// dashboard page
const backTo = (returnTo: string): never =>
  redirect(returnTo.startsWith("/dashboard/") ? returnTo : "/dashboard");

const uploaded = (value: FormDataEntryValue | null): File | null =>
  value instanceof File && value.size > 0 ? value : null;

class FieldError extends Error {
  constructor(
    public field: string,
    message: string,
  ) {
    super(message);
  }
}

export async function login(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const error = await signIn(
    String(formData.get("email") ?? ""),
    String(formData.get("password") ?? ""),
  );
  if (error) return { error };
  redirect("/dashboard");
}

export async function logout() {
  await signOut();
  redirect("/dashboard/login");
}

const readTimeFor = (markdown: string) => {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
};

/** Reads one field out of a submitted form, or throws a message to show. */
function readField(
  field: Field,
  formData: FormData,
  all: Record<string, unknown>,
  existing: Record<string, unknown> | null,
): unknown {
  const raw = formData.get(field.name);
  const text = typeof raw === "string" ? raw.trim() : "";
  const missing = () => new FieldError(field.name, `${field.label} is needed.`);

  switch (field.type) {
    case "checkbox":
      return raw === "on";
    case "lines":
      return text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    case "number": {
      if (text === "") {
        if (field.required) throw missing();
        return 0;
      }
      const number = Number(text.replace(",", "."));
      if (Number.isNaN(number)) {
        throw new FieldError(field.name, `${field.label} must be a number.`);
      }
      return number;
    }
    case "month":
      if (formData.get(`${field.name}__present`) === "on") return "present";
      return text || null;
    case "slug": {
      if (!text && existing?.[field.name]) return existing[field.name];
      const source = field.from ? String(all[field.from] ?? "") : "";
      const slug = slugify(text || source);
      if (!slug && field.required) throw missing();
      return slug || null;
    }
    case "url":
      if (text && !/^https?:\/\//i.test(text)) return `https://${text}`;
      return text || null;
    default:
      if (text === "" && field.required) throw missing();
      return text || null;
  }
}

export async function saveRecord(
  resourceKey: string,
  id: string | null,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const resource = getResource(resourceKey);
  if (!resource) return { error: "Unknown section." };

  const existing = id ? await getRecord(resource, id) : null;
  if (id && !existing) return { error: "This record no longer exists." };

  const data: Record<string, unknown> = {};
  const replacedMedia: string[] = [];

  try {
    // plain fields first, so slugs can be derived from them
    const ordered = [...resource.fields].sort(
      (a, b) => Number(a.type === "slug") - Number(b.type === "slug"),
    );
    for (const field of ordered) {
      if (field.type === "image") {
        const current = (existing?.[field.name] as string | null) ?? null;
        const file = uploaded(formData.get(field.name));
        if (file) {
          data[field.name] = await storeUpload(file);
          if (current) replacedMedia.push(current);
        } else if (formData.get(`${field.name}__remove`) === "on") {
          if (field.required)
            throw new FieldError(field.name, `${field.label} is needed.`);
          data[field.name] = null;
          if (current) replacedMedia.push(current);
        } else if (!current && field.required) {
          throw new FieldError(
            field.name,
            `Add a ${field.label.toLowerCase()}.`,
          );
        }
        continue;
      }
      data[field.name] = readField(field, formData, data, existing);
    }

    // the system fills in what it can work out itself
    if (resource.model === "Essay" && !data.readTime) {
      data.readTime = readTimeFor(String(data.content ?? ""));
    }
    if (!existing && resource.reorderable) {
      data.sortOrder = (await lastSortOrder(resource)) + 10;
    }

    if (existing) {
      await updateRecord(resource, existing.id, data);
      await followSlugChange(resource, existing.slug, data.slug);
    } else {
      const created = await createRecord(resource, data);
      await Promise.all(replacedMedia.map(deleteMedia));
      refreshSite();
      redirect(`/dashboard/${resource.key}/${created.id}?created=1`);
    }
  } catch (error) {
    if (isRedirect(error)) throw error;
    const message = error instanceof Error ? error.message : String(error);
    if (/unique|duplicate/i.test(message)) {
      return {
        error: "That address is already used by another record.",
        field: "slug",
      };
    }
    return {
      error: message,
      field: error instanceof FieldError ? error.field : undefined,
    };
  }

  await Promise.all(replacedMedia.map(deleteMedia));
  refreshSite();
  return { error: null, savedAt: Date.now() };
}

// next signals a redirect by throwing; it must pass through untouched
const isRedirect = (error: unknown) =>
  typeof error === "object" &&
  error !== null &&
  "digest" in error &&
  String((error as { digest: unknown }).digest).startsWith("NEXT_REDIRECT");

// polaroids hang off a slug, so they follow it when it is renamed, unless
// another startup or work entry still uses the old one
async function followSlugChange(
  resource: Resource,
  before: unknown,
  after: unknown,
) {
  if (!resource.polaroids) return;
  if (typeof before !== "string" || typeof after !== "string") return;
  if (before === after || (await slugInUse(before))) return;
  await movePolaroids(before, after);
}

export async function removeRecord(resourceKey: string, id: string) {
  await requireAdmin();
  const resource = getResource(resourceKey);
  if (!resource) return;
  const existing = await getRecord(resource, id);
  if (!existing) redirect(`/dashboard/${resourceKey}`);

  await deleteRecord(resource, id);

  for (const field of resource.fields) {
    const mediaId = existing[field.name];
    if (field.type === "image" && typeof mediaId === "string") {
      await deleteMedia(mediaId);
    }
  }
  const slug = existing.slug;
  if (resource.polaroids && typeof slug === "string") {
    if (!(await slugInUse(slug))) {
      for (const polaroid of await listPolaroids(slug)) {
        await deletePolaroid(polaroid.id);
        await deleteMedia(polaroid.mediaId);
      }
    }
  }

  refreshSite();
  redirect(
    `/dashboard/${resource.key}?deleted=${encodeURIComponent(resource.title(existing))}`,
  );
}

export async function moveRecord(
  resourceKey: string,
  id: string,
  direction: "up" | "down",
) {
  await requireAdmin();
  const resource = getResource(resourceKey);
  if (!resource?.reorderable) return;
  await swapWithNeighbour(resource, id, direction);
  refreshSite();
}

// "02-team-offsite.jpg" -> "team offsite"
const captionFromFileName = (name: string) =>
  name
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .toLowerCase();

export async function addPolaroids(
  ownerSlug: string,
  returnTo: string,
  formData: FormData,
) {
  await requireAdmin();
  const files = formData
    .getAll("photos")
    .map(uploaded)
    .filter((file) => file !== null);

  const existing = await listPolaroids(ownerSlug);
  let sortOrder = Math.max(-10, ...existing.map((p) => p.sortOrder));
  for (const file of files) {
    sortOrder += 10;
    await createPolaroid({
      ownerSlug,
      mediaId: await storeUpload(file),
      caption: captionFromFileName(file.name),
      onHome: false,
      sortOrder,
    });
  }

  refreshSite();
  backTo(`${returnTo}?photos=${files.length}`);
}

export async function savePolaroid(
  id: string,
  returnTo: string,
  formData: FormData,
) {
  await requireAdmin();
  await updatePolaroid(id, {
    caption: String(formData.get("caption") ?? "").trim(),
  });
  refreshSite();
  backTo(returnTo);
}

export async function movePolaroid(
  id: string,
  direction: "up" | "down",
  returnTo: string,
) {
  await requireAdmin();
  await swapPolaroidWithNeighbour(id, direction);
  refreshSite();
  backTo(returnTo);
}

export async function removePolaroid(id: string, returnTo: string) {
  await requireAdmin();
  const polaroid = await getPolaroid(id);
  if (polaroid) {
    await deletePolaroid(id);
    await deleteMedia(polaroid.mediaId);
  }
  refreshSite();
  backTo(returnTo);
}

// ---- site settings, ordering, uploads and the account

export async function saveSettings(
  group: SettingGroup,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const page = getSettingsPage(group);
  if (!page) return { error: "Unknown page." };
  const current = (await getSettings())[group] as Record<string, unknown>;
  const data: Record<string, unknown> = { ...current };
  const replacedMedia: string[] = [];

  try {
    for (const field of page.fields) {
      if (field.type === "image") {
        const existing = (current[field.name] as string | null) ?? null;
        const file = uploaded(formData.get(field.name));
        if (file) {
          data[field.name] = await storeUpload(file);
          if (existing) replacedMedia.push(existing);
        } else if (formData.get(`${field.name}__remove`) === "on") {
          data[field.name] = null;
          if (existing) replacedMedia.push(existing);
        }
        continue;
      }
      if (field.type === "stats" || field.type === "strip") {
        data[field.name] = JSON.parse(String(formData.get(field.name) || "[]"));
        continue;
      }
      data[field.name] = readField(field, formData, data, null);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      error: message,
      field: error instanceof FieldError ? error.field : undefined,
    };
  }

  await saveSetting(group, data);
  await Promise.all(replacedMedia.map(deleteMedia));
  refreshSite();
  return { error: null, savedAt: Date.now() };
}

/** Drag-and-drop result: the rows in their new order. */
export async function reorder(resourceKey: string, orderedIds: string[]) {
  await requireAdmin();
  const resource = getResource(resourceKey);
  if (!resource?.reorderable) return;
  await reorderRecords(resource, orderedIds);
  refreshSite();
}

export async function reorderPhotos(orderedIds: string[]) {
  await requireAdmin();
  await reorderPolaroids(orderedIds);
  refreshSite();
}

/** An image dropped into the essay editor; returns where it is served. */
export async function uploadInlineImage(
  formData: FormData,
): Promise<{ url: string } | { error: string }> {
  await requireAdmin();
  const file = uploaded(formData.get("file"));
  if (!file) return { error: "No image received." };
  const id = await storeUpload(file);
  return { url: `/media/${id}` };
}

export async function updatePassword(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const admin = await getAdmin();
  if (!admin) redirect("/dashboard/login");
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const again = String(formData.get("again") ?? "");
  if (next.length < 12) {
    return { error: "Use at least 12 characters.", field: "next" };
  }
  if (next !== again) {
    return { error: "The two new passwords don't match.", field: "again" };
  }
  const user = await db.orm.public.AdminUser.first({ id: admin.id });
  if (!user || !verifyPassword(current, user.passwordHash)) {
    return { error: "That isn't your current password.", field: "current" };
  }
  await changePassword(admin.id, hashPassword(next));
  await signOut();
  redirect("/dashboard/login?changed=1");
}
