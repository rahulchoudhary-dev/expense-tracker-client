import { memo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Food", value: 1200 },
  { name: "Transportation", value: 900 },
  { name: "Entertainment", value: 600 },
  { name: "Shopping", value: 1100 },
  { name: "Utilities", value: 700 },
  { name: "Healthcare", value: 400 },
  { name: "Other", value: 300 },
];

const COLORS = [
  "#a5b4fc",
  "#6ee7b7",
  "#fde68a",
  "#fca5a5",
  "#c4b5fd",
  "#fdba74",
  "#fcd34d",
];

const RADIAN = Math.PI / 180;

const renderOutsideLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
}: any) => {
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#4b5563"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      className="font-semibold"
    >
      {name} {(percent * 100).toFixed(0)}%
    </text>
  );
};

function CategoryExpensePieChart() {
  return (
    <div className="dark:bg-zinc-900 dark:shadow-md rounded-xl p-6 max-w-4xl mx-auto w-full">
      <h2 className="text-lg font-bold mb-4 text-center dark:text-white">
        Expense Category Breakdown
      </h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <PieChart>
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderOutsideLabel}
              outerRadius={100}
              dataKey="value"
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default memo(CategoryExpensePieChart);
