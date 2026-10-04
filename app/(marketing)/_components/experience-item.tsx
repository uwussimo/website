import { formatDuration, formatPeriod, type Experience } from "@/lib/career";

export function ExperienceItem({ experience }: { experience: Experience }) {
  const { company, link, role, note, location, summary, highlights } =
    experience;
  const duration = formatDuration(experience);

  return (
    <article className="grid gap-x-8 gap-y-3 border-t border-foreground/20 py-8 lowercase sm:grid-cols-[150px_1fr]">
      <div className="flex flex-wrap items-baseline gap-x-3 sm:flex-col sm:gap-1">
        <p className="font-serif text-[19px] italic text-foreground">
          {formatPeriod(experience)}
        </p>
        {duration && (
          <p className="text-[14px] text-foreground/60">{duration}</p>
        )}
        {note && <p className="text-[14px] text-foreground/60">{note}</p>}
        {location && (
          <p className="text-[14px] text-foreground/60">{location}</p>
        )}
      </div>
      <div>
        <h3 className="font-serif text-[26px] leading-tight text-foreground">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-dashed"
            >
              {company}
            </a>
          ) : (
            company
          )}
        </h3>
        <p className="meta mt-0.5">{role}</p>
        <p className="mt-4 text-[17px] leading-[1.55] text-foreground">
          {summary}
        </p>
        {highlights.length > 0 && (
          <ul className="mt-4 space-y-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-[16px] leading-[1.5] text-foreground/75"
              >
                <span aria-hidden className="select-none text-foreground/40">
                  ✦
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
