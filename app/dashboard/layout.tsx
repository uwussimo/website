import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Dashboard | usufdev",
  robots: { index: false, follow: false },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-surface text-[15px] text-foreground">
      {children}
      <Toaster position="top-center" />
    </div>
  );
};

export default DashboardLayout;
