import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { experience, formatPeriod, startups } from "@/lib/career";
import { Artifact } from "@/components/artifact";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { StartupCard } from "./_components/startup-card";
import { EssayMarquee } from "./_components/essay-marquee";
import { CtaBanner } from "./_components/cta-banner";

const FEATURED_STARTUPS = ["42.uz", "optochka.com", "educator.uz"];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default function Home() {
  const posts = getAllPosts();
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
    { value: String(posts.length), label: "essays on building & shipping" },
  ];

  return (
    <main>
      <section className="mx-auto flex max-w-[900px] flex-col items-center px-6 pb-20 pt-12 text-center sm:pb-28 sm:pt-20">
        <p className="animate-rise font-serif text-[22px] leading-none">
          ✦ usufdev
        </p>
        <h1 className="mt-6 text-[44px] font-medium leading-[1.02] tracking-[-0.03em] text-foreground sm:text-[74px]">
          <span className="animate-rise block" style={delay(120)}>
            <em className="font-normal">building products</em>
          </span>
          <span className="animate-rise block" style={delay(240)}>
            that people love
          </span>
        </h1>
        <Link
          href="/essays"
          className="animate-rise link-dashed mt-9 inline-block text-[22px] font-bold leading-snug sm:text-[26px]"
          style={delay(380)}
        >
          read essays
        </Link>
        <div className="hero-drift mt-14 w-[240px] sm:mt-16 sm:w-[340px]">
          <Artifact
            name="astrolabe"
            motion="sway"
            priority
            className="animate-rise"
            style={delay(520)}
          />
        </div>
      </section>

      <Reveal className="mx-auto max-w-[760px] px-6 sm:px-8">
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
      </Reveal>

      <section className="mt-28">
        <Reveal className="mx-auto max-w-[760px] px-6 sm:px-8">
          <h2 className="heading-serif">
            things i&apos;ve <em>written</em>
          </h2>
          <p className="lead mt-6">
            essays on product, startups and the long road from tashkent.{" "}
            <Link href="/essays" className="link-dashed font-bold">
              read all {posts.length}
            </Link>
          </p>
        </Reveal>
        <Reveal variant="right" className="mt-8">
          <EssayMarquee posts={posts.slice(0, 8)} />
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-[1040px] px-6 sm:px-8">
        <Reveal
          variant="grow"
          className="card-soft grid items-center gap-10 p-8 sm:p-12 md:grid-cols-[0.8fr_1.2fr]"
        >
          <Artifact
            name="globe"
            sizes="260px"
            className="mx-auto w-[200px] sm:w-[250px]"
          />
          <div>
            <h2 className="heading-serif">
              <em>so far,</em> in numbers
            </h2>
            <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-8">
              {numbers.map(({ value, label }) => (
                <div key={label}>
                  <dd className="font-serif text-[40px] leading-none tracking-[-0.02em] sm:text-[48px]">
                    <CountUp value={value} />
                  </dd>
                  <dt className="mt-2 text-[15px] leading-snug text-foreground/70">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-28 grid max-w-[1040px] gap-10 px-6 sm:px-8 md:grid-cols-[1fr_1.3fr]">
        <Reveal variant="left" className="md:sticky md:top-28 md:self-start">
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
          <Artifact
            name="lion-clock"
            sizes="200px"
            className="mt-10 hidden w-[170px] md:flex"
          />
        </Reveal>
        {/* the cards pile up on top of each other as you scroll past */}
        <div className="flex flex-col gap-6 md:pb-10">
          {featured.map((startup, i) => (
            <Reveal
              key={startup.name}
              className="md:sticky"
              style={{ top: `${7 + i * 1.5}rem` }}
            >
              <StartupCard startup={startup} compact />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 grid max-w-[1040px] items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_190px]">
        <Reveal>
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
        </Reveal>
        <Reveal variant="right" className="hidden lg:block">
          <Artifact name="mirror-clock" sizes="190px" />
        </Reveal>
      </section>

      <CtaBanner />
    </main>
  );
}
