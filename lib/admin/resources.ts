// What the dashboard can edit. Each resource is one database table; its
// fields drive both the form and how a submitted form is read back.

export type Field = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "markdown"
    | "lines"
    | "number"
    | "checkbox"
    | "select"
    | "image";
  required?: boolean;
  options?: { value: string; label: string }[];
  help?: string;
};

export type Row = Record<string, unknown> & { id: string };

export type Resource = {
  key: string;
  model:
    "Startup" | "Experience" | "Essay" | "Talk" | "Place" | "InstagramPost";
  label: string;
  singular: string;
  title: (row: Row) => string;
  subtitle?: (row: Row) => string;
  orderBy: { field: string; direction: "asc" | "desc" };
  /** has a `slug` that polaroids attach to */
  polaroids?: boolean;
  fields: Field[];
};

const sortOrder: Field = {
  name: "sortOrder",
  label: "order",
  type: "number",
  help: "lower numbers come first",
};

export const resources: Resource[] = [
  {
    key: "startups",
    model: "Startup",
    label: "startups",
    singular: "startup",
    title: (row) => String(row.name),
    subtitle: (row) => `${row.role} · ${row.status}`,
    orderBy: { field: "sortOrder", direction: "asc" },
    polaroids: true,
    fields: [
      { name: "name", label: "name", type: "text", required: true },
      {
        name: "slug",
        label: "slug",
        type: "text",
        required: true,
        help: "short id, lowercase with dashes. polaroids attach to it, and a work entry with the same slug shares them",
      },
      { name: "role", label: "your role", type: "text", required: true },
      {
        name: "description",
        label: "description",
        type: "textarea",
        required: true,
      },
      { name: "users", label: "users", type: "text", required: true },
      { name: "mrr", label: "mrr", type: "text", required: true },
      { name: "founded", label: "founded", type: "text", required: true },
      {
        name: "status",
        label: "status",
        type: "select",
        required: true,
        options: [
          { value: "active", label: "live" },
          { value: "stealth", label: "stealth" },
          { value: "discontinued", label: "ended" },
          { value: "acquired", label: "acquired" },
        ],
      },
      { name: "link", label: "website", type: "text" },
      {
        name: "logoId",
        label: "logo",
        type: "image",
        help: "optional. without one, the website's favicon is used",
      },
      {
        name: "featured",
        label: "show on the home page",
        type: "checkbox",
      },
      sortOrder,
    ],
  },
  {
    key: "work",
    model: "Experience",
    label: "work & education",
    singular: "entry",
    title: (row) => String(row.company),
    subtitle: (row) => `${row.kind} · ${row.role}`,
    orderBy: { field: "sortOrder", direction: "asc" },
    polaroids: true,
    fields: [
      {
        name: "kind",
        label: "section",
        type: "select",
        required: true,
        options: [
          { value: "work", label: "where i've worked" },
          { value: "education", label: "where i studied" },
          { value: "early", label: "how it started" },
        ],
      },
      {
        name: "company",
        label: "company or school",
        type: "text",
        required: true,
      },
      {
        name: "role",
        label: "role or programme",
        type: "text",
        required: true,
      },
      {
        name: "slug",
        label: "slug",
        type: "text",
        help: "optional. needed for polaroids; use a startup's slug to share its photos",
      },
      { name: "link", label: "website", type: "text" },
      {
        name: "startDate",
        label: "start",
        type: "text",
        help: "YYYY-MM or YYYY",
      },
      {
        name: "endDate",
        label: "end",
        type: "text",
        help: "YYYY-MM, YYYY, or the word present. leave empty if unknown",
      },
      {
        name: "whenLabel",
        label: "label instead of dates",
        type: "text",
        help: "shown only when there is no start date, e.g. age 17",
      },
      {
        name: "note",
        label: "note",
        type: "text",
        help: "e.g. ended, acquired by 42.uz",
      },
      { name: "location", label: "location", type: "text" },
      { name: "summary", label: "what it was", type: "textarea" },
      {
        name: "highlights",
        label: "what you did",
        type: "lines",
        help: "one per line",
      },
      sortOrder,
    ],
  },
  {
    key: "essays",
    model: "Essay",
    label: "essays",
    singular: "essay",
    title: (row) => String(row.title),
    subtitle: (row) => `${row.date}${row.published ? "" : " · draft"}`,
    orderBy: { field: "date", direction: "desc" },
    fields: [
      { name: "title", label: "title", type: "text", required: true },
      {
        name: "slug",
        label: "slug",
        type: "text",
        required: true,
        help: "the address: /essays/<slug>",
      },
      {
        name: "date",
        label: "date",
        type: "text",
        required: true,
        help: "YYYY-MM-DD",
      },
      {
        name: "readTime",
        label: "read time",
        type: "text",
        required: true,
        help: "e.g. 4 min",
      },
      { name: "description", label: "description", type: "textarea" },
      {
        name: "content",
        label: "content",
        type: "markdown",
        required: true,
        help: "markdown",
      },
      { name: "published", label: "published", type: "checkbox" },
    ],
  },
  {
    key: "talks",
    model: "Talk",
    label: "talks",
    singular: "talk",
    title: (row) => String(row.title),
    subtitle: (row) => `${row.place} · ${row.dateLabel}`,
    orderBy: { field: "sortOrder", direction: "asc" },
    fields: [
      { name: "title", label: "title", type: "text", required: true },
      { name: "place", label: "where", type: "text", required: true },
      {
        name: "dateLabel",
        label: "when",
        type: "text",
        required: true,
        help: "e.g. june 2026",
      },
      { name: "text", label: "description", type: "textarea" },
      { name: "href", label: "link", type: "text" },
      { name: "photoId", label: "photo", type: "image" },
      { name: "photoAlt", label: "photo description", type: "text" },
      sortOrder,
    ],
  },
  {
    key: "places",
    model: "Place",
    label: "places",
    singular: "place",
    title: (row) => String(row.name),
    subtitle: (row) => `${row.latitude}, ${row.longitude}`,
    orderBy: { field: "sortOrder", direction: "asc" },
    fields: [
      { name: "name", label: "name", type: "text", required: true },
      { name: "latitude", label: "latitude", type: "number", required: true },
      { name: "longitude", label: "longitude", type: "number", required: true },
      {
        name: "photoId",
        label: "photo",
        type: "image",
        help: "places with a photo also get a polaroid on the about page",
      },
      { name: "photoAlt", label: "photo description", type: "text" },
      {
        name: "photoFocus",
        label: "photo focus",
        type: "text",
        help: "where to crop around, e.g. 50% 30%",
      },
      {
        ...sortOrder,
        help: "lower numbers come first. the globe starts at the first place",
      },
    ],
  },
  {
    key: "instagram",
    model: "InstagramPost",
    label: "instagram posts",
    singular: "post",
    title: (row) => String(row.caption),
    subtitle: (row) => `${row.place} · ${row.dateLabel}`,
    orderBy: { field: "sortOrder", direction: "asc" },
    fields: [
      { name: "caption", label: "caption", type: "text", required: true },
      { name: "href", label: "link to the post", type: "text", required: true },
      { name: "mediaId", label: "photo", type: "image", required: true },
      { name: "alt", label: "photo description", type: "text", required: true },
      { name: "place", label: "place", type: "text", required: true },
      {
        name: "dateLabel",
        label: "date",
        type: "text",
        required: true,
        help: "e.g. jul 2026",
      },
      {
        name: "focus",
        label: "photo focus",
        type: "text",
        help: "where to crop around, e.g. 50% 30%",
      },
      sortOrder,
    ],
  },
];

export const getResource = (key: string) =>
  resources.find((resource) => resource.key === key);
