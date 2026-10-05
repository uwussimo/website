import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { resources } from "@/lib/admin/resources";
import { logout } from "../actions";
import { quietButton } from "../_components/ui";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div className="mx-auto flex max-w-[1100px] flex-col gap-10 px-6 py-10 md:flex-row">
      <aside className="shrink-0 md:w-[200px]">
        <Link href="/dashboard" className="font-serif text-[22px] leading-none">
          ✦ dashboard
        </Link>
        <nav
          className="mt-6 flex flex-wrap gap-x-5 gap-y-2 md:flex-col"
          aria-label="Dashboard"
        >
          {resources.map((resource) => (
            <Link
              key={resource.key}
              href={`/dashboard/${resource.key}`}
              className="text-[15px] text-foreground/80 hover:text-foreground"
            >
              {resource.label}
            </Link>
          ))}
          <Link
            href="/"
            className="text-[15px] text-foreground/80 hover:text-foreground md:mt-4"
          >
            view site
          </Link>
        </nav>
        <div className="mt-6 md:mt-8">
          <p className="mb-3 truncate text-[13px] text-foreground/60">
            {admin.email}
          </p>
          <form action={logout}>
            <button type="submit" className={quietButton}>
              sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
