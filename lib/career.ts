export type StartupStatus = "active" | "stealth" | "discontinued" | "acquired";

export type Startup = {
  name: string;
  role: string;
  desc: string;
  users: string;
  mrr: string;
  founded: string;
  status: StartupStatus;
  link: string | null;
};

export const startups: Startup[] = [
  {
    name: "mobile app",
    role: "builder",
    desc: "ai powered gamified application to reclaim attention, time and focus. currently in development phase.",
    users: "N/A",
    mrr: "N/A",
    founded: "2025",
    status: "stealth",
    link: null,
  },
  {
    name: "optochka.com",
    role: "Chief Technology Officer",
    desc: "s-commerce platform for small businesses. optochka helps to expand sales, delivery methods, and scale your business.",
    users: "100+",
    mrr: "NDA",
    founded: "2022",
    status: "active",
    link: "https://optochka.com",
  },
  {
    name: "42.uz",
    role: "Co-founder & Frontend Engineer",
    desc: "gamified tech learning platform with mentors from facebook, google, pinterest and more.",
    users: "13.7k+",
    mrr: "NDA",
    founded: "2023",
    status: "active",
    link: "https://42.uz",
  },
  {
    name: "khmapp.org",
    role: "Technical Co-founder",
    desc: "fbm for immigrants, launched in 2 weeks. 100k+ visits in 2 months. first $100 by 3rd month.",
    users: "1K+",
    mrr: "$100",
    founded: "2023",
    status: "discontinued",
    link: "https://khmapp.org",
  },
  {
    name: "educator.uz",
    role: "Co-founder & CTO",
    desc: "built it at 17 years old. did not sell it for $50K and still regret not selling it. priceless experience.",
    users: "6K+",
    mrr: "$0",
    founded: "2019",
    status: "discontinued",
    link: "https://educator.uz",
  },
  {
    name: "Codeflow",
    role: "Founder",
    desc: "acquired by 42.uz, coding bootcamp for fast tracked frontend development.",
    users: "N/A",
    mrr: "$3K",
    founded: "2020",
    status: "acquired",
    link: null,
  },
  {
    name: "JustOrder",
    role: "Consultant",
    desc: "'lets redesign cafe experiences' - said a friend. currently in dev phase. (tashkent)",
    users: "20+ cafes",
    mrr: "N/A",
    founded: "2025",
    status: "stealth",
    link: null,
  },
];

export const statusLabels: Record<StartupStatus, string> = {
  active: "live",
  stealth: "stealth",
  discontinued: "ended",
  acquired: "acquired",
};

/**
 * `start` / `end` take "YYYY" or "YYYY-MM". The more precise the dates, the
 * more precise the duration shown on /work. `end: "present"` means still
 * there; leave `end` out when the role is over but the date isn't filled in.
 * Roles without dates fall back to the free-form `when` label.
 */
export type Experience = {
  company: string;
  link?: string;
  role: string;
  start?: string;
  end?: string;
  when?: string;
  note?: string;
  location?: string;
  summary: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "JustOrder",
    role: "Consultant",
    start: "2025",
    end: "present",
    location: "tashkent",
    summary:
      "“let's redesign cafe experiences”, said a friend. i'm consulting on the product while it's being built.",
    highlights: ["20+ cafes on board", "currently in the development phase"],
  },
  {
    company: "stealth mobile app",
    role: "Builder",
    start: "2025",
    end: "present",
    summary:
      "an ai powered, gamified application to reclaim attention, time and focus. it's where my current obsession with user behavior and persuasive technology goes.",
    highlights: ["currently in the development phase"],
  },
  {
    company: "42.uz",
    link: "https://42.uz",
    role: "Co-founder & Frontend Engineer",
    start: "2023",
    end: "present",
    summary:
      "a gamified tech learning platform with mentors from facebook, google, pinterest and more.",
    highlights: [
      "13.7k+ learners on the platform",
      "acquired codeflow, the bootcamp i started in 2020",
    ],
  },
  {
    company: "khmapp.org",
    link: "https://khmapp.org",
    role: "Technical Co-founder",
    start: "2023",
    note: "ended",
    summary: "facebook marketplace, but for immigrants.",
    highlights: [
      "launched in 2 weeks",
      "100k+ visits in the first 2 months",
      "1k+ users, first $100 by the 3rd month",
    ],
  },
  {
    company: "optochka.com",
    link: "https://optochka.com",
    role: "Chief Technology Officer",
    start: "2022",
    end: "present",
    summary:
      "an s-commerce platform for small businesses. optochka helps them expand sales, add delivery methods, and scale.",
    highlights: ["100+ businesses on the platform"],
  },
  {
    company: "Codeflow",
    role: "Founder",
    start: "2020",
    note: "acquired by 42.uz",
    summary: "a coding bootcamp for fast-tracked frontend development.",
    highlights: ["grew it to $3k mrr", "acquired by 42.uz"],
  },
  {
    company: "educator.uz",
    link: "https://educator.uz",
    role: "Co-founder & CTO",
    start: "2019",
    note: "ended",
    summary:
      "an online education platform. i built it at 17, right after high school.",
    highlights: [
      "three months of cold investment pitches before launch",
      "within four hours of the launch video: two education centers wanted to list courses, an investor reached out, and two teams offered to help with marketing",
      "grew to 6k+ users",
      "didn't sell it for $50k, and i still regret that. priceless experience",
    ],
  },
];

// told in order, oldest first. the full story is in
// content/essays/the-kid-who-sold-somsa-on-sundays.md
export const earlyDays: Experience[] = [
  {
    company: "A gas station",
    role: "Juice seller",
    when: "age 11",
    summary:
      "my first job. walking from car to car with my friends, knocking on windows. cold outreach before i knew the word.",
    highlights: [],
  },
  {
    company: "The bazaar",
    role: "Somsa seller",
    when: "years later",
    summary:
      "sold hundreds of somsa on sundays to pay for my english course. the more you ask, the more you sell.",
    highlights: [],
  },
  {
    company: "An education center in Tashkent",
    role: "First software sale",
    when: "then",
    summary:
      "walked in, said what i could do, and built them a website. they prepared me for the ielts for six months in return.",
    highlights: [],
  },
  {
    company: "A construction company",
    role: "Frontend developer, sales department",
    when: "age 17",
    summary:
      "a friend's dad's place. i built frontend for the sales team and learned to sell on the phone.",
    highlights: [
      "sold one apartment after three months. everything started there",
      "the lesson that stuck: know the pain of the person you're selling to, and know what you're selling",
    ],
  },
  {
    company: "Web development agency",
    role: "Founder",
    when: "still in lyceum",
    summary:
      "formed a team of software engineers from inha to take on projects from companies, using everything i'd picked up in real estate sales.",
    highlights: [],
  },
  {
    company: "Freelance & Digital Generation",
    role: "Freelance developer",
    when: "a year later",
    summary:
      "lived day to day on freelance projects and a contract with digital generation.",
    highlights: [],
  },
  {
    company: "Alpha Marketing",
    role: "Sales intern",
    when: "around then",
    summary:
      "two weeks of cold-calling training, then a sales exam. four of us stayed out of fifteen. i pitched brokerage services to strangers in the uk over an auto-dialer.",
    highlights: [
      "two hours of cold calling hurt my head as much as twenty hours of coding",
      "i left. it wasn't something i wanted to sell, but i still use what i learned",
    ],
  },
];

function parseDate(value: string, now: Date): Date {
  if (value === "present") return now;
  const [year, month] = value.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, 1);
}

const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;

export function formatPeriod({ start, end, when }: Experience): string {
  if (!start) return when ?? "";
  const from = start.slice(0, 4);
  if (!end) return from;
  const to = end === "present" ? "now" : end.slice(0, 4);
  return from === to ? from : `${from} — ${to}`;
}

export function formatDuration(
  { start, end }: Experience,
  now: Date = new Date(),
): string | null {
  if (!start || !end) return null;
  const from = parseDate(start, now);
  const to = parseDate(end, now);
  // year-only dates can be off by most of a year, so say so
  if (!start.includes("-")) {
    return `~${plural(Math.max(1, to.getFullYear() - from.getFullYear()), "yr")}`;
  }
  const months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  const years = Math.floor(months / 12);
  const parts = [
    years > 0 && plural(years, "yr"),
    months % 12 > 0 && plural(months % 12, "mo"),
  ].filter(Boolean);
  return parts.join(" ") || "<1 mo";
}
