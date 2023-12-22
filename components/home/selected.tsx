import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

const work = [
  {
    id: 1,
    title: "Microsoft Edge",
    description: "Designing browsing experiences for Microsoft Edge.",
    image: "/assets/sample-cover.webp",
  },
  {
    id: 2,
    title: "Microsoft Edge",
    description: "Designing browsing experiences for Microsoft Edge.",
    image: "/assets/sample-cover.webp",
  },
  {
    id: 3,
    title: "Microsoft Edge",
    description: "Designing browsing experiences for Microsoft Edge.",
    image: "/assets/sample-cover.webp",
  },
  {
    id: 4,
    title: "Microsoft Edge",
    description: "Designing browsing experiences for Microsoft Edge.",
    image: "/assets/sample-cover.webp",
  },
];

const SelectedWork = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold leading-tight tracking-tight text-primary md:text-3xl sm:leading-10 md:leading-14">
        Slected Work
      </h3>
      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
        {work.map((item) => (
          <Link href={item.image} key={item.id}>
            <Card className="hover:bg-secondary">
              <CardHeader>
                <Image
                  src={"/assets/sample-cover.webp"}
                  width={1080}
                  height={720}
                  alt="Service Center"
                  className="rounded-lg mb-2"
                />
                <CardTitle>Microsoft Edge</CardTitle>
                <CardDescription>
                  Designing browsing experiences for Microsoft Edge.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { SelectedWork };
