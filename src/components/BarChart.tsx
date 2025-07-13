"use client";

import React, { memo } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./LineChart";
import { iYearlyExpenseChartProps } from "@/interfaces/analytics";

const CustomLegend = () => (
  <div className="w-full text-center font-medium text-gray-700 dark:text-gray-200 mb-2">
    Yearly Expense Trend (Bar Chart)
  </div>
);

const YearlyExpenseBarChart = ({ data }: iYearlyExpenseChartProps) => {
  return (
    <div className="h-[350px] max-w-full">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient
              id="expenseActiveGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          {/* Axes & Grid */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />

          {/* Legend & Tooltip */}
          <Legend content={<CustomLegend />} />
          <Tooltip content={<CustomTooltip />} />

          {/* Bar */}
          <Bar
            dataKey="totalExpenseAmount"
            fill="url(#expenseGradient)"
            activeBar={
              <Rectangle
                fill="url(#expenseActiveGradient)"
                stroke="#4f46e5"
                strokeWidth={2}
                radius={[4, 4, 4, 4]}
              />
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(YearlyExpenseBarChart);
