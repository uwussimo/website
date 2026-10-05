// Display helpers for startups and work history. The data itself lives in
// the database; see lib/content.ts.

export const statusLabels: Record<string, string> = {
  active: "live",
  stealth: "stealth",
  discontinued: "ended",
  acquired: "acquired",
};

/**
 * Dates are "YYYY" or "YYYY-MM"; the more precise they are, the more precise
 * the duration shown. `endDate: "present"` means still there; leave it empty
 * when the role is over but the date isn't known. Entries without dates fall
 * back to the free-form `whenLabel`.
 */
type Dated = {
  startDate: string | null;
  endDate: string | null;
  whenLabel: string | null;
};

function parseDate(value: string, now: Date): Date {
  if (value === "present") return now;
  const [year, month] = value.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, 1);
}

const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

function formatDate(value: string): string {
  if (value === "present") return "now";
  const [year, month] = value.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

export function formatPeriod({ startDate, endDate, whenLabel }: Dated): string {
  if (!startDate) return whenLabel ?? "";
  if (!endDate) return formatDate(startDate);
  const from = formatDate(startDate);
  const to = formatDate(endDate);
  return from === to ? from : `${from} — ${to}`;
}

export function formatDuration(
  { startDate, endDate }: Dated,
  now: Date = new Date(),
): string | null {
  if (!startDate || !endDate) return null;
  const from = parseDate(startDate, now);
  const to = parseDate(endDate, now);
  // year-only dates can be off by most of a year, so say so
  if (!startDate.includes("-")) {
    return `~${plural(Math.max(1, to.getFullYear() - from.getFullYear()), "yr")}`;
  }
  // both the first and the last month count, the way linkedin shows it
  const months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth()) +
    1;
  const years = Math.floor(months / 12);
  const parts = [
    years > 0 && plural(years, "yr"),
    months % 12 > 0 && plural(months % 12, "mo"),
  ].filter(Boolean);
  return parts.join(" ") || "<1 mo";
}
