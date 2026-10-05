"use client";
import { MoonIcon, SunIcon } from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // both icons render and css picks one, so the server and client markup match
  return (
    <Button
      variant="ghost"
      onClick={handleThemeChange}
      aria-label="Toggle theme"
    >
      <HugeiconsIcon
        icon={SunIcon}
        strokeWidth={2}
        className="size-4 dark:hidden"
      />
      <HugeiconsIcon
        icon={MoonIcon}
        strokeWidth={2}
        className="hidden size-4 dark:block"
      />
    </Button>
  );
};

export default ThemeToggle;
