import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-background p-5 flex justify-center items-center border-b ">
      <Link href={"/"} className={buttonVariants({ variant: "ghost" })}>
        Home
      </Link>
      <Link href={"/essays"} className={buttonVariants({ variant: "ghost" })}>
        Essays
      </Link>
      <Link href="/" className={buttonVariants({ variant: "ghost" })}>
        <span className="text-2xl font-bold">Y/A</span>
      </Link>
      <Link href={"/projects"} className={buttonVariants({ variant: "ghost" })}>
        Projects
      </Link>
      <Link href={"/about"} className={buttonVariants({ variant: "ghost" })}>
        About
      </Link>
    </div>
  );
};

export { Navbar };
