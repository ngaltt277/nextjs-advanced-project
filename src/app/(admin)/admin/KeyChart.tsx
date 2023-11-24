"use client";
import { formatDate } from "@/utils/dateUtils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  keys: any;
};

export default function KeyChart({ keys }: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Number of Keys were created in each days",
      },
    },
  };

  const data = {
    labels: keys.map((key: any) => formatDate(key.createdDate)),
    datasets: [
      {
        label: "Num of keys",
        data: keys.map((key: any) => key._count.createdDate),
        backgroundColor: "rgb(0, 85, 255, 0.75)",
      },
    ],
  };

  return <Bar options={options} data={data} className="mt-8" />;
}
