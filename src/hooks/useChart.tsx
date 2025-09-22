// hooks/useChart.ts
import { useState, useEffect, useMemo } from "react";
import { ChartData, ChartOptions } from "chart.js";
import { getUserByDate } from "@/services/users";
import { getChartData, getChartOptions } from "@/utils/chart-config";
import { useTheme } from "@/context/theme-context";
import { UserData, ChartColors } from "@/types/chart";

interface ChartState {
  labels: string[];
  data: number[];
}

interface UseChartResult {
  chartData: ChartData<"line">;
  chartOptions: ChartOptions<"line">;
  colors: ChartColors; // اضافه کردن colors به رابط
  isLoading: boolean;
  error: string | null;
}

const monthMap: Record<string, string> = {
  Jan: "دی",
  Feb: "بهمن",
  Mar: "اسفند",
  Apr: "فروردین",
  May: "اردیبهشت",
  Jun: "خرداد",
  Jul: "تیر",
  Aug: "مرداد",
  Sep: "شهریور",
  Oct: "مهر",
  Nov: "آبان",
  Dec: "آذر",
};

export const useChart = (): UseChartResult => {
  const { colors } = useTheme();
  const [chartData, setChartData] = useState<ChartState>({ labels: [], data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const { data } = await getUserByDate();
      const formattedLabels = data.map((item: UserData) => monthMap[item.month] || item.month);
      setChartData({
        labels: formattedLabels,
        data: data.map((item: UserData) => item.count),
      });
    } catch (error) {
      if (error) {
        setError("خطا در بارگذاری داده‌های چارت");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.fonts.ready.then(loadUserData);
  }, []);

  const chartDataConfig = useMemo(
    () => getChartData({ labels: chartData.labels, data: chartData.data, colors }),
    [chartData, colors],
  );

  const chartOptions = useMemo(() => getChartOptions({ colors }), [colors]);

  return { chartData: chartDataConfig, chartOptions, colors, isLoading, error };
};
