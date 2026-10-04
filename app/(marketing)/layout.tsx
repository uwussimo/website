import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site min-h-screen overflow-x-clip bg-background pt-20 text-foreground">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
