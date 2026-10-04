import { Reveal } from "@/components/reveal";

export const CtaBanner = () => (
  <section className="mx-auto mt-28 max-w-[1040px] px-6 sm:px-8">
    <Reveal
      variant="grow"
      className="grain flex flex-col items-center rounded-[20px] px-6 py-16 text-center text-white shadow-[0_8px_40px_rgb(0_0_0/0.08)] sm:py-20"
    >
      <h2 className="font-serif text-[36px] leading-[1.1] tracking-[-0.02em] sm:text-[52px]">
        let&apos;s build <em className="font-normal">something</em>
      </h2>
      <p className="mt-4 max-w-[520px] text-[17px] leading-[1.5] sm:text-[19px]">
        got an idea, a team that needs to ship, or just a question? i&apos;m{" "}
        <strong>one message away.</strong>
      </p>
      <a
        href="https://t.me/usufdev"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 rounded-lg bg-white px-9 py-3 text-[17px] font-bold leading-none tracking-[-0.03em] text-black transition-opacity hover:opacity-85"
      >
        say hi
      </a>
    </Reveal>
  </section>
);
