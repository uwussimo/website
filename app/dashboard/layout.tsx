import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | usufdev",
  robots: { index: false, follow: false },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-[15px] text-foreground">
      {children}
    </div>
  );
};

export default DashboardLayout;
