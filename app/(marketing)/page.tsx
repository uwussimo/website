import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { experience, formatPeriod, startups } from "@/lib/career";
import { PostCard } from "./_components/post-card";
import { StartupCard } from "./_components/startup-card";
import { CtaBanner } from "./_components/cta-banner";

const FEATURED_STARTUPS = ["42.uz", "optochka.com", "educator.uz"];

export default function Home() {
  const allPosts = getAllPosts();
  const posts = allPosts.slice(0, 4);
  const featured = FEATURED_STARTUPS.flatMap(
    (name) => startups.find((s) => s.name === name) ?? [],
  );

  const numbers = [
    {
      value: String(startups.length),
      label: "startups founded, built or advised",
    },
    { value: "13.7k+", label: "learners on 42.uz" },
    { value: "100k+", label: "visits to khmapp in its first two months" },
    { value: String(allPosts.length), label: "essays on building & shipping" },
  ];

  return (
    <main>
      <section className="mx-auto flex max-w-[900px] flex-col items-center px-6 pb-24 pt-12 text-center sm:pb-32 sm:pt-20">
        <p className="font-serif text-[22px] leading-none">✦ usufdev</p>
        <h1 className="mt-6 text-[44px] font-medium leading-[1.02] tracking-[-0.03em] text-foreground sm:text-[74px]">
          <em className="font-normal">building products</em>
          <br />
          that people love
        </h1>
        <Link
          href="/essays"
          className="link-dashed mt-9 text-[22px] font-bold leading-snug sm:text-[26px]"
        >
          read essays
        </Link>
      </section>

      <section className="mx-auto max-w-[760px] px-6 sm:px-8">
        <h2 className="heading-serif">
          hey, i&apos;m yusuf, a <em>builder & engineer</em> who likes to ship
        </h2>
        <p className="lead mt-8">
          i&apos;m sharing lessons from the many startups i have founded &
          built, <em>so you don&apos;t have to make the same mistakes.</em>
        </p>
        <p className="lead mt-5">
          i believe the best products come from teams who care about their
          users. i&apos;m that guy who likes creating and telling stories about
          things people actually want to use.
        </p>
        <p className="lead mt-5">
          <Link href="/about" className="link-dashed font-bold">
            more about me
          </Link>
        </p>
      </section>

      <section className="mx-auto mt-28 max-w-[1040px] px-6 sm:px-8">
        <div className="card-soft grid gap-10 p-8 sm:p-12 md:grid-cols-[1fr_1.3fr] md:items-center">
          <h2 className="heading-serif">
            <em>so far,</em> in numbers
          </h2>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8">
            {numbers.map(({ value, label }) => (
              <div key={label}>
                <dd className="font-serif text-[40px] leading-none tracking-[-0.02em] sm:text-[48px]">
                  {value}
                </dd>
                <dt className="mt-2 text-[15px] leading-snug text-foreground/70">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto mt-28 grid max-w-[1040px] gap-10 px-6 sm:px-8 md:grid-cols-[1fr_1.3fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <h2 className="heading-serif">
            startups <em>i&apos;ve built</em>
          </h2>
          <p className="lead mt-6">
            i help startups to launch fast and reach the market quickly. some
            are live, some ended, one got acquired.
          </p>
          <p className="lead mt-5">
            <Link href="/startups" className="link-dashed font-bold">
              see all {startups.length}
            </Link>
          </p>
        </div>
        <div className="space-y-6">
          {featured.map((startup) => (
            <StartupCard key={startup.name} startup={startup} compact />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-[760px] px-6 sm:px-8">
        <h2 className="heading-serif">
          where <em>i&apos;ve worked</em>
        </h2>
        <div className="mt-10 border-t border-foreground/20 lowercase">
          {experience.slice(0, 5).map((item) => (
            <div
              key={item.company}
              className="flex items-baseline justify-between gap-6 border-b border-foreground/20 py-5"
            >
              <div className="min-w-0">
                <p className="text-[18px] font-medium leading-snug tracking-[-0.01em] sm:text-[20px]">
                  {item.company}
                </p>
                <p className="meta">{item.role}</p>
              </div>
              <p className="meta shrink-0">{formatPeriod(item)}</p>
            </div>
          ))}
        </div>
        <p className="lead mt-8">
          <Link href="/work" className="link-dashed font-bold">
            what i did there
          </Link>
        </p>
      </section>

      <section className="mx-auto mt-28 max-w-[760px] px-6 sm:px-8">
        <h2 className="heading-serif text-center">
          <em>latest</em> essays
        </h2>
        <div className="mt-10 border-t border-foreground/20">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              post={{
                title: post.title,
                date: post.date,
                readTime: post.readTime,
                href: `/essays/${post.slug}`,
              }}
            />
          ))}
        </div>
        <p className="lead mt-8">
          <Link href="/essays" className="link-dashed font-bold">
            all essays
          </Link>
        </p>
      </section>

      <CtaBanner />
    </main>
  );
}
