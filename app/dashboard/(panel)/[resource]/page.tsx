import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getResource } from "@/lib/admin/resources";
import { listRecords } from "@/lib/admin/store";
import { primaryButton } from "../../_components/ui";

export default async function ResourceList({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  await requireAdmin();
  const resource = getResource((await params).resource);
  if (!resource) notFound();
  const records = await listRecords(resource);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="heading-serif">{resource.label}</h1>
        <Link href={`/dashboard/${resource.key}/new`} className={primaryButton}>
          new {resource.singular}
        </Link>
      </div>
      <div className="mt-8 border-t border-border">
        {records.map((record) => (
          <Link
            key={record.id}
            href={`/dashboard/${resource.key}/${record.id}`}
            className="flex items-baseline justify-between gap-6 border-b border-border py-4 hover:bg-secondary/50"
          >
            <span className="min-w-0">
              <span className="block truncate text-[17px] font-medium">
                {resource.title(record)}
              </span>
              {resource.subtitle && (
                <span className="meta block truncate">
                  {resource.subtitle(record)}
                </span>
              )}
            </span>
            <span className="shrink-0 text-[13px] font-semibold text-foreground/60">
              edit
            </span>
          </Link>
        ))}
        {records.length === 0 && (
          <p className="py-8 text-foreground/60">nothing here yet.</p>
        )}
      </div>
    </>
  );
}
