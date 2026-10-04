import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  NewTwitterIcon,
  GithubIcon,
  TelegramIcon,
} from "@hugeicons/core-free-icons";
import ThemeToggle from "./theme-toggle";

const footerLinks = [
  { href: "/", label: "main" },
  { href: "/about", label: "about" },
  { href: "/essays", label: "essays" },
  { href: "/startups", label: "startups" },
  { href: "/work", label: "work" },
  { href: "/talks", label: "talks" },
];

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
  <footer className="mt-28 overflow-hidden">
    <div className="mx-auto flex max-w-[1040px] flex-col gap-10 px-6 sm:flex-row sm:justify-between sm:px-8">
      <div>
        <Link href="/" className="font-serif text-[26px] leading-none">
          usufdev
        </Link>
        <p className="mt-3 max-w-[260px] text-[14px] font-medium leading-snug">
          a builder & engineer sharing lessons from startups.
        </p>
        <nav className="mt-5 flex items-center gap-5" aria-label="Social links">
          {socialLinks.map(({ href, icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors duration-200 hover:text-foreground/60"
              aria-label={label}
            >
              <HugeiconsIcon icon={icon} className="size-5" strokeWidth={1.5} />
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        <p className="mt-5 text-[12px] text-foreground/70">
          © {new Date().getFullYear()} - made with love and care for readers
          like you
        </p>
      </div>
      <nav className="flex flex-col gap-2.5" aria-label="Footer">
        {footerLinks.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className="text-[15px] text-foreground hover:underline"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
    <p
      className="wordmark mx-auto -mb-[0.24em] mt-10 max-w-[1100px] select-none text-center font-serif text-[clamp(5rem,25vw,18rem)] leading-none tracking-[-0.03em]"
      aria-hidden
    >
      usufdev
    </p>
  </footer>
);

export { Footer };
