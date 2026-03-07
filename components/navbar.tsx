import Link from "next/link";

const navLinks = [
  { href: "/", label: "Yusuf Abdurakhimov", isLogo: true },
  { href: "/about", label: "about" },
  { href: "/essays", label: "essays" },
  { href: "/projects", label: "building" },
] as const;

const Navbar = () => (
  <nav
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-8 border-b border-border bg-secondary/95 backdrop-blur-sm py-4"
    aria-label="Main"
  >
    {navLinks.map(({ href, label }) => (
      <Link
        key={label}
        href={href}
        className={`text-sm font-medium text-foreground/70 transition-colors duration-200 hover:text-foreground`}
      >
        {label}
      </Link>
    ))}
  </nav>
);

export { Navbar };
