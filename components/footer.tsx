import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  NewTwitterIcon,
  GithubIcon,
  TelegramIcon,
} from "@hugeicons/core-free-icons";

const socialLinks = [
  {
    href: "https://github.com/uwussimo",
    icon: GithubIcon,
    label: "Yusuf Abdurakhimov Github Profile",
  },

  {
    href: "https://twitter.com/uwussimo",
    icon: NewTwitterIcon,
    label: "Yusuf Abdurakhimov's Twitter page",
  },
  {
    href: "https://t.me/TenxStartuper",
    icon: TelegramIcon,
    label: "Yusuf Abdurakhimov's telegram page",
  },
];

const Footer = () => (
  <footer className="bg-background border-t border-border py-12">
    <div className="mx-auto max-w-[680px] px-6 sm:px-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-6">
          <Link
            href="/about"
            className="text-foreground font-mono text-sm hover:text-foreground/80"
          >
            about
          </Link>
          <Link
            href="/essays"
            className="text-foreground font-mono text-sm hover:text-foreground/80"
          >
            essays
          </Link>
          <Link
            href="/talks"
            className="text-foreground font-mono text-sm hover:text-foreground/80"
          >
            talks
          </Link>
          <Link
            href="/projects"
            className="text-foreground font-mono text-sm hover:text-foreground/80"
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
              className="text-foreground transition-colors duration-200 hover:text-foreground/80"
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
