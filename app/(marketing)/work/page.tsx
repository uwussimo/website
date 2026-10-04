import Link from "next/link";
import type { Metadata } from "next";
import { earlyDays, experience } from "@/lib/career";
import { ExperienceItem } from "../_components/experience-item";

export const metadata: Metadata = {
  title: "Work | Mukhammadyusuf Abdurakhimov",
  description:
    "Where I've worked, for how long, and what I did there. From selling juice at 11 to building startups.",
};

export default function Work() {
  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[760px] px-6 pt-12 sm:px-8 sm:pt-16">
      <header className="mb-12">
        <h1 className="heading-serif">
          where <em>i&apos;ve worked</em>
        </h1>
        <p className="lead mt-6">
          every company i&apos;ve founded, built or worked at: for how long, and{" "}
          <em>what i did there.</em>
        </p>
      </header>

      <section className="border-b border-foreground/20">
        {experience.map((item) => (
          <ExperienceItem key={item.company} experience={item} />
        ))}
      </section>

      <section className="mt-28">
        <h2 className="heading-serif">
          how it <em>started</em>
        </h2>
        <p className="lead mb-12 mt-6">
          before startups there was sales. everything i know about talking to
          customers i learned here first.
        </p>
        <div className="border-b border-foreground/20">
          {earlyDays.map((item) => (
            <ExperienceItem key={item.company} experience={item} />
          ))}
        </div>
        <p className="lead mt-8">
          <Link
            href="/essays/the-kid-who-sold-somsa-on-sundays"
            className="link-dashed font-bold"
          >
            read the full story
          </Link>
        </p>
      </section>
    </main>
  );
}
