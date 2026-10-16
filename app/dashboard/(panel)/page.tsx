import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { requireAdmin } from "@/lib/auth";
import { resources } from "@/lib/admin/resources";
import { countRecords } from "@/lib/admin/store";
import { primaryButton, quietButton } from "../_components/ui";

export default async function DashboardPage() {
  await requireAdmin();
  const counts = await Promise.all(resources.map(countRecords));

  return (
    <>
      <h1 className="text-[28px] font-semibold tracking-[-0.03em]">
        Good to see you.
      </h1>
      <p className="mt-1 text-foreground/60">
        Everything on the site lives here. Pick a section, or start with the
        most common jobs.
      </p>

      {/* the jobs that happen most often, one tap away */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/dashboard/essays/new" className={primaryButton}>
          <HugeiconsIcon icon={Add01Icon} className="size-4" strokeWidth={2} />
          Write an essay
        </Link>
        <Link href="/dashboard/startups/new" className={quietButton}>
          <HugeiconsIcon icon={Add01Icon} className="size-4" strokeWidth={2} />
          Add a startup
        </Link>
        <Link href="/dashboard/startups" className={quietButton}>
          Upload photos
        </Link>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, i) => (
          <Link
            key={resource.key}
            href={`/dashboard/${resource.key}`}
            className="group rounded-2xl border border-border p-5 transition-colors hover:border-foreground/30"
          >
            <p className="text-[32px] font-semibold tracking-[-0.04em]">
              {counts[i]}
            </p>
            <p className="mt-1 flex items-center justify-between text-[15px] font-medium">
              {resource.label}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-4 text-foreground/30 transition-transform group-hover:translate-x-0.5"
              />
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
