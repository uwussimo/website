"use client";
import { MoonIcon, SunIcon } from "@hugeicons/core-free-icons";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Label } from "./ui/label";
import { Fragment } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Fragment>
      <Switch
        id="theme-toggle"
        checked={theme === "dark"}
        onCheckedChange={handleThemeChange}
        size="sm"
        className="hidden"
      />
      <Label htmlFor="theme-toggle">
        <HugeiconsIcon
          icon={theme === "dark" ? MoonIcon : SunIcon}
          strokeWidth={2}
          className={"size-4"}
        />
      </Label>
    </Fragment>
  );
};

export default ThemeToggle;
