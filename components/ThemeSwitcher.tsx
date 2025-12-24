"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme ?? "light" : theme;
  const isDark = currentTheme === "dark";

  function toggle() {
    if (isDark) setTheme("light");
    else setTheme("dark");
  }

  return (
    <div className="fixed bottom-6 right-4 z-50">
      <button
        id="theme-toggle"
        title="Toggle theme"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-live="polite"
        className={`p-3.5 rounded-full ${
          isDark ? "bg-amber-50 text-black" : "bg-black text-amber-50"
        }`}
        onClick={toggle}
      >
        <MoonIcon
          className={`${isDark ? "" : "hidden"}`}
          fill={isDark ? "black" : undefined}
        />
        <SunIcon className={`${isDark ? "hidden" : ""}`} />
      </button>
    </div>
  );
}
