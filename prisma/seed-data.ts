// The content the site started with. `seed.ts` loads it into an empty
// database once; after that the admin dashboard is the source of truth.

export const startups = [
  {
    name: "oqim.app",
    slug: "oqim",
    role: "Founder",
    desc: "a creator ecosystem for central asia: a ugc marketplace, a family of creator tools, and palantir-level access to market data.",
    users: "600+ creators",
    mrr: "NDA",
    founded: "2026",
    status: "active",
    link: "https://oqim.app",
  },
  {
    name: "mobile app",
    slug: "mobile-app",
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
    slug: "optochka",
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
    slug: "42uz",
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
    slug: "khmapp",
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
    slug: "educator",
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
    slug: "codeflow",
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
    slug: "justorder",
    role: "Consultant",
    desc: "'lets redesign cafe experiences' - said a friend. currently in dev phase. (tashkent)",
    users: "20+ cafes",
    mrr: "N/A",
    founded: "2025",
    status: "stealth",
    link: null,
  },
];

export const featuredStartups = ["oqim", "42uz", "optochka", "educator"];

type SeedExperience = {
  company: string;
  slug?: string;
  link?: string;
  role: string;
  start?: string;
  end?: string;
  when?: string;
  note?: string;
  location?: string;
  summary?: string;
  highlights: string[];
};

export const experience: SeedExperience[] = [
  {
    company: "oqim.app",
    slug: "oqim",
    link: "https://oqim.app",
    role: "Founder",
    start: "2026-03",
    end: "present",
    summary:
      "a creator ecosystem for central asia. brands meet creators on a ugc marketplace, creators get a family of tools on one account, and we have palantir-level access to market data.",
    highlights: [
      "600+ creators on the marketplace, 2,500+ content creators across the ecosystem",
      "ugc marketplace: brands brief a campaign and pay per view, creators post reels and get paid",
      "atlas: a live map of the market's creators, content and brands",
      "creator tools: chat for instagram dms, canvas for ai-made visuals, obio for link-in-bio, and more",
      "creator apps for ios and android",
    ],
  },
  {
    company: "dorim.com",
    slug: "dorim",
    link: "https://dorim.com",
    role: "Software Engineer",
    start: "2025-12",
    end: "present",
    summary:
      "the startup i work at today. dorim lets pharmacies in uzbekistan order from distributors in one place: compare offers, track prices, and get orders on time.",
    highlights: [],
  },
  {
    company: "doublespeed",
    slug: "doublespeed",
    role: "Senior Software Engineer",
    start: "2025-08",
    end: "2025-10",
    location: "los angeles, ca",
    summary: "a startup backed by a16z.",
    highlights: [],
  },
  {
    company: "JustOrder",
    slug: "justorder",
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
    slug: "mobile-app",
    role: "Builder",
    start: "2025",
    end: "present",
    summary:
      "an ai powered, gamified application to reclaim attention, time and focus. it's where my current obsession with user behavior and persuasive technology goes.",
    highlights: ["currently in the development phase"],
  },
  {
    company: "42.uz",
    slug: "42uz",
    link: "https://42.uz",
    role: "Co-founder & Frontend Engineer",
    start: "2023-08",
    end: "2024-01",
    summary:
      "a gamified tech learning platform with mentors from facebook, google, pinterest and more.",
    highlights: [
      "13.7k+ learners on the platform",
      "acquired codeflow, the bootcamp i started in 2020",
    ],
  },
  {
    company: "khmapp.org",
    slug: "khmapp",
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
    slug: "optochka",
    link: "https://optochka.com",
    role: "Chief Technology Officer",
    start: "2022-04",
    end: "2023-08",
    summary:
      "an s-commerce platform for small businesses. optochka helps them expand sales, add delivery methods, and scale.",
    highlights: ["100+ businesses on the platform"],
  },
  {
    company: "EPAM Systems",
    slug: "epam",
    role: "Software Engineer",
    start: "2021-07",
    end: "2022-08",
    highlights: [],
  },
  {
    company: "Davr Bank",
    slug: "davr-bank",
    role: "UX Designer",
    start: "2020-11",
    end: "2021-04",
    highlights: [],
  },
  {
    company: "Digital Generation Uzbekistan",
    slug: "digital-generation",
    role: "Software Engineer",
    start: "2020-08",
    end: "2021-07",
    highlights: [],
  },
  {
    company: "educator.uz",
    slug: "educator",
    link: "https://educator.uz",
    role: "Founder",
    start: "2020-04",
    end: "2021-11",
    summary:
      "an online education platform. i built it at 17, right after high school.",
    highlights: [
      "three months of cold investment pitches before launch",
      "within four hours of the launch video: two education centers wanted to list courses, an investor reached out, and two teams offered to help with marketing",
      "grew to 6k+ users",
      "didn't sell it for $50k, and i still regret that. priceless experience",
    ],
  },
  {
    company: "Codeflow",
    slug: "codeflow",
    role: "Founder",
    start: "2020",
    note: "acquired by 42.uz",
    summary: "a coding bootcamp for fast-tracked frontend development.",
    highlights: ["grew it to $3k mrr", "acquired by 42.uz"],
  },
];

export const education: SeedExperience[] = [
  {
    company: "Whitworth University",
    role: "Bachelor of Science, Computer Science",
    start: "2022-09",
    end: "2023-06",
    location: "spokane, washington",
    highlights: [],
  },
  {
    company: "Inha University in Tashkent",
    role: "Bachelor of Science, Computer and Software Engineering",
    start: "2020-09",
    end: "2022-05",
    highlights: [],
  },
  {
    company:
      "Academic Lyceum of Westminster International University in Tashkent",
    role: "High school diploma",
    start: "2018-09",
    end: "2020-06",
    highlights: [],
  },
];

// told in order, oldest first
export const earlyDays: SeedExperience[] = [
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
    company: "Freelance",
    role: "Freelance developer",
    when: "a year later",
    summary: "lived day to day on freelance projects.",
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

type SeedPlace = {
  name: string;
  location: [number, number];
  photo?: { src: string; alt: string; focus?: string };
};

// tashkent stays first: the globe starts there and draws its arcs from it
export const places: SeedPlace[] = [
  {
    name: "Tashkent",
    location: [41.2995, 69.2401],
    photo: {
      src: "/instagram/tashkent.webp",
      alt: "Yusuf standing by a floor-to-ceiling window in Tashkent",
      focus: "50% 35%",
    },
  },
  {
    name: "Bukhara",
    location: [39.7681, 64.4556],
    photo: {
      src: "/instagram/bukhara.webp",
      alt: "Yusuf in front of a lit madrasa in Bukhara's old town at night",
      focus: "50% 70%",
    },
  },
  { name: "Istanbul", location: [41.0082, 28.9784] },
  {
    name: "San Francisco",
    location: [37.7749, -122.4194],
    photo: {
      src: "/instagram/san-francisco.webp",
      alt: "Yusuf at night with the San Francisco skyline behind him",
      focus: "50% 40%",
    },
  },
  {
    name: "Seattle",
    location: [47.6062, -122.3321],
    photo: {
      src: "/instagram/seattle.webp",
      alt: "Yusuf on the Seattle waterfront with the great wheel behind him",
      focus: "60% 50%",
    },
  },
  {
    name: "Spokane",
    location: [47.6588, -117.426],
    photo: {
      src: "/instagram/spokane.webp",
      alt: "Yusuf holding a basketball under red autumn trees in Spokane",
      focus: "50% 80%",
    },
  },
  {
    name: "Omaha",
    location: [41.2565, -95.9345],
    photo: {
      src: "/instagram/omaha.webp",
      alt: "Yusuf sitting on a bench in downtown Omaha",
    },
  },
  { name: "Los Angeles", location: [34.0522, -118.2437] },
];

export const instagramPosts: {
  href: string;
  src: string;
  alt: string;
  caption: string;
  place: string;
  date: string;
  focus?: string;
}[] = [
  {
    href: "https://www.instagram.com/p/DbLFUfojOBx/",
    src: "/instagram/post-dorim.webp",
    alt: "Yusuf holding a coffee by an office window",
    caption: "life @ dorim",
    place: "gross plaza",
    date: "jul 2026",
    focus: "50% 35%",
  },
  {
    href: "https://www.instagram.com/p/DZFUsSODNNe/",
    src: "/instagram/post-urgench.webp",
    alt: "Yusuf presenting to a classroom of bank managers",
    caption: "corporate ai training for bank managers",
    place: "urgench, khorezm",
    date: "jun 2026",
  },
  {
    href: "https://www.instagram.com/p/DYsbrggDDu-/",
    src: "/instagram/post-bukhara.webp",
    alt: "Yusuf standing in a lit courtyard in Bukhara at night",
    caption: "late night old town in bukhara",
    place: "bukhara",
    date: "may 2026",
    focus: "50% 60%",
  },
  {
    href: "https://www.instagram.com/p/DXPFViLjJGG/",
    src: "/instagram/post-sherwood.webp",
    alt: "Yusuf leaning on a railing with green hills behind him",
    caption: "great time with colleagues at sherwood resort",
    place: "sherwood, tashkent",
    date: "apr 2026",
    focus: "50% 30%",
  },
  {
    href: "https://www.instagram.com/p/DUL11bcDPBQ/",
    src: "/instagram/post-sf.webp",
    alt: "A close-up selfie of Yusuf in glasses",
    caption: "sf’2025",
    place: "san francisco",
    date: "jan 2026",
    focus: "50% 30%",
  },
  {
    href: "https://www.instagram.com/p/C5SKz1At_me/",
    src: "/instagram/post-seattle.webp",
    alt: "Yusuf adjusting his cap in front of the Seattle great wheel",
    caption: "archive • summer’23",
    place: "seattle",
    date: "apr 2024",
  },
];

export const talks = [
  {
    title: "corporate ai training for bank managers",
    place: "urgench, khorezm",
    dateLabel: "june 2026",
    text: "i've had the privilege of mentoring and delivering corporate ai training for bank managers from the national bank of uzbekistan, brb bank, aloqa bank, and several other banks.",
    href: "https://www.instagram.com/p/DZFUsSODNNe/",
    photo: {
      src: "/instagram/urgench-training.webp",
      alt: "Yusuf speaking into a microphone at the training in Urgench",
    },
  },
  {
    title: "google build with ai hackathon",
    place: "tashkent",
    dateLabel: "april 2026",
    text: "i was a mentor at google's build with ai hackathon in tashkent, and a judge the next day.",
    href: "https://www.instagram.com/p/DXticrDjMvX/",
    photo: null,
  },
];
