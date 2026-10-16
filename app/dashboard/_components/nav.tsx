"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Briefcase01Icon,
  DashboardSquare01Icon,
  Home01Icon,
  InstagramIcon,
  Location01Icon,
  Mic01Icon,
  QuillWrite01Icon,
  Rocket01Icon,
  Settings01Icon,
  UserIcon,
  ViewIcon,
  File01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const ICONS: Record<string, typeof Rocket01Icon> = {
  startups: Rocket01Icon,
  work: Briefcase01Icon,
  essays: QuillWrite01Icon,
  talks: Mic01Icon,
  places: Location01Icon,
  instagram: InstagramIcon,
};

type Item = {
  href: string;
  label: string;
  icon: typeof Rocket01Icon;
  count?: number;
  exact?: boolean;
};

function Group({
  title,
  items,
  pathname,
}: {
  title?: string;
  items: Item[];
  pathname: string;
}) {
  return (
    <div className="flex gap-1 md:flex-col">
      {title && (
        <p className="hidden px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground/40 md:block">
          {title}
        </p>
      )}
      {items.map(({ href, label, icon, count, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-10 shrink-0 items-center gap-3 rounded-xl px-3 text-[14px] font-medium tracking-[-0.01em] transition-colors",
              active
                ? "bg-foreground text-background"
                : "text-foreground/75 hover:bg-surface-strong hover:text-foreground",
            )}
          >
            <HugeiconsIcon
              icon={icon}
              className="size-4 shrink-0"
              strokeWidth={1.8}
            />
            <span className="flex-1">{label}</span>
            {count !== undefined && (
              <span
                className={cn(
                  "text-[12px] tabular-nums",
                  active ? "text-background/70" : "text-foreground/40",
                )}
              >
                {count}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export function DashboardNav({
  sections,
}: {
  sections: { key: string; label: string; count: number }[];
}) {
  const pathname = usePathname();
  return (
    <nav
      className="flex gap-4 overflow-x-auto md:flex-col md:gap-0"
      aria-label="Dashboard"
    >
      <Group
        pathname={pathname}
        items={[
          {
            href: "/dashboard",
            label: "Overview",
            icon: DashboardSquare01Icon,
            exact: true,
          },
          {
            href: "/dashboard/pages/home",
            label: "Home page",
            icon: Home01Icon,
          },
          {
            href: "/dashboard/pages/about",
            label: "About page",
            icon: File01Icon,
          },
        ]}
      />
      <Group
        title="Content"
        pathname={pathname}
        items={sections.map((s) => ({
          href: `/dashboard/${s.key}`,
          label: s.label,
          icon: ICONS[s.key] ?? DashboardSquare01Icon,
          count: s.count,
        }))}
      />
      <Group
        title="Settings"
        pathname={pathname}
        items={[
          {
            href: "/dashboard/pages/profile",
            label: "Site settings",
            icon: Settings01Icon,
          },
          {
            href: "/dashboard/pages/footer",
            label: "Footer",
            icon: File01Icon,
          },
          { href: "/dashboard/account", label: "Account", icon: UserIcon },
        ]}
      />
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex h-10 shrink-0 items-center gap-3 rounded-xl px-3 text-[14px] font-medium text-foreground/75 transition-colors hover:bg-surface-strong hover:text-foreground"
      >
        <HugeiconsIcon icon={ViewIcon} className="size-4" strokeWidth={1.8} />
        View site
      </a>
    </nav>
  );
}
