"use client";

import withAuth from "@/hoc/withAuth";
import React, { useMemo, useState } from "react";

import YearlyExpenseBarChart from "@/components/BarChart";
import PieChartComponent from "@/components/PieChart";
import useAnalyticsYearlyExpenses from "@/query/useAnalyticsYearlyExpense";
import YearlyExpenseLineChart from "@/components/LineChart";
import ChartCard from "@/components/ChartCard";

import AnalyticsYearlyFilter from "./_components/analyticsYearlyFilter";

const Analytics = () => {
  const [yearlyExpenseParams, setYearlyExpenseParams] = useState({
    year: 2025,
  });

  const {
    data: yearlyExpenseData,
    isLoading: isYearlyExpenseLoading,
    isError: isYearlyExpenseError,
  } = useAnalyticsYearlyExpenses(yearlyExpenseParams);

  const memoizedYearlyExpense = useMemo(() => {
    return {
      data: yearlyExpenseData?.data,
      isLoading: isYearlyExpenseLoading,
      isErr: isYearlyExpenseError,
    };
  }, [isYearlyExpenseLoading, yearlyExpenseData]);

  return (
    <div className="p-4 space-y-6 dark:bg-gray-900 dark:shadow:xl dark:rounded-2xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Expense Analytics{" "}
          </h1>
          <span className="text-base font-normal dark:text-gray-200">
            Monthly Expense Trend
          </span>
        </div>

        <div className="flex justify-end">
          <AnalyticsYearlyFilter
            yearlyExpenseParams={yearlyExpenseParams}
            setYearlyExpenseParams={setYearlyExpenseParams}
          />
        </div>
      </div>

      <ChartCard>
        <YearlyExpenseLineChart
          data={memoizedYearlyExpense.data}
          isLoading={memoizedYearlyExpense.isLoading}
        />
      </ChartCard>

      <ChartCard>
        <YearlyExpenseBarChart
          data={memoizedYearlyExpense.data}
          isLoading={memoizedYearlyExpense.isLoading}
        />
      </ChartCard>
      <div className="rounded-2xl shadow-md bg-white dark:bg-gray-900 p-4">
        <PieChartComponent />
      </div>
    </div>
  );
};

export default withAuth(Analytics);
