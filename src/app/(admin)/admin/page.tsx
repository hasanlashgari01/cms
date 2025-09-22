"use client";

import ErrorMessage from "@/app/_components/error/error-message";
import Loading from "@/app/_components/loading/loading";
import { Welcome } from "@/app/_components/welcome/welcome";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useChart } from "@/hooks/useChart";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import LatestCommentList from "./_/components/latest-comment/latest-comment-list";
import LatestProductList from "./_/components/latest-product/latest-product-list";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdminPage() {
  const { user } = useAuthentication();
  const { chartData, chartOptions, isLoading, error } = useChart();

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="خطا در بارگذاری داده‌های چارت" />;

  return (
    <>
      <Welcome name={user?.full_name || user?.email?.split("@")[0]} />
      <div className="box chart-container h-[400px] rounded-2xl p-6">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:gap-8">
        <LatestProductList />
        <LatestCommentList />
      </div>
    </>
  );
}
