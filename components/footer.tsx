import Link from "next/link";
import { PAGES, SOCIALS } from "@/lib/site";

const Footer = () => (
  <footer className="mt-28 bg-foreground text-background">
    <div className="container-site py-16">
      <div className="flex flex-col justify-between gap-12 md:flex-row">
        <div className="space-y-4 text-[18px] tracking-[-0.02em]">
          <p>Telegram: @usufdev</p>
          <p>Based in: Tashkent & the Bay Area</p>
          <p>Building: oqim.app</p>
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
              {SOCIALS.map(({ label, href }) => (
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
          © {new Date().getFullYear()} Yusuf Abdurakhimov. All rights reserved.
        </p>
        <p>usufdev.com</p>
      </div>
    </div>
  </footer>
);

export { Footer };
