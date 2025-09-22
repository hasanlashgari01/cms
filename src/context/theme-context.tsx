"use client";

import { useContext, useState, useEffect, ReactNode, createContext } from "react";
import { ChartColors } from "@/types/chart";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: ChartColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getChartColors = (): ChartColors => {
    if (typeof window === "undefined") {
      return {
        titleColor: "oklch(0.8 0.03 267.87 / 1)",
        labelColor: "oklch(0.71 0.05 257.97 / 1)",
        bgColor: "oklch(0.98 0 264.54 / 1)",
      };
    }

    const root = document.documentElement;
    const colors = {
      titleColor: getComputedStyle(root).getPropertyValue("--chart-title-color").trim(),
      labelColor:
        getComputedStyle(root).getPropertyValue("--chart-label-color").trim() ||
        "oklch(0.71 0.05 257.97 / 1)",
      bgColor:
        getComputedStyle(root).getPropertyValue("--chart-bg-color").trim() ||
        "oklch(0.98 0 264.54 / 1)",
    };
    return colors;
  };

  const [colors, setColors] = useState<ChartColors>(getChartColors());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    setColors(getChartColors());

    const updateColors = () => {
      setIsDarkMode(mediaQuery.matches);
      setColors(getChartColors());
    };

    mediaQuery.addEventListener("change", updateColors);
    return () => mediaQuery.removeEventListener("change", updateColors);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
    const newColors = getChartColors();
    setColors(newColors);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
