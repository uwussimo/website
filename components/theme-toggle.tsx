"use client";
import { MoonIcon, SunIcon } from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost" onClick={handleThemeChange}>
      <HugeiconsIcon
        icon={theme === "dark" ? MoonIcon : SunIcon}
        strokeWidth={2}
        className={"size-4"}
      />
    </Button>
  );
};

export default ThemeToggle;
