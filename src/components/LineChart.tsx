"use client";

import { memo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { iYearlyExpenseChartProps } from "@/interfaces/analytics";

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-gray-800 text-sm text-black dark:text-white p-3 rounded shadow-md border dark:border-gray-700">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs">
            {entry.name}: <span className="font-medium">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = () => {
  return (
    <div className="w-full text-center font-medium text-gray-700 dark:text-gray-200 mb-2">
      Total Expenses ( Yearly Expense Trend Line Chart )
    </div>
  );
};

const YearlyExpenseLineChart = ({ data }: iYearlyExpenseChartProps) => {
  return (
    <div className="w-full h-[350px] rounded-xl  dark:bg-gray-900 ">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Legend content={<CustomLegend />} />
          <Tooltip content={<CustomTooltip />} />

          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          <Line
            type="monotone"
            dataKey="totalExpenseAmount"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#6366f1", strokeWidth: 2, fill: "#fff" }}
            activeDot={{
              r: 6,
              stroke: "#7c3aed",
              strokeWidth: 2,
              fill: "#fff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(YearlyExpenseLineChart);
