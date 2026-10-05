// Generic reads and writes for the dashboard, over whichever table a
// resource names.

import { db } from "@/prisma/db";
import { toStoredImage } from "@/lib/image";
import type { Resource, Row } from "./resources";

// the dashboard picks its table at run time, so it goes through this
// narrowed view of a model instead of each model's own types
type LooseModel = {
  orderBy(
    by: (row: Record<string, { asc(): unknown; desc(): unknown }>) => unknown,
  ): LooseModel;
  where(filter: Record<string, unknown>): LooseModel;
  select(...fields: string[]): LooseModel;
  all(): PromiseLike<Row[]>;
  first(key?: Record<string, unknown>): Promise<Row | null>;
  create(data: Record<string, unknown>): Promise<Row>;
  // update and delete change one row; updateAll changes every match
  update(data: Record<string, unknown>): Promise<unknown>;
  updateAll(data: Record<string, unknown>): PromiseLike<unknown>;
  delete(): Promise<unknown>;
};

const model = (name: Resource["model"] | "Polaroid" | "Media") =>
  db.orm.public[name] as unknown as LooseModel;

export async function listRecords(resource: Resource): Promise<Row[]> {
  const { field, direction } = resource.orderBy;
  return await model(resource.model)
    .orderBy((row) => row[field][direction]())
    .all();
}

export async function countRecords(resource: Resource): Promise<number> {
  return (await model(resource.model).select("id").all()).length;
}

export const getRecord = (resource: Resource, id: string) =>
  model(resource.model).first({ id });

export const createRecord = (
  resource: Resource,
  data: Record<string, unknown>,
) => model(resource.model).create(data);

export const updateRecord = (
  resource: Resource,
  id: string,
  data: Record<string, unknown>,
) => model(resource.model).where({ id }).update(data);

export const deleteRecord = (resource: Resource, id: string) =>
  model(resource.model).where({ id }).delete();

export async function storeUpload(file: File): Promise<string> {
  const image = await toStoredImage(Buffer.from(await file.arrayBuffer()));
  const media = await model("Media").select("id").create(image);
  return media.id;
}

export const deleteMedia = (id: string) =>
  model("Media").where({ id }).delete();

export type PolaroidRow = {
  id: string;
  ownerSlug: string;
  mediaId: string;
  caption: string;
  sortOrder: number;
};

export async function listPolaroids(ownerSlug: string) {
  return (await model("Polaroid")
    .where({ ownerSlug })
    .orderBy((row) => row.sortOrder.asc())
    .all()) as unknown as PolaroidRow[];
}

export const getPolaroid = async (id: string) =>
  (await model("Polaroid").first({ id })) as unknown as PolaroidRow | null;

export const createPolaroid = (data: Omit<PolaroidRow, "id">) =>
  model("Polaroid").create(data);

export const updatePolaroid = (
  id: string,
  data: Partial<Omit<PolaroidRow, "id">>,
) => model("Polaroid").where({ id }).update(data);

export const deletePolaroid = (id: string) =>
  model("Polaroid").where({ id }).delete();

/** True while any startup or work entry still uses the slug. */
export async function slugInUse(slug: string): Promise<boolean> {
  const [startup, entry] = await Promise.all([
    model("Startup").where({ slug }).first(),
    model("Experience").where({ slug }).first(),
  ]);
  return Boolean(startup || entry);
}

export async function movePolaroids(from: string, to: string) {
  await model("Polaroid")
    .where({ ownerSlug: from })
    .updateAll({ ownerSlug: to });
}
