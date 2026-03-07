import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  NewTwitterIcon,
  InstagramIcon,
  GithubIcon,
  YoutubeIcon,
  TelegramIcon,
} from "@hugeicons/core-free-icons";

const socialLinks = [
  { href: "https://github.com/usufdev", icon: GithubIcon, label: "GitHub" },
  { href: "https://t.me/usufdev", icon: TelegramIcon, label: "Telegram" },
  {
    href: "https://twitter.com/usufdev",
    icon: NewTwitterIcon,
    label: "Twitter",
  },
  {
    href: "https://instagram.com/usufdev",
    icon: InstagramIcon,
    label: "Instagram",
  },
  { href: "https://youtube.com/@usufdev", icon: YoutubeIcon, label: "YouTube" },
];

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="mx-auto max-w-[680px] px-6 sm:px-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-6">
          <Link
            href="/about"
            className="font-mono text-[13px] text-foreground/70 hover:text-foreground"
          >
            about
          </Link>
          <Link
            href="/essays"
            className="font-mono text-[13px] text-foreground/70 hover:text-foreground"
          >
            essays
          </Link>
          <Link
            href="/talks"
            className="font-mono text-[13px] text-foreground/70 hover:text-foreground"
          >
            talks
          </Link>
          <Link
            href="/projects"
            className="font-mono text-[13px] text-foreground/70 hover:text-foreground"
          >
            building
          </Link>
        </div>
        <nav className="flex gap-4" aria-label="Social links">
          {socialLinks.map(({ href, icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 transition-colors duration-200 hover:text-foreground"
              aria-label={label}
            >
              <HugeiconsIcon icon={icon} className="size-4" strokeWidth={1.5} />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  </footer>
);

export { Footer };
