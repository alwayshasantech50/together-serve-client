"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      type="button"
      onClick={changeTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Switch between light and dark theme"
    >
      <SunMoon size={22} />
    </button>
  );
};

export default ThemeToggle;