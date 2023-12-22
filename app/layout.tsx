import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TailwindIndicator } from "@/components/tw-indicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "usufdev.com",
  description: "Mukhammadyusuf Abdurakhimov's personal portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Container>
            <Navbar />
            {children}
          </Container>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
