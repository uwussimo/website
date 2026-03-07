"use client";
import NextTopLoader from "nextjs-toploader";

const TopLoader = () => {
  return (
    <NextTopLoader
      color="currentColor"
      initialPosition={0.05}
      crawlSpeed={100}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={100}
      shadow="0 0 0 #ffffff,0 0 0 #ffffff"
    />
  );
};

export { TopLoader };
