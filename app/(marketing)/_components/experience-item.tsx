import { formatDuration, formatPeriod } from "@/lib/career";
import type { Experience, Photo } from "@/lib/content";

export function ExperienceItem({
  experience,
  photos = [],
}: {
  experience: Experience;
  photos?: Photo[];
}) {
  const { company, link, role, note, location, summary, highlights } =
    experience;
  const duration = formatDuration(experience);
  const side = [duration, note, location].filter(Boolean).join(" · ");

  return (
    <article className="grid gap-x-10 gap-y-3 border-t border-border py-8 sm:grid-cols-[200px_1fr]">
      <div>
        <p className="body-text font-medium">{formatPeriod(experience)}</p>
        {side && <p className="meta">{side}</p>}
      </div>
      <div>
        <h3 className="h-card">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {company}
            </a>
          ) : (
            company
          )}
          <span className="text-foreground/60"> – {role.toLowerCase()}</span>
        </h3>
        {summary && (
          <p className="body-text mt-3 text-foreground/80">{summary}</p>
        )}
        {highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="body-text flex gap-3 text-foreground/80"
              >
                <span aria-hidden className="text-foreground/30">
                  •
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        )}
        {photos.length > 0 && (
          <div className="mt-5 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
            {photos.map(({ src, caption }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`${company}: ${caption}`}
                loading="lazy"
                className="h-28 w-auto shrink-0 rounded-xl object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
