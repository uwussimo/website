import type { Settings } from "./settings";

export const PAGES = [
  { label: "Home", href: "/" },
  { label: "Startups", href: "/startups" },
  { label: "About", href: "/about" },
  { label: "Essays", href: "/essays" },
];

/** The social links that are filled in, in a fixed order. */
export const socialLinks = (profile: Settings["profile"]) =>
  (
    [
      ["GitHub", profile.github],
      ["X (Twitter)", profile.x],
      ["Instagram", profile.instagram],
      ["LinkedIn", profile.linkedin],
      ["Telegram", profile.telegram],
    ] as const
  )
    .filter(([, href]) => href)
    .map(([label, href]) => ({ label, href: href as string }));

/** the year the first job on the work page started */
export const FIRST_YEAR = 2020;

export const yearsBuilding = () => new Date().getFullYear() - FIRST_YEAR;

/** The avatar: the uploaded one, or the file shipped with the site. */
export const avatarSrc = (profile: Settings["profile"]) =>
  profile.avatarId ? `/media/${profile.avatarId}` : "/avatar.webp";
