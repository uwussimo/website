"use client";
import Script from "next/script";

const UmamiAnalytics = () => {
  return (
    <Script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id="428140ec-6988-4ad2-aff1-f4e07f356efe"
    ></Script>
  );
};

export { UmamiAnalytics };
