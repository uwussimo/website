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

const model = (name: Resource["model"] | "Polaroid" | "Media" | "Setting") =>
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
  onHome: boolean;
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

/** The highest sortOrder in a table, so a new row can go last. */
export async function lastSortOrder(resource: Resource): Promise<number> {
  const rows = await model(resource.model).select("id", "sortOrder").all();
  return Math.max(-10, ...rows.map((row) => Number(row.sortOrder ?? 0)));
}

/** Swaps a row with its neighbour above or below. */
export async function swapWithNeighbour(
  resource: Resource,
  id: string,
  direction: "up" | "down",
) {
  const rows = (await model(resource.model)
    .select("id", "sortOrder")
    .orderBy((row) => row.sortOrder.asc())
    .all()) as { id: string; sortOrder: number }[];
  await swapRows(rows, id, direction, (rowId, sortOrder) =>
    model(resource.model).where({ id: rowId }).update({ sortOrder }),
  );
}

// swaps two neighbours' positions, touching only those two rows unless
// their orders collide, in which case every row is respaced first
async function swapRows(
  rows: { id: string; sortOrder: number }[],
  id: string,
  direction: "up" | "down",
  write: (id: string, sortOrder: number) => Promise<unknown>,
) {
  const index = rows.findIndex((row) => row.id === id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || !rows[target]) return;
  const a = rows[index];
  const b = rows[target];
  if (a.sortOrder === b.sortOrder) {
    await Promise.all(rows.map((row, i) => write(row.id, i * 10)));
    rows.forEach((row, i) => (row.sortOrder = i * 10));
  }
  await Promise.all([write(a.id, b.sortOrder), write(b.id, a.sortOrder)]);
}

export async function swapPolaroidWithNeighbour(
  id: string,
  direction: "up" | "down",
) {
  const current = await getPolaroid(id);
  if (!current) return;
  const rows = await listPolaroids(current.ownerSlug);
  await swapRows(rows, id, direction, (rowId, sortOrder) =>
    updatePolaroid(rowId, { sortOrder }),
  );
}

export async function saveSetting(key: string, value: unknown) {
  const existing = await model("Setting").where({ key }).first();
  const json = JSON.parse(JSON.stringify(value));
  if (existing) await model("Setting").where({ key }).update({ value: json });
  else await model("Setting").create({ key, value: json });
}

/** Writes a new order for the given rows: position in the list wins. */
export async function reorderRecords(resource: Resource, orderedIds: string[]) {
  await Promise.all(
    orderedIds.map((id, i) =>
      model(resource.model)
        .where({ id })
        .update({ sortOrder: i * 10 }),
    ),
  );
}

export async function reorderPolaroids(orderedIds: string[]) {
  await Promise.all(
    orderedIds.map((id, i) => updatePolaroid(id, { sortOrder: i * 10 })),
  );
}

export async function changePassword(userId: string, passwordHash: string) {
  await db.orm.public.AdminUser.where({ id: userId }).update({ passwordHash });
  // other devices have to sign in again
  await db.orm.public.Session.where({ userId }).deleteAll();
}
