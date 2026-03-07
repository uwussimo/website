export default function Talks() {
  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] max-w-[680px] px-6 pb-24 pt-20 sm:px-8">
      <h1 className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
        tech talks
      </h1>
      <p className="text-[15px] leading-relaxed text-foreground/70">
        talks & workshops coming soon. in the meantime, catch me on{" "}
        <a
          href="https://t.me/usufdev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:underline"
        >
          telegram
        </a>
        .
      </p>
    </main>
  );
}
