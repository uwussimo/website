"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks: { href: string; label: string; cta?: boolean }[] = [
  { href: "/", label: "main" },
  { href: "/about", label: "about" },
  { href: "/essays", label: "essays", cta: true },
  { href: "/startups", label: "startups" },
  { href: "/work", label: "work" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-2 z-50 flex justify-center px-3">
      <nav
        className="pointer-events-auto flex items-center rounded-full border border-foreground/5 bg-background/70 p-1.5 backdrop-blur-md sm:gap-1"
        aria-label="Main"
      >
        {navLinks.map(({ href, label, cta }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-full text-[14px] leading-none transition-colors sm:text-[16px]",
                cta
                  ? "mx-1 bg-primary px-4 py-2.5 font-bold text-primary-foreground hover:bg-primary/80 sm:px-6"
                  : "px-2.5 py-2.5 text-foreground/80 hover:text-foreground sm:px-5",
                !cta && active && "font-semibold text-foreground",
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export { Navbar };
