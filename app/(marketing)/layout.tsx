import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
