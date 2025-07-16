"use client";

import withAuth from "@/hoc/withAuth";
import React, { useMemo, useState } from "react";

import useAnalyticsYearlyExpenses from "@/query/useAnalyticsYearlyExpense";
import ChartCard from "@/components/ChartCard";
import { CURRENT_MONTH, CURRENT_YEAR } from "@/constant/dateOptions";
import useAnalyticsCategoryExpenses from "@/query/useAnalyticsCategoryExpense";
import SectionHeader from "./_components/analyticsSectionHeader";
import NoDataFound from "./_components/noDataFound";
import LoadingSpinner from "@/components/LoadingSpinner";
import dynamic from "next/dynamic";

const AnalyticsYearlyFilter = dynamic(
  () => import("./_components/analyticsYearlyFilter"),
  { ssr: false }
);
const AnalyticsCategoryFilters = dynamic(
  () => import("./_components/analyticsCatgoryExpense"),
  { ssr: false }
);
const YearlyExpenseBarChart = dynamic(() => import("@/components/BarChart"), {
  ssr: true,
});

const YearlyExpenseLineChart = dynamic(() => import("@/components/LineChart"), {
  ssr: true,
});

const PieChartComponent = dynamic(() => import("@/components/PieChart"), {
  ssr: true,
});
const Analytics = () => {
  const initialYear = Number(CURRENT_YEAR);
  const initialMonth = Number(CURRENT_MONTH);

  const [yearlyExpenseParams, setYearlyExpenseParams] = useState({
    year: initialYear,
  });
  const [categoryExpenseParams, setCategryExpenseParams] = useState({
    month: initialMonth,
    year: initialYear,
  });
  const {
    data: yearlyExpenseData,
    isLoading: isYearlyExpenseLoading,
    isError: isYearlyExpenseError,
  } = useAnalyticsYearlyExpenses(yearlyExpenseParams);

  const {
    data: categoryExpenseData,
    isLoading: isCategoryExpenseLoading,
    isError: isCategoryExpenseError,
    isFetching,
  } = useAnalyticsCategoryExpenses(categoryExpenseParams);

  const memoizedCategoryExpense = useMemo(() => {
    return {
      data: categoryExpenseData?.data?.resp || [],
      isLoading: isCategoryExpenseLoading,
      isError: isCategoryExpenseError,
      isFetching,
    };
  }, [categoryExpenseData, isCategoryExpenseLoading, isCategoryExpenseError]);

  const memoizedYearlyExpense = useMemo(() => {
    return {
      data: yearlyExpenseData?.data,
      isLoading: isYearlyExpenseLoading,
      isErr: isYearlyExpenseError,
    };
  }, [isYearlyExpenseLoading, yearlyExpenseData]);

  return (
    <div className="p-0 md:p-4 space-y-6 dark:bg-gray-900 dark:shadow:xl dark:rounded-2xl">
      <div className="flex justify-between items-center">
        <SectionHeader
          title="Expense Analytics"
          subtitle="Monthly Expense Trend"
        />

        <div className="flex justify-end">
          <AnalyticsYearlyFilter
            filterParams={yearlyExpenseParams}
            setFilterParams={setYearlyExpenseParams}
          />
        </div>
      </div>

      <ChartCard>
        {memoizedYearlyExpense.isLoading ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <YearlyExpenseLineChart data={memoizedYearlyExpense.data} />
        )}
      </ChartCard>

      <ChartCard>
        {memoizedYearlyExpense.isLoading ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <YearlyExpenseBarChart data={memoizedYearlyExpense.data} />
        )}
      </ChartCard>

      <div className="rounded-2xl h-[550px]  shadow-md bg-white dark:bg-gray-900 p-4">
        <div className="w-full flex justify-end items-center">
          <div className="max-w-sm w-full flex">
            <AnalyticsCategoryFilters
              categoryExpenseParams={categoryExpenseParams}
              setCategryExpenseParams={setCategryExpenseParams}
            />
          </div>
        </div>
        {memoizedCategoryExpense?.isLoading ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : memoizedCategoryExpense?.data.length >= 1 ? (
          <PieChartComponent data={memoizedCategoryExpense.data} />
        ) : (
          <NoDataFound
            month={categoryExpenseParams.month}
            year={categoryExpenseParams.year}
          />
        )}
      </div>
    </div>
  );
};

export default withAuth(Analytics);
