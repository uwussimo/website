import Image from "next/image";
import { cn } from "@/lib/utils";

// public domain objects from the met's open access collection, cut out.
// `id` is the met object id, used for the credit link.
const artifacts = {
  astrolabe: {
    src: "/artifacts/astrolabe.webp",
    width: 1000,
    height: 1487,
    alt: "A brass planispheric astrolabe made in 1654",
    caption: "planispheric astrolabe, 1654",
    id: 451699,
  },
  globe: {
    src: "/artifacts/globe.webp",
    width: 840,
    height: 1245,
    alt: "A silver celestial globe with clockwork, carried by a winged horse",
    caption: "celestial globe with clockwork, 1579",
    id: 193606,
  },
  "lion-clock": {
    src: "/artifacts/lion-clock.webp",
    width: 640,
    height: 1284,
    alt: "A gilded automaton clock in the form of a lion",
    caption: "automaton clock, ca. 1620–35",
    id: 196404,
  },
  "mirror-clock": {
    src: "/artifacts/mirror-clock.webp",
    width: 520,
    height: 1271,
    alt: "A gilded brass mirror clock",
    caption: "mirror clock, ca. 1565–70",
    id: 193609,
  },
  lion: {
    src: "/artifacts/lion.webp",
    width: 1100,
    height: 825,
    alt: "A marble statue of a crouching lion",
    caption: "marble lion, ca. 400–390 bce",
    id: 248140,
  },
};

const motions = {
  sway: "animate-sway",
  float: "animate-float",
  none: "",
};

export function Artifact({
  name,
  motion = "float",
  priority = false,
  sizes = "(min-width: 640px) 360px, 250px",
  className,
  style,
}: {
  name: keyof typeof artifacts;
  motion?: keyof typeof motions;
  priority?: boolean;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { src, width, height, alt, caption, id } = artifacts[name];

  return (
    <figure
      className={cn("flex flex-col items-center", className)}
      style={style}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority={priority}
        sizes={sizes}
        className={cn(
          "h-auto w-full drop-shadow-[0_24px_30px_rgb(0_0_0/0.18)]",
          motions[motion],
        )}
      />
      <figcaption className="meta mt-5 text-center text-[13px]">
        <a
          href={`https://www.metmuseum.org/art/collection/search/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          {caption} · the met
        </a>
      </figcaption>
    </figure>
  );
}
