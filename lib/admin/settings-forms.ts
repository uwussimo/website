// The dashboard forms for lib/settings.ts, one per group.

import type { Field } from "./resources";
import type { SettingGroup } from "@/lib/settings";

export type SettingsPage = {
  key: SettingGroup;
  label: string;
  description: string;
  siteHref: string;
  fields: Field[];
};

export const settingsPages: SettingsPage[] = [
  {
    key: "home",
    label: "Home page",
    description:
      "The words and photos on the front page. Startups shown there are picked in Startups.",
    siteHref: "/",
    fields: [
      {
        section: "Hero",
        name: "badge",
        label: "Badge",
        type: "text",
        required: true,
      },
      {
        section: "Hero",
        name: "title",
        label: "Headline",
        type: "text",
        required: true,
      },
      {
        section: "Hero",
        name: "subtitle",
        label: "Subtitle",
        type: "textarea",
        required: true,
      },
      {
        section: "Hero",
        name: "primaryLabel",
        label: "Primary button",
        type: "text",
        required: true,
        help: "Opens the chat link from Site settings.",
      },
      {
        section: "Hero",
        name: "secondaryLabel",
        label: "Secondary button",
        type: "text",
        required: true,
        help: "Goes to the essays.",
      },
      {
        section: "Photo strip",
        name: "strip",
        label: "Photos",
        type: "strip",
        help: "Drag to reorder. Only these show on the home page.",
      },
      {
        section: "About block",
        name: "aboutTitle",
        label: "Title",
        type: "textarea",
        required: true,
        help: "A line break starts a new line.",
      },
      {
        section: "About block",
        name: "aboutText",
        label: "Text",
        type: "textarea",
        required: true,
      },
      {
        section: "About block",
        name: "stats",
        label: "Numbers",
        type: "stats",
        help: "{startups} and {years} become the live numbers.",
      },
      {
        section: "Section titles",
        name: "startupsTitle",
        label: "Startups",
        type: "text",
        required: true,
      },
      {
        section: "Section titles",
        name: "workTitle",
        label: "Work",
        type: "text",
        required: true,
      },
      {
        section: "Section titles",
        name: "essaysTitle",
        label: "Essays",
        type: "text",
        required: true,
      },
      {
        section: "Closing",
        name: "ctaTitle",
        label: "Title",
        type: "text",
        required: true,
      },
      {
        section: "Closing",
        name: "ctaText",
        label: "Text",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    key: "about",
    label: "About page",
    description:
      "Everything on the about page that isn't a list you edit elsewhere.",
    siteHref: "/about",
    fields: [
      {
        section: "Top",
        name: "title",
        label: "Headline",
        type: "text",
        required: true,
      },
      {
        section: "Top",
        name: "lede",
        label: "Subtitle",
        type: "textarea",
        required: true,
        help: "{years} becomes the live number.",
      },
      {
        section: "Bio",
        name: "bioLead",
        label: "Opening paragraph",
        type: "textarea",
        required: true,
        help: "Shown large.",
      },
      {
        section: "Bio",
        name: "bio",
        label: "Rest of the bio",
        type: "textarea",
        required: true,
      },
      {
        section: "Bio",
        name: "principles",
        label: "How I work",
        type: "lines",
        help: "One per line as  text | essay-address , e.g.  Ship it, then make it better | art-of-shipping",
      },
      {
        section: "Bio",
        name: "stack",
        label: "Stack",
        type: "lines",
        help: "One tool per line.",
      },
      {
        section: "Section titles",
        name: "workTitle",
        label: "Work",
        type: "text",
        required: true,
      },
      {
        section: "Section titles",
        name: "educationTitle",
        label: "Education",
        type: "text",
        required: true,
      },
      {
        section: "Section titles",
        name: "talksTitle",
        label: "Talks",
        type: "text",
        required: true,
      },
      {
        section: "Section titles",
        name: "instagramTitle",
        label: "Instagram",
        type: "text",
        required: true,
      },
      {
        section: "More options",
        name: "playlistUrl",
        label: "Spotify embed address",
        type: "url",
        advanced: true,
      },
    ],
  },
  {
    key: "profile",
    label: "Site settings",
    description:
      "Your name, photo and links, used in the header, footer and buttons everywhere.",
    siteHref: "/",
    fields: [
      {
        section: "You",
        name: "name",
        label: "Name",
        type: "text",
        required: true,
      },
      {
        section: "You",
        name: "tagline",
        label: "Tagline under your name",
        type: "text",
        required: true,
      },
      {
        section: "You",
        name: "avatarId",
        label: "Avatar",
        type: "image",
        help: "Square. Shown in the header and on the about page.",
      },
      {
        section: "Links",
        name: "chatUrl",
        label: "Chat link",
        type: "url",
        required: true,
        help: "Where “Let's chat” and “Say hi” go.",
      },
      { section: "Links", name: "instagram", label: "Instagram", type: "url" },
      { section: "Links", name: "github", label: "GitHub", type: "url" },
      { section: "Links", name: "x", label: "X (Twitter)", type: "url" },
      { section: "Links", name: "linkedin", label: "LinkedIn", type: "url" },
      {
        section: "Links",
        name: "telegram",
        label: "Telegram channel",
        type: "url",
      },
    ],
  },
  {
    key: "footer",
    label: "Footer",
    description: "The three lines at the bottom of every page.",
    siteHref: "/",
    fields: [
      {
        section: "Lines",
        name: "line1",
        label: "Line 1",
        type: "text",
        required: true,
      },
      {
        section: "Lines",
        name: "line2",
        label: "Line 2",
        type: "text",
        required: true,
      },
      {
        section: "Lines",
        name: "line3",
        label: "Line 3",
        type: "text",
        required: true,
      },
      {
        section: "Lines",
        name: "copyright",
        label: "Copyright name",
        type: "text",
        required: true,
      },
    ],
  },
];

export const getSettingsPage = (key: string) =>
  settingsPages.find((page) => page.key === key);
