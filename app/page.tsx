import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected";
import { Writing } from "@/components/home/writing";

const HomePage = () => {
  return (
    <main className="flex flex-col gap-12">
      <Hero />
      <SelectedWork />
      <Writing />
    </main>
  );
};

export default HomePage;
