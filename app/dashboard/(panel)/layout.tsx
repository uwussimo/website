import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { requireAdmin } from "@/lib/auth";
import { resources } from "@/lib/admin/resources";
import { countRecords } from "@/lib/admin/store";
import { logout } from "../actions";
import { DashboardNav } from "../_components/nav";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  const counts = await Promise.all(resources.map(countRecords));
  const sections = resources.map((r, i) => ({
    key: r.key,
    label: r.label,
    count: counts[i],
  }));

  return (
    <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col md:flex-row">
      <aside className="shrink-0 border-b border-border bg-surface px-4 py-4 md:sticky md:top-0 md:h-screen md:w-[240px] md:border-b-0 md:border-r md:px-5 md:py-6">
        <div className="mb-4 flex items-center justify-between md:mb-6">
          <Link
            href="/dashboard"
            className="text-[16px] font-semibold tracking-[-0.03em]"
          >
            ✦ usufdev
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex size-9 items-center justify-center rounded-full text-foreground/60 hover:bg-surface-strong hover:text-foreground"
              aria-label="Sign out"
              title={`Sign out ${admin.email}`}
            >
              <HugeiconsIcon
                icon={Logout01Icon}
                className="size-4"
                strokeWidth={1.8}
              />
            </button>
          </form>
        </div>
        <DashboardNav sections={sections} />
      </aside>
      <main className="min-w-0 flex-1 bg-background px-5 py-8 md:px-10 md:py-10">
        {children}
      </main>
    </div>
  );
}
