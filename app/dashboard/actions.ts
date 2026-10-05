"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, signIn, signOut } from "@/lib/auth";
import { getResource, type Field, type Resource } from "@/lib/admin/resources";
import {
  createPolaroid,
  createRecord,
  deleteMedia,
  deletePolaroid,
  deleteRecord,
  getPolaroid,
  getRecord,
  listPolaroids,
  movePolaroids,
  slugInUse,
  storeUpload,
  updatePolaroid,
  updateRecord,
} from "@/lib/admin/store";

export type FormState = { error: string | null };

// every public page is rendered ahead of time; this throws them all away
const refreshSite = () => revalidatePath("/", "layout");

// `returnTo` travels through the browser, so only ever go back to a
// dashboard page
const backTo = (returnTo: string): never =>
  redirect(returnTo.startsWith("/dashboard/") ? returnTo : "/dashboard");

const uploaded = (value: FormDataEntryValue | null): File | null =>
  value instanceof File && value.size > 0 ? value : null;

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

/** Reads one field out of a submitted form, or throws a message to show. */
function readField(field: Field, formData: FormData): unknown {
  const raw = formData.get(field.name);
  const text = typeof raw === "string" ? raw.trim() : "";

  switch (field.type) {
    case "checkbox":
      return raw === "on";
    case "lines":
      return text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    case "number": {
      if (text === "" && !field.required) return 0;
      const number = Number(text);
      if (text === "" || Number.isNaN(number)) {
        throw new Error(`${field.label} needs a number`);
      }
      return number;
    }
    default:
      if (text === "" && field.required) {
        throw new Error(`${field.label} is required`);
      }
      return text === "" ? null : text;
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
  if (!resource) return { error: "unknown section" };

  const existing = id ? await getRecord(resource, id) : null;
  if (id && !existing) return { error: "this record no longer exists" };

  const data: Record<string, unknown> = {};
  const replacedMedia: string[] = [];

  try {
    for (const field of resource.fields) {
      if (field.type !== "image") {
        data[field.name] = readField(field, formData);
        continue;
      }
      const current = (existing?.[field.name] as string | null) ?? null;
      const file = uploaded(formData.get(field.name));
      if (file) {
        data[field.name] = await storeUpload(file);
        if (current) replacedMedia.push(current);
      } else if (formData.get(`${field.name}__remove`) === "on") {
        if (field.required) throw new Error(`${field.label} is required`);
        data[field.name] = null;
        if (current) replacedMedia.push(current);
      } else if (!current && field.required) {
        throw new Error(`${field.label} is required`);
      }
    }

    if (existing) {
      await updateRecord(resource, existing.id, data);
      await followSlugChange(resource, existing.slug, data.slug);
    } else {
      await createRecord(resource, data);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      error: /unique|duplicate/i.test(message)
        ? "that slug is already taken"
        : message,
    };
  }

  await Promise.all(replacedMedia.map(deleteMedia));
  refreshSite();
  redirect(`/dashboard/${resource.key}`);
}

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
  redirect(`/dashboard/${resource.key}`);
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
      sortOrder,
    });
  }

  refreshSite();
  backTo(returnTo);
}

export async function savePolaroid(
  id: string,
  returnTo: string,
  formData: FormData,
) {
  await requireAdmin();
  const sortOrder = Number(formData.get("sortOrder"));
  await updatePolaroid(id, {
    caption: String(formData.get("caption") ?? "").trim(),
    sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
  });
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
