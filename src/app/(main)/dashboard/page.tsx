"use client";

import withAuth from "@/hoc/withAuth";
import React, { useEffect, useMemo, useState } from "react";
import SummaryCards from "./_components/summaryCards";
import useGetExpenseSummary from "@/query/useGetExpenseSummary";
import useBootUser from "@/hooks/useBootUser";
import useGetExpenses from "@/query/useGetExpenses";
import { ExpenseDataTable } from "./_components/ExpenseDataTable";
import getCurrentMonthYear from "@/utils/getCurrentMonthYear";
import { iExpenseParams } from "@/interfaces/expense";
import ExpenseCardList from "./_components/ExpenseCardList";
import { useIsMobile } from "@/hooks/use-mobile";
const ExpenseDashBoard = () => {
  const isMobile = useIsMobile();
  const { id } = useBootUser();

  const { currentMonth, currentYear } = getCurrentMonthYear();

  const [pageData, setPageData] = useState<iExpenseParams>({
    page: 0,
    limit: 10,
    q: "",
    month: currentMonth,
    year: currentYear,
    categoryId: "",
    paymentMethodId: "",
  });

  const { data: summaryData, isPending: isSummaryLoading } =
    useGetExpenseSummary({ userId: id });

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
      <div className="overflow-auto bg-gray border-[1px] shadow-gray-300 shadow-sm p-4 mt-4 rounded-3xl dark:bg-gray-900 ">
        {/* {isMobile ? (
          <ExpenseCardList data={tableData.data} />
        ) : ( */}
        <ExpenseDataTable
          count={tableData.count}
          data={tableData.data}
          isLoading={isExpenseLoading}
          pageData={pageData}
          setPageData={setPageData}
        />
        {/* )} */}
      </div>
    </div>
  );
};

export default withAuth(ExpenseDashBoard);
