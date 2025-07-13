import React from "react";
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
import { Loader2 } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const CustomeLegend = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <h1>Total Expenses ( Yearly Expense Trend Bar Chart )</h1>
    </div>
  );
};
export const YearlyExpenseBarChart = ({
  data,
  isLoading,
}: iYearlyExpenseChartProps) => {
  return (
    <div className="h-[350px] max-w-full">
      <ResponsiveContainer className={"max-w-8/8"}>
        {isLoading ? (
          <div className="w-full">
            <LoadingSpinner />
          </div>
        ) : (
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis dataKey="totalExpenseAmount" />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomeLegend />} />
            <defs>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" /> {/* from-purple-500 */}
                <stop offset="100%" stopColor="#2563eb" /> {/* to-blue-600 */}
              </linearGradient>
            </defs>

            <Bar
              dataKey="totalExpenseAmount"
              fill="url(#expenseGradient)"
              activeBar={
                <Rectangle
                  fill="url(#expenseActiveGradient)"
                  stroke="#4f46e5" // indigo-600 stroke
                  strokeWidth={2}
                  radius={[4, 4, 4, 4]} // Optional: rounded corners
                />
              }
            />
            <defs>
              <linearGradient
                id="expenseActiveGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#7c3aed" /> {/* from-purple-600 */}
                <stop offset="100%" stopColor="#1d4ed8" /> {/* to-blue-700 */}
              </linearGradient>
            </defs>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default YearlyExpenseBarChart;
