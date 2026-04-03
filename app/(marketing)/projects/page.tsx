"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Live" },
  { value: "stealth", label: "Stealth" },
  { value: "discontinued", label: "Ended" },
  { value: "acquired", label: "Acquired" },
] as const;

const projects: {
  name: string;
  role: string;
  desc: string;
  users: string;
  mrr: string;
  founded: string;
  status: string;
  link: string | null;
}[] = [
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

const statusConfig: Record<
  string,
  {
    variant: "default" | "secondary" | "outline" | "destructive";
    label: string;
  }
> = {
  active: { variant: "default", label: "Live" },
  stealth: { variant: "secondary", label: "Stealth" },
  discontinued: { variant: "outline", label: "Ended" },
  "coming soon": { variant: "secondary", label: "Coming soon" },
  acquired: { variant: "outline", label: "Acquired" },
};

function ProjectLogo({ name, link }: { name: string; link?: string | null }) {
  const [faviconError, setFaviconError] = useState(false);
  const initial = name.charAt(0).toUpperCase();
  const faviconUrl = link && !faviconError ? `${link}/favicon.ico` : null;
  return (
    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-secondary shadow-sm sm:size-16">
      {faviconUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={faviconUrl}
          alt={name}
          width={64}
          height={64}
          className="size-full object-contain p-2"
          onError={() => setFaviconError(true)}
        />
      ) : (
        <span className="text-xl font-semibold text-foreground">{initial}</span>
      )}
    </div>
  );
}

export default function Projects() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredProjects =
    statusFilter === "all"
      ? projects
      : projects.filter((p) => p.status === statusFilter);

  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[680px] px-6 pb-24 pt-20 sm:px-8">
      <header className="mb-12">
        <h1 className="mb-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
          my involvements
        </h1>
        <p className="mb-8 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          i help startups to launch fast and reach the market quickly.
        </p>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setStatusFilter(value)}
              className={cn(
                "rounded-full px-3 py-1.5 font-mono text-[12px] transition-colors",
                statusFilter === value
                  ? "border border-border bg-secondary text-foreground"
                  : "border border-transparent bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-6">
        {filteredProjects.map((project) => {
          const status = statusConfig[project.status] ?? {
            variant: "outline" as const,
            label: project.status,
          };
          const cardClass =
            "group flex gap-4 rounded-2xl border border-border bg-secondary/50 p-4 transition-all hover:bg-secondary/80 sm:p-5";

          return project.link ? (
            <Link
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
            >
              <ProjectLogo name={project.name} link={project.link} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {project.name}
                    </h2>
                    <p className="font-mono text-[12px] text-foreground/70">
                      {project.role}
                    </p>
                  </div>
                  <Badge variant={status.variant} className="shrink-0">
                    {status.label}
                  </Badge>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-foreground/70">
                  {project.desc}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 font-mono text-[12px] text-foreground/70">
                  <span>{project.users} users</span>
                  <span>{project.mrr} mrr</span>
                  <span>{project.founded}</span>
                </div>
                <span className="mt-3 inline-block font-mono text-[13px] text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  open →
                </span>
              </div>
            </Link>
          ) : (
            <div key={project.name} className={cn(cardClass, "cursor-default")}>
              <ProjectLogo name={project.name} link={project.link} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {project.name}
                    </h2>
                    <p className="font-mono text-[12px] text-foreground/70">
                      {project.role}
                    </p>
                  </div>
                  <Badge variant={status.variant} className="shrink-0">
                    {status.label}
                  </Badge>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-foreground/70">
                  {project.desc}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 font-mono text-[12px] text-foreground/70">
                  <span>{project.users} users</span>
                  <span>{project.mrr} mrr</span>
                  <span>{project.founded}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <p className="py-12 text-center font-mono text-[13px] text-foreground/70">
          no projects in this category
        </p>
      )}

      <p className="mt-16 text-center font-mono text-[13px] text-foreground/70">
        coming soon
      </p>
    </main>
  );
}
