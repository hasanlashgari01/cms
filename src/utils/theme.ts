import { ChartColors } from "@/types/chart";

export const getChartColors = (): ChartColors => {
  if (typeof window === "undefined") {
    return {
      titleColor: "oklch(0.21 0.03 267.87 / 1)",
      labelColor: "oklch(0.71 0.05 257.97 / 1)",
      bgColor: "oklch(0.98 0 264.54 / 1)",
    };
  }

  const root = document.documentElement;
  return {
    titleColor:
      getComputedStyle(root).getPropertyValue("--chart-title-color").trim() ||
      "oklch(0.21 0.03 267.87 / 1)",
    labelColor:
      getComputedStyle(root).getPropertyValue("--chart-label-color").trim() ||
      "oklch(0.71 0.05 257.97 / 1)",
    bgColor:
      getComputedStyle(root).getPropertyValue("--chart-bg-color").trim() ||
      "oklch(0.98 0 264.54 / 1)",
  };
};

export const observeThemeChanges = (callback: () => void): { cleanup: () => void } => {
  if (typeof window === "undefined") {
    return { cleanup: () => {} };
  }

  const updateColors = callback;
  const observer = new MutationObserver(updateColors);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", updateColors);

  return {
    cleanup: () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", updateColors);
    },
  };
};
