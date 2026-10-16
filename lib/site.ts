// links and facts used across the site
export const CHAT_URL = "https://t.me/usufdev";

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/uwussimo" },
  { label: "X (Twitter)", href: "https://twitter.com/uwussimo" },
  { label: "Instagram", href: "https://www.instagram.com/usufdev/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mrabdurakhimov" },
  { label: "Telegram", href: "https://t.me/TenxStartuper" },
];

export const PAGES = [
  { label: "Home", href: "/" },
  { label: "Startups", href: "/startups" },
  { label: "About", href: "/about" },
  { label: "Essays", href: "/essays" },
];

/** the year the first job on the work page started */
export const FIRST_YEAR = 2020;

export const yearsBuilding = () => new Date().getFullYear() - FIRST_YEAR;
