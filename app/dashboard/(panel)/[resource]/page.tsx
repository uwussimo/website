import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { requireAdmin } from "@/lib/auth";
import { getResource, type Resource, type Row } from "@/lib/admin/resources";
import { listRecords } from "@/lib/admin/store";
import { Notice } from "../../_components/notice";
import { RecordList, type ListRow } from "../../_components/record-list";
import { primaryButton } from "../../_components/ui";

const toRow = (resource: Resource, record: Row): ListRow => ({
  id: record.id,
  href: `/dashboard/${resource.key}/${record.id}`,
  title: resource.title(record),
  subtitle: resource.subtitle?.(record),
  chip: resource.chip?.(record) ?? null,
  thumb: resource.thumbnail
    ? ((record[resource.thumbnail] as string | null) ?? null)
    : null,
});

export default async function ResourceList({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  await requireAdmin();
  const resource = getResource((await params).resource);
  if (!resource) notFound();
  const records = await listRecords(resource);

  // lists that the site shows in sections get one draggable list per section
  const groups = resource.groupBy
    ? resource.groupBy.groups.map((g) => ({
        label: g.label,
        rows: records
          .filter((r) => r[resource.groupBy!.field] === g.value)
          .map((r) => toRow(resource, r)),
      }))
    : [{ label: null, rows: records.map((r) => toRow(resource, r)) }];

  return (
    <>
      <Suspense>
        <Notice />
      </Suspense>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.03em]">
            {resource.label}
          </h1>
          <p className="mt-1 text-foreground/60">
            {records.length === 0
              ? "Nothing here yet."
              : `${records.length} ${records.length === 1 ? resource.singular : resource.label.toLowerCase()}${resource.reorderable ? " · drag to change the order on the site" : ""}`}
          </p>
        </div>
        <Link href={`/dashboard/${resource.key}/new`} className={primaryButton}>
          <HugeiconsIcon icon={Add01Icon} className="size-4" strokeWidth={2} />
          New {resource.singular}
        </Link>
      </div>

      {records.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border px-6 py-14 text-center">
          <p className="text-foreground/60">
            No {resource.label.toLowerCase()} yet.
          </p>
          <Link
            href={`/dashboard/${resource.key}/new`}
            className={`${primaryButton} mt-4`}
          >
            <HugeiconsIcon
              icon={Add01Icon}
              className="size-4"
              strokeWidth={2}
            />
            Add the first {resource.singular}
          </Link>
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.label ?? "all"} className="mt-6">
            {group.label && (
              <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground/45">
                {group.label} · {group.rows.length}
              </h2>
            )}
            <div className="overflow-hidden rounded-2xl border border-border [&>div>div:last-child>div]:border-b-0 [&>div>div:last-child]:border-b-0">
              {group.rows.length === 0 ? (
                <p className="px-4 py-6 text-[14px] text-foreground/55">
                  Nothing in {group.label?.toLowerCase()} yet.
                </p>
              ) : (
                <RecordList
                  resourceKey={resource.key}
                  rows={group.rows}
                  reorderable={Boolean(resource.reorderable)}
                />
              )}
            </div>
          </section>
        ))
      )}
    </>
  );
}
