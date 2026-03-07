import { HomeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import ThemeToggle from "./theme-toggle";

const navLinks = [
  { href: "/about", label: "about" },
  { href: "/essays", label: "essays" },
  { href: "/projects", label: "building" },
] as const;

const Navbar = () => (
  <nav
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-4 border-b border-border bg-background/10 backdrop-blur-sm py-4"
    aria-label="Main"
  >
    <Link href="/" className={buttonVariants({ variant: "ghost" })}>
      <HugeiconsIcon icon={HomeIcon} className="size-4" strokeWidth={1.5} />
    </Link>
    {navLinks.map(({ href, label }) => (
      <Link
        key={label}
        href={href}
        className={buttonVariants({ variant: "ghost" })}
      >
        {label}
      </Link>
    ))}
    <ThemeToggle />
  </nav>
);

export { Navbar };
