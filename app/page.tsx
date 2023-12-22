import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected";

const HomePage = () => {
  return (
    <main className="flex flex-col gap-6">
      <Hero />
      <SelectedWork />
    </main>
  );
};

export default HomePage;
