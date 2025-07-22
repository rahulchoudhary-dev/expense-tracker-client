"use client";

import React, { useMemo, useState } from "react";
import withAuth from "@/hoc/withAuth";
import SummaryCards from "./_components/summaryCards";
import useGetExpenseSummary from "@/query/useGetExpenseSummary";
import useGetExpenses from "@/query/useGetExpenses";
import { ExpenseDataTable } from "./_components/ExpenseDataTable";
import getCurrentMonthYear from "@/utils/getCurrentMonthYear";
import { iExpenseParams } from "@/interfaces/expense";
import useBootUser from "@/hooks/useBootUser";
import ExpenseCalendar from "@/app/(main)/dashboard/_components/ExpenseFullCalender";
import { Button } from "@/components/ui/button";
import { Calendar, Table, LayoutGrid } from "lucide-react";
import { cn } from "@/utils";
const ExpenseDashBoard = () => {
  const { userId } = useBootUser();

  // View state: 'table', 'calendar', or 'both'
  const [viewMode, setViewMode] = useState<"table" | "calendar" | "both">(
    "table"
  );

  const { currentMonth, currentYear } = getCurrentMonthYear();

  const [pageData, setPageData] = useState<iExpenseParams>({
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
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-all text-black",
              viewMode === "table"
                ? "bg-white dark:bg-gray-50 shadow-sm dark:text-black"
                : "hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
            )}
          >
            <Table className="h-4 w-4" />
            Table
          </Button>

          <Button
            variant={viewMode === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("calendar")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
              viewMode === "calendar"
                ? "bg-white dark:bg-gray-50 shadow-sm text-black"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            <Calendar className="h-4 w-4" />
            Calendar
          </Button>

          <Button
            variant={viewMode === "both" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("both")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
              viewMode === "both"
                ? "bg-white dark:bg-gray-50 shadow-sm text-black"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
            Both
          </Button>
        </div>
      </div>

      <div className="overflow-auto bg-gray border-[1px] shadow-gray-300 shadow-sm rounded-3xl dark:bg-gray-900">
        {/* Calendar View */}
        {(viewMode === "calendar" || viewMode === "both") && (
          <div
            className={cn(
              "transition-all duration-300",
              viewMode === "both"
                ? "border-b border-gray-200 dark:border-gray-700"
                : ""
            )}
          >
            <ExpenseCalendar expenseData={tableData?.data} />
          </div>
        )}

        {/* Table View */}
        {(viewMode === "table" || viewMode === "both") && (
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
