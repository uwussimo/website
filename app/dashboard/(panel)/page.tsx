import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { resources } from "@/lib/admin/resources";
import { countRecords } from "@/lib/admin/store";

export default async function DashboardPage() {
  await requireAdmin();
  const counts = await Promise.all(resources.map(countRecords));

  return (
    <>
      <h1 className="h-section">what&apos;s on the site</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, i) => (
          <Link
            key={resource.key}
            href={`/dashboard/${resource.key}`}
            className="card-soft pop block p-6"
          >
            <p className="font-semibold tracking-[-0.03em] text-[40px] leading-none">
              {counts[i]}
            </p>
            <p className="mt-2 text-[15px] text-foreground/70">
              {resource.label}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
