import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getResource } from "@/lib/admin/resources";
import { getRecord } from "@/lib/admin/store";
import { removeRecord, saveRecord } from "../../../actions";
import { PolaroidManager } from "../../../_components/polaroid-manager";
import { RecordForm } from "../../../_components/record-form";
import { quietButton } from "../../../_components/ui";

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

  const slug = record && resource.polaroids ? record.slug : null;

  return (
    <div className="max-w-[640px]">
      <Link
        href={`/dashboard/${resource.key}`}
        className="meta hover:text-foreground"
      >
        ← {resource.label}
      </Link>
      <h1 className="heading-serif mb-8 mt-3">
        {record ? resource.title(record) : `new ${resource.singular}`}
      </h1>

      <RecordForm
        fields={resource.fields}
        record={record}
        action={saveRecord.bind(null, resource.key, record?.id ?? null)}
      />

      {typeof slug === "string" && record && (
        <PolaroidManager
          slug={slug}
          returnTo={`/dashboard/${resource.key}/${record.id}`}
        />
      )}

      {record && (
        <details className="mt-14 border-t border-border pt-8">
          <summary className="cursor-pointer text-[14px] font-semibold text-foreground/60">
            delete this {resource.singular}
          </summary>
          <form
            action={removeRecord.bind(null, resource.key, record.id)}
            className="mt-4"
          >
            <p className="mb-4 text-[14px] text-foreground/70">
              this removes it from the site for good, along with its images.
            </p>
            <button type="submit" className={quietButton}>
              yes, delete it
            </button>
          </form>
        </details>
      )}
    </div>
  );
}
