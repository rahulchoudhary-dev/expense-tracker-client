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
const ExpenseDashBoard = () => {
  const { userId } = useBootUser();

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
      <div className="overflow-auto bg-gray border-[1px] shadow-gray-300 shadow-sm mt-4 rounded-3xl dark:bg-gray-900 ">
        <ExpenseDataTable
          count={tableData.count}
          data={tableData.data}
          isLoading={isExpenseLoading}
          pageData={pageData}
          setPageData={setPageData}
        />
      </div>
    </div>
  );
};

export default withAuth(ExpenseDashBoard);
