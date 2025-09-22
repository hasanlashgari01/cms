"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

const Theme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const themeLS = localStorage.getItem("theme");

    if (themeLS === null) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
    }

    if (themeLS) {
      const parsed = JSON.parse(themeLS);
      setIsDark(parsed);

      if (parsed) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleThemeHandler = () => setIsDark((prev) => !prev);

  return (
    <div
      className="flex-center *:fill-forground bg-secondary-100 dark:bg-secondary-600 size-12 cursor-pointer rounded-full *:size-6"
      onClick={toggleThemeHandler}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </div>
  );
};

export default Theme;
