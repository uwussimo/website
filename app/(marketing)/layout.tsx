import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getSettings } from "@/lib/content";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <div className="site flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <Navbar profile={settings.profile} />
      <div className="flex-1">{children}</div>
      <Footer profile={settings.profile} footer={settings.footer} />
    </div>
  );
}
