import type { Metadata } from "next";
import { Geist_Mono, Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TopLoader } from "@/components/providers/top-loader";
import { ThemeProvider } from "@/components/providers/theme";
import { UmamiAnalytics } from "@/components/providers/umami";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "usufdev   building products that people love",
  description:
    "Builder & engineer sharing lessons from startups I've founded & built. From Uzbekistan to United States.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "contain",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", manrope.variable, newsreader.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <noscript>
          <style>{"[data-reveal]{opacity:1;transform:none}"}</style>
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <TopLoader />
        <UmamiAnalytics />
      </body>
    </html>
  );
}
