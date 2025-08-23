"use client";
import withAuth from "@/hoc/withAuth";
import React, { useMemo, useState } from "react";

import useAnalyticsYearlyExpenses from "@/query/expense/useAnalyticsYearlyExpense";
import ChartCard from "@/components/ChartCard";
import { CURRENT_MONTH, CURRENT_YEAR } from "@/constant/dateOptions";
import useAnalyticsCategoryExpenses from "@/query/expense/useAnalyticsCategoryExpense";
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Header Section */}
        <div className="bg-white/80 dark:bg-gray-900 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/20 dark:border-gray-700/30">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div className="space-y-2">
              <SectionHeader
                title="Expense Analytics"
                subtitle="Monthly Expense Trend"
              />
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Data</span>
                <div className="w-1 h-1 bg-gray-400 rounded-full mx-2"></div>
                <span>Updated just now</span>
              </div>
            </div>

            <div className="flex justify-end">
              <AnalyticsYearlyFilter
                filterParams={yearlyExpenseParams}
                setFilterParams={setYearlyExpenseParams}
              />
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Line Chart */}
          <div className="group">
            <div className="bg-white/80 dark:bg-gray-900 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
              {/* Chart Header */}
              <div className="p-6 pb-4 border-b border-gray-100/50 dark:border-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Expense Trend
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly progression analysis
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Line Chart
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart Content */}
              <div className="p-6">
                <ChartCard>
                  {memoizedYearlyExpense.isLoading ? (
                    <div className="w-full h-[300px] flex flex-col items-center justify-center space-y-4">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-400"></div>
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Loading trend data...
                        </p>
                        <div className="flex items-center justify-center space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <YearlyExpenseLineChart data={memoizedYearlyExpense.data} />
                  )}
                </ChartCard>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="group">
            <div className="bg-white/80 dark:bg-gray-900 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
              {/* Chart Header */}
              <div className="p-6 pb-4 border-b border-gray-100/50 dark:border-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Expense Comparison
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly breakdown view
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Bar Chart
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart Content */}
              <div className="p-6">
                <ChartCard>
                  {memoizedYearlyExpense.isLoading ? (
                    <div className="w-full h-[300px] flex flex-col items-center justify-center space-y-4">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-purple-400"></div>
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Loading comparison data...
                        </p>
                        <div className="flex items-center justify-center space-x-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <YearlyExpenseBarChart data={memoizedYearlyExpense.data} />
                  )}
                </ChartCard>
              </div>
            </div>
          </div>
        </div>

        {/* Category Analysis Section */}
        <div className="bg-white/80 dark:bg-gray-900 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
          {/* Section Header */}
          <div className="p-6 md:p-8 pb-6 border-b border-gray-100/50 dark:border-gray-800/50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Category Analysis
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Expense distribution by categories
                </p>
              </div>

              <div className="flex justify-end">
                <div className="max-w-sm w-full flex">
                  <AnalyticsCategoryFilters
                    categoryExpenseParams={categoryExpenseParams}
                    setCategryExpenseParams={setCategryExpenseParams}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chart Content */}
          <div className="p-6 md:p-8">
            <div className="min-h-[450px] flex items-center justify-center">
              {memoizedCategoryExpense?.isLoading ? (
                <div className="w-full h-[400px] flex flex-col items-center justify-center space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-indigo-200 dark:border-indigo-800 rounded-full animate-spin border-t-indigo-600 dark:border-t-indigo-400"></div>
                    <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-indigo-400"></div>
                  </div>
                  <div className="text-center space-y-3">
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      Analyzing categories...
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Processing expense distribution
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              ) : memoizedCategoryExpense?.data.length >= 1 ? (
                <div className="w-full">
                  <PieChartComponent data={memoizedCategoryExpense.data} />
                </div>
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center">
                  <div className="text-center space-y-4 max-w-md">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400 dark:text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <NoDataFound
                      month={categoryExpenseParams.month}
                      year={categoryExpenseParams.year}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
