import Link from "next/link";
import { PAGES, socialLinks } from "@/lib/site";
import type { Settings } from "@/lib/settings";

const Footer = ({
  profile,
  footer,
}: {
  profile: Settings["profile"];
  footer: Settings["footer"];
}) => (
  <footer className="mt-28 bg-foreground text-background">
    <div className="container-site py-16">
      <div className="flex flex-col justify-between gap-12 md:flex-row">
        <div className="space-y-4 text-[18px] tracking-[-0.02em]">
          <p>{footer.line1}</p>
          <p>{footer.line2}</p>
          <p>{footer.line3}</p>
        </div>
        <div className="flex gap-16">
          <div>
            <p className="mb-3 text-[14px] text-background/60">Pages</p>
            <ul className="space-y-2 text-[18px] tracking-[-0.02em]">
              {PAGES.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="hover:opacity-70">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[14px] text-background/60">Socials</p>
            <ul className="space-y-2 text-[18px] tracking-[-0.02em]">
              {socialLinks(profile).map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-2 border-t border-background/15 pt-6 text-[14px] text-background/70 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {footer.copyright}. All rights reserved.
        </p>
        <p>usufdev.com</p>
      </div>
    </div>
  </footer>
);

export { Footer };
