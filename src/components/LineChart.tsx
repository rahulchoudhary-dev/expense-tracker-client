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
export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
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

const CustomeLegend = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <h1>Total Expenses ( Line Chart )</h1>
    </div>
  );
};

export const LineChartComponent = () => {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer className={"max-w-8/8"}>
        <LineChart
          data={expenseData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          {/* Grid and Axis */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Legend content={<CustomeLegend />} />
          <Tooltip content={<CustomTooltip />} />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" /> {/* purple-500 */}
              <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
            </linearGradient>
          </defs>

          {/* Line with Gradient Stroke */}
          <Line
            type="linear"
            dataKey="totalExpense"
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
