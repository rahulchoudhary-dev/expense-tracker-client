import { memo } from "react";
import { COLORS, RADIAN } from "@/constant";
import { iCategoryExpensePieChartProps } from "@/interfaces/analytics";
import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts";

const renderOutsideLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  categoryName,
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
      {categoryName} {(percent * 100).toFixed(0)}%
    </text>
  );
};

function CategoryExpensePieChart({ data }: iCategoryExpensePieChartProps) {
  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex justify-center gap-4 flex-wrap">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {entry.payload.categoryName}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="dark:bg-zinc-900 dark:shadow-md rounded-xl p-6 max-w-4xl mx-auto w-full">
      <h2 className="text-lg font-bold mb-4 text-center dark:text-white">
        Expense Category Breakdown
      </h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <PieChart>
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              content={renderCustomLegend}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderOutsideLabel}
              outerRadius={100}
              dataKey="totalExpenseAmount"
              isAnimationActive={false}
            >
              {data?.map((entry, index) => (
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
