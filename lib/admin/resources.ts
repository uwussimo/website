// What the dashboard can edit. Each resource is one database table; its
// fields drive both the form and how a submitted form is read back.

export type Field = {
  name: string;
  label: string;
  type:
    | "text"
    | "url"
    | "number"
    | "textarea"
    | "markdown"
    | "lines"
    | "checkbox"
    | "segmented"
    | "image"
    | "focus"
    | "date"
    | "month"
    | "slug"
    | "stats"
    | "strip";
  required?: boolean;
  options?: { value: string; label: string }[];
  help?: string;
  placeholder?: string;
  /** form section heading */
  section: string;
  /** collapsed under "more options" until opened */
  advanced?: boolean;
  /** slug: the field it is derived from; focus: the image it applies to */
  from?: string;
  /** month: lets an end date be "present" */
  presentLabel?: string;
};

export type Row = Record<string, unknown> & { id: string };

export type Chip = { label: string; tone: "live" | "quiet" | "warn" };

export type Resource = {
  key: string;
  model:
    "Startup" | "Experience" | "Essay" | "Talk" | "Place" | "InstagramPost";
  label: string;
  singular: string;
  title: (row: Row) => string;
  subtitle?: (row: Row) => string;
  chip?: (row: Row) => Chip | null;
  /** where this record shows on the public site */
  siteHref: (row: Row) => string;
  orderBy: { field: string; direction: "asc" | "desc" };
  /** rows can be dragged into order (ordered by sortOrder) */
  reorderable?: boolean;
  /** lists split into groups, each with its own order */
  groupBy?: { field: string; groups: { value: string; label: string }[] };
  /** has a `slug` that polaroids attach to */
  polaroids?: boolean;
  /** the field shown as a thumbnail in lists */
  thumbnail?: string;
  fields: Field[];
};

const statusChip = (status: unknown): Chip =>
  status === "active"
    ? { label: "live", tone: "live" }
    : status === "stealth"
      ? { label: "stealth", tone: "warn" }
      : { label: status === "acquired" ? "acquired" : "ended", tone: "quiet" };

export const resources: Resource[] = [
  {
    key: "startups",
    model: "Startup",
    label: "Startups",
    singular: "startup",
    title: (row) => String(row.name),
    subtitle: (row) => `${row.role} · founded ${row.founded}`,
    chip: (row) => statusChip(row.status),
    siteHref: (row) => `/startups/${row.slug}`,
    orderBy: { field: "sortOrder", direction: "asc" },
    reorderable: true,
    polaroids: true,
    thumbnail: "logoId",
    fields: [
      {
        section: "Basics",
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        placeholder: "oqim.app",
      },
      {
        section: "Basics",
        name: "role",
        label: "Your role",
        type: "text",
        required: true,
        placeholder: "Founder",
      },
      {
        section: "Basics",
        name: "description",
        label: "One-paragraph description",
        type: "textarea",
        required: true,
      },
      {
        section: "Basics",
        name: "status",
        label: "Status",
        type: "segmented",
        required: true,
        options: [
          { value: "active", label: "Live" },
          { value: "stealth", label: "Stealth" },
          { value: "discontinued", label: "Ended" },
          { value: "acquired", label: "Acquired" },
        ],
      },
      {
        section: "Basics",
        name: "link",
        label: "Website",
        type: "url",
        placeholder: "https://",
      },
      {
        section: "Basics",
        name: "logoId",
        label: "Logo",
        type: "image",
        help: "Square works best. Without one, the website's favicon is used.",
      },
      {
        section: "Numbers",
        name: "users",
        label: "Users",
        type: "text",
        required: true,
        placeholder: "13.7k+",
      },
      {
        section: "Numbers",
        name: "mrr",
        label: "MRR",
        type: "text",
        required: true,
        placeholder: "NDA",
      },
      {
        section: "Numbers",
        name: "founded",
        label: "Founded",
        type: "text",
        required: true,
        placeholder: "2024",
      },
      {
        section: "Visibility",
        name: "featured",
        label: "Show on the home page",
        type: "checkbox",
      },
      {
        section: "More options",
        name: "slug",
        label: "Address",
        type: "slug",
        from: "name",
        required: true,
        advanced: true,
        help: "Filled in from the name. Polaroids and the matching work entry attach to it.",
      },
    ],
  },
  {
    key: "work",
    model: "Experience",
    label: "Work & education",
    singular: "entry",
    title: (row) => String(row.company),
    subtitle: (row) => String(row.role),
    groupBy: {
      field: "kind",
      groups: [
        { value: "work", label: "Work" },
        { value: "education", label: "Education" },
      ],
    },
    chip: (row) =>
      row.kind === "education"
        ? { label: "education", tone: "quiet" }
        : row.endDate === "present"
          ? { label: "current", tone: "live" }
          : null,
    siteHref: () => "/about#experience",
    orderBy: { field: "sortOrder", direction: "asc" },
    reorderable: true,
    polaroids: true,
    fields: [
      {
        section: "Basics",
        name: "kind",
        label: "Section",
        type: "segmented",
        required: true,
        options: [
          { value: "work", label: "Work" },
          { value: "education", label: "Education" },
        ],
      },
      {
        section: "Basics",
        name: "company",
        label: "Company or school",
        type: "text",
        required: true,
      },
      {
        section: "Basics",
        name: "role",
        label: "Role or programme",
        type: "text",
        required: true,
      },
      {
        section: "Basics",
        name: "link",
        label: "Website",
        type: "url",
        placeholder: "https://",
      },
      {
        section: "Basics",
        name: "location",
        label: "Location",
        type: "text",
        placeholder: "Tashkent",
      },
      { section: "Dates", name: "startDate", label: "Started", type: "month" },
      {
        section: "Dates",
        name: "endDate",
        label: "Ended",
        type: "month",
        presentLabel: "I'm still here",
      },
      {
        section: "What you did",
        name: "summary",
        label: "What it was",
        type: "textarea",
      },
      {
        section: "What you did",
        name: "highlights",
        label: "Highlights",
        type: "lines",
        help: "One per line.",
      },
      {
        section: "More options",
        name: "note",
        label: "Note",
        type: "text",
        advanced: true,
        placeholder: "acquired by 42.uz",
      },
      {
        section: "More options",
        name: "whenLabel",
        label: "Label instead of dates",
        type: "text",
        advanced: true,
        help: "Shown only when there is no start date, e.g. age 17.",
      },
      {
        section: "More options",
        name: "slug",
        label: "Share photos with a startup",
        type: "slug",
        advanced: true,
        help: "Use a startup's address (e.g. optochka) and this entry shows its polaroids.",
      },
    ],
  },
  {
    key: "essays",
    model: "Essay",
    label: "Essays",
    singular: "essay",
    title: (row) => String(row.title),
    subtitle: (row) => `${row.date} · ${row.readTime}`,
    chip: (row) => (row.published ? null : { label: "draft", tone: "warn" }),
    siteHref: (row) => `/essays/${row.slug}`,
    orderBy: { field: "date", direction: "desc" },
    fields: [
      {
        section: "Basics",
        name: "title",
        label: "Title",
        type: "text",
        required: true,
      },
      {
        section: "Basics",
        name: "date",
        label: "Date",
        type: "date",
        required: true,
      },
      {
        section: "Basics",
        name: "description",
        label: "Short description",
        type: "textarea",
        help: "Shown in lists and search results.",
      },
      {
        section: "Content",
        name: "content",
        label: "Essay",
        type: "markdown",
        required: true,
      },
      {
        section: "Visibility",
        name: "published",
        label: "Published",
        type: "checkbox",
        help: "Unpublished essays are only visible here.",
      },
      {
        section: "More options",
        name: "slug",
        label: "Address",
        type: "slug",
        from: "title",
        required: true,
        advanced: true,
        help: "Filled in from the title. Changing it breaks old links.",
      },
      {
        section: "More options",
        name: "readTime",
        label: "Read time",
        type: "text",
        advanced: true,
        help: "Worked out from the length when left empty.",
      },
    ],
  },
  {
    key: "talks",
    model: "Talk",
    label: "Talks",
    singular: "talk",
    title: (row) => String(row.title),
    subtitle: (row) => `${row.place} · ${row.dateLabel}`,
    siteHref: () => "/about#talks",
    orderBy: { field: "sortOrder", direction: "asc" },
    reorderable: true,
    thumbnail: "photoId",
    fields: [
      {
        section: "Basics",
        name: "title",
        label: "Title",
        type: "text",
        required: true,
      },
      {
        section: "Basics",
        name: "place",
        label: "Where",
        type: "text",
        required: true,
        placeholder: "Tashkent",
      },
      {
        section: "Basics",
        name: "dateLabel",
        label: "When",
        type: "text",
        required: true,
        placeholder: "June 2026",
      },
      {
        section: "Basics",
        name: "text",
        label: "Description",
        type: "textarea",
      },
      {
        section: "Basics",
        name: "href",
        label: "Link",
        type: "url",
        placeholder: "https://",
      },
      { section: "Photo", name: "photoId", label: "Photo", type: "image" },
      {
        section: "Photo",
        name: "photoAlt",
        label: "Photo description",
        type: "text",
        help: "For screen readers and search engines.",
      },
    ],
  },
  {
    key: "places",
    model: "Place",
    label: "Places",
    singular: "place",
    title: (row) => String(row.name),
    subtitle: (row) => `${row.latitude}, ${row.longitude}`,
    siteHref: () => "/about",
    orderBy: { field: "sortOrder", direction: "asc" },
    reorderable: true,
    thumbnail: "photoId",
    fields: [
      {
        section: "Basics",
        name: "name",
        label: "City",
        type: "text",
        required: true,
      },
      {
        section: "Basics",
        name: "latitude",
        label: "Latitude",
        type: "number",
        required: true,
        placeholder: "41.2995",
      },
      {
        section: "Basics",
        name: "longitude",
        label: "Longitude",
        type: "number",
        required: true,
        placeholder: "69.2401",
      },
      {
        section: "Photo",
        name: "photoId",
        label: "Photo",
        type: "image",
        help: "The first place with a photo is the city card on the about page.",
      },
      {
        section: "Photo",
        name: "photoFocus",
        label: "Focus",
        type: "focus",
        from: "photoId",
      },
      {
        section: "Photo",
        name: "photoAlt",
        label: "Photo description",
        type: "text",
      },
    ],
  },
  {
    key: "instagram",
    model: "InstagramPost",
    label: "Instagram",
    singular: "post",
    title: (row) => String(row.caption),
    subtitle: (row) => `${row.place} · ${row.dateLabel}`,
    siteHref: () => "/about",
    orderBy: { field: "sortOrder", direction: "asc" },
    reorderable: true,
    thumbnail: "mediaId",
    fields: [
      {
        section: "Photo",
        name: "mediaId",
        label: "Photo",
        type: "image",
        required: true,
      },
      {
        section: "Photo",
        name: "focus",
        label: "Focus",
        type: "focus",
        from: "mediaId",
      },
      {
        section: "Photo",
        name: "alt",
        label: "Photo description",
        type: "text",
        required: true,
      },
      {
        section: "Basics",
        name: "caption",
        label: "Caption",
        type: "text",
        required: true,
      },
      {
        section: "Basics",
        name: "place",
        label: "Place",
        type: "text",
        required: true,
      },
      {
        section: "Basics",
        name: "dateLabel",
        label: "Date",
        type: "text",
        required: true,
        placeholder: "jul 2026",
      },
      {
        section: "Basics",
        name: "href",
        label: "Link to the post",
        type: "url",
        required: true,
        placeholder: "https://www.instagram.com/p/…",
      },
    ],
  },
];

export const getResource = (key: string) =>
  resources.find((resource) => resource.key === key);
