import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/toggle";
import Link from "next/link";

const links = [
  { name: "Work", href: "/" },
  { name: "About", href: "/about" },
  { name: "Resume", href: "/resume" },
];

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-5 md:px-12 m-5 rounded-full sticky bg-primary/10 filter backdrop-blur-2xl">
      <Link href={"/"} className="text-xl font-bold">
        usufdev.com
      </Link>
      <div className="hidden gap-5 text-sm md:flex">
        {links.map((link) => (
          <Button variant={"link"} key={link.name} asChild>
            <Link href={link.href}>{link.name}</Link>
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Toggle />
        <Button>Login</Button>
      </div>
    </div>
  );
};

export { Navbar };
