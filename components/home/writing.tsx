import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import Image from "next/image";

const writing = [
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
];
const Writing = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold leading-tight tracking-tight text-primary md:text-3xl sm:leading-10 md:leading-14">
        Writing
      </h3>
      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3">
        {writing.map((item) => (
          <Link href={item.image} key={item.id}>
            <Card>
              <CardHeader>
                <Image
                  alt={item.title}
                  width={1280}
                  height={720}
                  src={item.image}
                  className="rounded-lg mb-2"
                />
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { Writing };
