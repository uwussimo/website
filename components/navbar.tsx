"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Menu01Icon,
  TelegramIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { CHAT_URL } from "@/lib/site";

const links = [
  { href: "/startups", label: "Startups" },
  { href: "/about", label: "About me" },
  { href: "/essays", label: "Essays" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav
        className="container-site flex h-[70px] items-center justify-between"
        aria-label="Main"
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/avatar.webp"
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
            priority
          />
          <span className="leading-tight">
            <span className="block text-[16px] font-medium tracking-[-0.02em]">
              Yusuf Abdurakhimov
            </span>
            <span className="block text-[13px] tracking-[-0.01em] text-foreground/60">
              Builder & engineer · Founder at Oqim
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              className={cn(
                "text-[16px] tracking-[-0.02em] transition-colors hover:text-foreground",
                pathname.startsWith(href)
                  ? "font-medium text-foreground"
                  : "text-foreground/80",
              )}
            >
              {label}
            </Link>
          ))}
          <a
            href={CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary py-2.5"
          >
            <HugeiconsIcon icon={TelegramIcon} className="size-4" />
            Let&apos;s chat
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex size-10 items-center justify-center md:hidden"
        >
          <HugeiconsIcon
            icon={open ? Cancel01Icon : Menu01Icon}
            className="size-6"
            strokeWidth={1.5}
          />
        </button>
      </nav>

      {open && (
        <div className="container-site border-t border-border pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-3 text-[20px] font-medium tracking-[-0.03em]"
              >
                {label}
              </Link>
            ))}
          </div>
          <a
            href={CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-4 w-full"
          >
            <HugeiconsIcon icon={TelegramIcon} className="size-4" />
            Let&apos;s chat
          </a>
        </div>
      )}
    </header>
  );
};

export { Navbar };
