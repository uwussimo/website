import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background pt-16 text-foreground">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
