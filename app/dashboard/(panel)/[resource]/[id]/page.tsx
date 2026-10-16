import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { requireAdmin } from "@/lib/auth";
import { getResource } from "@/lib/admin/resources";
import { getRecord, listPolaroids } from "@/lib/admin/store";
import { removeRecord, saveRecord } from "../../../actions";
import { DangerZone } from "../../../_components/danger-zone";
import { Notice } from "../../../_components/notice";
import { PolaroidManager } from "../../../_components/polaroid-manager";
import { RecordForm } from "../../../_components/record-form";

export default async function EditRecord({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  await requireAdmin();
  const { resource: key, id } = await params;
  const resource = getResource(key);
  if (!resource) notFound();

  const isNew = id === "new";
  const record = isNew ? null : await getRecord(resource, id);
  if (!isNew && !record) notFound();

  const slug =
    record && resource.polaroids && typeof record.slug === "string"
      ? record.slug
      : null;
  const polaroids = slug ? await listPolaroids(slug) : [];
  const here = `/dashboard/${resource.key}/${record?.id ?? "new"}`;

  return (
    <div className="mx-auto max-w-[720px] pb-28">
      <Suspense>
        <Notice />
      </Suspense>
      <Link
        href={`/dashboard/${resource.key}`}
        className="inline-flex items-center gap-1 text-[13px] font-medium text-foreground/55 hover:text-foreground"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
        {resource.label}
      </Link>
      <h1 className="mt-3 text-[28px] font-semibold tracking-[-0.03em]">
        {record ? resource.title(record) : `New ${resource.singular}`}
      </h1>

      <RecordForm
        fields={resource.fields}
        record={record}
        action={saveRecord.bind(null, resource.key, record?.id ?? null)}
        siteHref={record ? resource.siteHref(record) : null}
      />

      {(slug || (resource.polaroids && !record)) && (
        <section className="mt-6 rounded-2xl border border-border p-5 sm:p-6">
          <h2 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground/45">
            Photos
          </h2>
          {slug ? (
            <PolaroidManager slug={slug} photos={polaroids} returnTo={here} />
          ) : (
            <p className="text-[14px] text-foreground/55">
              Save first, then you can add photos.
            </p>
          )}
        </section>
      )}

      {record && (
        <DangerZone
          name={resource.title(record)}
          singular={resource.singular}
          action={removeRecord.bind(null, resource.key, record.id)}
        />
      )}
    </div>
  );
}
