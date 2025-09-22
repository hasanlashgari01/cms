// utils/chart-config.ts
import { ChartData, ChartOptions, InteractionMode } from "chart.js";
import { ChartColors } from "@/types/chart";

interface ChartConfigProps {
  labels: string[];
  data: number[];
  colors: ChartColors;
}

export const getChartData = ({ labels, data, colors }: ChartConfigProps): ChartData<"line"> => ({
  labels,
  datasets: [
    {
      label: "تعداد ثبت نام",
      data,
      borderColor: "rgba(34, 197, 94, 1)",
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(34, 197, 94, 0.4)");
        gradient.addColorStop(1, "rgba(34, 197, 94, 0)");
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "rgba(34, 197, 94, 1)",
      pointBorderColor: colors.bgColor,
      pointHoverBackgroundColor: colors.bgColor,
      pointHoverBorderColor: "rgba(34, 197, 94, 1)",
      pointRadius: 5,
      pointHoverRadius: 8,
    },
  ],
});

export const getChartOptions = ({ colors }: { colors: ChartColors }): ChartOptions<"line"> => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1000,
    easing: "easeOutQuart",
    delay: (context) => context.dataIndex * 100,
  },
  interaction: {
    mode: "nearest" as InteractionMode,
    intersect: false,
  },
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: {
        font: {
          family: "Vazirmatn, sans-serif",
          size: 14,
          weight: "bold",
        },
        color: colors.labelColor,
        padding: 20,
      },
    },
    title: {
      display: true,
      text: "آمار کاربران در طول ماه‌ها",
      font: {
        family: "Vazirmatn, sans-serif",
        size: 18,
        weight: "bold",
      },
      color: colors.titleColor,
      padding: {
        top: 10,
        bottom: 20,
      },
    },
    tooltip: {
      bodyFont: {
        family: "Vazirmatn, sans-serif",
        size: 12,
      },
      titleFont: {
        family: "Vazirmatn, sans-serif",
        size: 14,
        weight: "bold",
      },
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      cornerRadius: 8,
      padding: 12,
      rtl: true,
      callbacks: {
        label: (context) => `تعداد: ${context.parsed.y} کاربر`,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          family: "Vazirmatn, sans-serif",
          size: 12,
        },
        color: colors.labelColor,
        maxRotation: 0,
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        font: {
          family: "Vazirmatn, sans-serif",
          size: 12,
        },
        color: colors.labelColor,
        stepSize: 10,
      },
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
      },
    },
  },
});