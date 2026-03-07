import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  NewTwitterIcon,
  InstagramIcon,
  Facebook01Icon,
} from "@hugeicons/core-free-icons";

const socialLinks = [
  { href: "https://twitter.com", icon: NewTwitterIcon, label: "Twitter" },
  { href: "https://instagram.com", icon: InstagramIcon, label: "Instagram" },
  { href: "https://facebook.com", icon: Facebook01Icon, label: "Facebook" },
];

const Footer = () => (
  <footer className="bg-background border-t border-black/[0.06] py-6">
    <div className="mx-auto flex max-w-[680px] items-center justify-between gap-4 px-6 sm:px-8">
      <p className="text-md font-medium">
        七転び八起き · Fall seven times, rise eight.
      </p>
      <nav className="flex gap-3" aria-label="Social links">
        {socialLinks.map(({ href, icon, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-600"
            aria-label={label}
          >
            <HugeiconsIcon icon={icon} className="size-4" strokeWidth={2} />
          </Link>
        ))}
      </nav>
    </div>
  </footer>
);

export { Footer };
