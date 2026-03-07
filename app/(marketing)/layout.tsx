import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background min-h-screen pt-20">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MarketingLayout;
