import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TopLoader } from "@/components/providers/top-loader";
import { UmamiAnalytics } from "@/components/providers/umami";

// inter's optical-size axis gives the display cut at headline sizes
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "usufdev — building products that people love",
  description:
    "Builder & engineer sharing lessons from startups I've founded & built. From Uzbekistan to United States.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable, geistMono.variable)}
    >
      <body className="antialiased">
        <noscript>
          <style>{"[data-reveal]{opacity:1;transform:none}"}</style>
        </noscript>
        {children}
        <TopLoader />
        <UmamiAnalytics />
      </body>
    </html>
  );
}
