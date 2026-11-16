// Copy and curation that used to be hard-coded. Each group is one row in
// the Setting table; the defaults below are what the site shows until the
// dashboard saves something.

export type StripPhoto = { mediaId: string; caption: string };

export type Stat = { value: string; label: string };

export const settingDefaults = {
  profile: {
    name: "Yusuf Abdurakhimov",
    tagline: "Builder & engineer · Founder at Oqim",
    avatarId: null as string | null,
    chatUrl: "https://t.me/usufdev",
    github: "https://github.com/uwussimo",
    x: "https://twitter.com/uwussimo",
    instagram: "https://www.instagram.com/usufdev/",
    linkedin: "https://www.linkedin.com/in/mrabdurakhimov",
    telegram: "https://t.me/TenxStartuper",
  },
  home: {
    title: "{startups} startups so far. {live} live, {ended} ended.",
    subtitle:
      "Sharing lessons from the startups I've founded and built, so you don't have to make the same mistakes.",
    primaryLabel: "Say hi",
    secondaryLabel: "Read essays",
    strip: [] as StripPhoto[],
    aboutTitle: "yusuf, builder and engineer from tashkent",
    aboutText:
      "Now between Uzbekistan and the Bay Area. I've founded, built and advised startups, and I write about what shipping them taught me.",
    stats: [
      { value: "{startups}", label: "startups founded, built or advised" },
      { value: "{years}+", label: "years building products" },
      { value: "13.7k+", label: "learners on 42.uz" },
    ] as Stat[],
    workTitle: "where i've worked",
    essaysTitle: "things i've written",
    ctaTitle: "working on something? message me",
    ctaText:
      "An idea, a team that needs to ship, or just a question. I'm one message away.",
  },
  about: {
    title: "builder and engineer from tashkent",
    lede: "{years} years of turning ideas into startups, from Tashkent to the Bay Area. Founder at Oqim, engineer at Dorim.",
    bioLead:
      "I grew up around people who were curious about technology, and that curiosity stuck. I started building things early: websites, small apps, ideas that didn't always work. Some did.",
    bio: "After school I co-founded an edtech startup. We reached thousands of students. We won something. More importantly, I learned what it means to ship, to fail, and to try again. Since then I've worked at scale, built s-commerce platforms, and moved across continents. I believe the best products come from teams who care about their users.",
    principles: [
      "Ship it, then make it better|art-of-shipping",
      "Say no now, not later|say-no-now-or-die-later",
      "Ask why people are frustrated|stop-asking-what-people-want",
      "Answer fast, latency kills teams|latency-kills-teams",
    ],
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Node.js",
    ],
    workTitle: "every team, for how long, and what i did there",
    educationTitle: "where i studied",
    talksTitle: "rooms i've spoken in",
    instagramTitle: "a few moments from instagram",
    playlistUrl:
      "https://open.spotify.com/embed/playlist/2HMFDNtUN8CzRy1vShvYDQ",
  },
  footer: {
    line1: "Telegram: @usufdev",
    line2: "Based in: Tashkent & the Bay Area",
    line3: "Building: oqim.app",
    copyright: "Yusuf Abdurakhimov",
  },
};

export type Settings = typeof settingDefaults;
export type SettingGroup = keyof Settings;

export type LiveNumbers = {
  startups: number;
  years: number;
  /** startups still running */
  live: number;
  /** startups that were shut down */
  ended: number;
};

/** What the placeholders stand for, counted from the startups themselves. */
export function liveNumbers(
  startups: { status: string }[],
  years: number,
): LiveNumbers {
  const count = (status: string) =>
    startups.filter((s) => s.status === status).length;
  return {
    startups: startups.length,
    years,
    live: count("active"),
    ended: count("discontinued"),
  };
}

/** "{startups}", "{years}", "{live}" and "{ended}" become the live numbers. */
export function fillPlaceholders(text: string, values: LiveNumbers) {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    text,
  );
}
