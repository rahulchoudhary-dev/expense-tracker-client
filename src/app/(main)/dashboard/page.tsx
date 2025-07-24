"use client";

import React, { useMemo, useState } from "react";
import withAuth from "@/hoc/withAuth";
import SummaryCards from "./_components/summaryCards";
import useGetExpenseSummary from "@/query/expense/useGetExpenseSummary";
import useGetExpenses from "@/query/expense/useGetExpenses";
import { ExpenseDataTable } from "./_components/ExpenseDataTable";
import getCurrentMonthYear from "@/utils/getCurrentMonthYear";
import ExpenseCalendar from "@/app/(main)/dashboard/_components/ExpenseFullCalender";
import { Button } from "@/components/ui/button";
import { Calendar, Table, LayoutGrid } from "lucide-react";
import { cn } from "@/utils";
import { ViewMode } from "@/constant";
import { ExpenseParams } from "./types";
import { useAppSelector } from "@/hooks/useRedux";
import ExpenseFilters from "./_components/ExpenseFilters";
const ExpenseDashBoard = () => {
  const userId = useAppSelector((state) => state.user.user?.id);

  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.TABLE);

  const { currentMonth, currentYear } = getCurrentMonthYear();

  const [pageData, setPageData] = useState<ExpenseParams>({
    page: 1,
    limit: 10,
    q: "",
    month: currentMonth,
    year: currentYear,
    categoryId: "",
    paymentMethodId: "",
  });

  const { data: summaryData, isPending: isSummaryLoading } =
    useGetExpenseSummary({ userId });

  const { data: expenseData, isLoading: isExpenseLoading } =
    useGetExpenses(pageData);

  const tableData = useMemo(() => {
    return {
      count: expenseData?.count || 0,
      data: expenseData?.resp || [],
    };
  }, [expenseData, isExpenseLoading]);

  return (
    <div>
      <SummaryCards data={summaryData} isLoading={isSummaryLoading} />

      {/* View Toggle Buttons */}
      <div className="flex items-center justify-end gap-2 mt-4 mb-4">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <Button
            variant={viewMode === ViewMode.TABLE ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode(ViewMode.TABLE)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-all text-black",
              viewMode === ViewMode.TABLE
                ? "bg-white dark:bg-gray-50 shadow-sm dark:text-black"
                : "hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
            )}
          >
            <Table className="h-4 w-4" />
            Table
          </Button>

          <Button
            variant={viewMode === ViewMode.CALENDAR ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode(ViewMode.CALENDAR)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
              viewMode === ViewMode.CALENDAR
                ? "bg-white dark:bg-gray-50 shadow-sm text-black"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            <Calendar className="h-4 w-4" />
            Calendar
          </Button>

          <Button
            variant={viewMode === ViewMode.BOTH ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode(ViewMode.BOTH)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
              viewMode === ViewMode.BOTH
                ? "bg-white dark:bg-gray-50 shadow-sm text-black"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
            Both
          </Button>
        </div>
      </div>

      <ExpenseFilters pageData={pageData} setPageData={setPageData} />

      <div>
        {/* Calendar View */}
        {(viewMode === ViewMode.CALENDAR || viewMode === ViewMode.BOTH) && (
          <div
            className={cn(
              "transition-all duration-300",
              viewMode === ViewMode.BOTH
                ? "border-b border-gray-200 dark:border-gray-700"
                : ""
            )}
          >
            <ExpenseCalendar expenseData={tableData?.data} />
          </div>
        )}

        {/* Table View */}
        {(viewMode === ViewMode.TABLE || viewMode === ViewMode.BOTH) && (
          <div className="transition-all duration-300">
            <ExpenseDataTable
              count={tableData.count}
              data={tableData.data}
              isLoading={isExpenseLoading}
              pageData={pageData}
              setPageData={setPageData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(ExpenseDashBoard);
