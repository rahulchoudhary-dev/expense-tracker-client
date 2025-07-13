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

const expenseData = [
  {
    month: "January",
    year: 2025,
    totalExpense: 2400,
    food: 800,
    utilities: 500,
    shopping: 1100,
  },
  {
    month: "February",
    year: 2025,
    totalExpense: 800,
    food: 700,
    utilities: 600,
    shopping: 900,
  },
  {
    month: "March",
    year: 2025,
    totalExpense: 2800,
    food: 900,
    utilities: 650,
    shopping: 1250,
  },
  {
    month: "April",
    year: 2025,
    totalExpense: 2600,
    food: 850,
    utilities: 620,
    shopping: 1130,
  },
  {
    month: "May",
    year: 2025,
    totalExpense: 3000,
    food: 950,
    utilities: 700,
    shopping: 1350,
  },
  {
    month: "June",
    year: 2025,
    totalExpense: 2500,
    food: 820,
    utilities: 580,
    shopping: 1100,
  },
  {
    month: "July",
    year: 2025,
    totalExpense: 3100,
    food: 1000,
    utilities: 720,
    shopping: 1380,
  },
  {
    month: "August",
    year: 2025,
    totalExpense: 2700,
    food: 870,
    utilities: 650,
    shopping: 1180,
  },
  {
    month: "September",
    year: 2025,
    totalExpense: 50,
    food: 910,
    utilities: 680,
    shopping: 1360,
  },
  {
    month: "October",
    year: 2025,
    totalExpense: 2650,
    food: 850,
    utilities: 620,
    shopping: 1180,
  },
  {
    month: "November",
    year: 2025,
    totalExpense: 200,
    food: 900,
    utilities: 650,
    shopping: 1250,
  },
  {
    month: "December",
    year: 2025,
    totalExpense: 3200,
    food: 1050,
    utilities: 750,
    shopping: 1400,
  },
];
const CustomeLegend = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <h1>Total Expenses ( Bar Chart )</h1>
    </div>
  );
};
export const BarChartComponent = () => {
  return (
    <div className="h-[350px] max-w-full">
      <ResponsiveContainer className={"max-w-8/8"}>
        <BarChart
          data={expenseData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis dataKey="totalExpense" />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomeLegend />} />
          <defs>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" /> {/* from-purple-500 */}
              <stop offset="100%" stopColor="#2563eb" /> {/* to-blue-600 */}
            </linearGradient>
          </defs>

          <Bar
            dataKey="totalExpense"
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
      </ResponsiveContainer>
    </div>
  );
};
