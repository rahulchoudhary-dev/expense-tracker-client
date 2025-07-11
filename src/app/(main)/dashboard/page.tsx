"use client";

import withAuth from "@/hoc/withAuth";
import React, { useEffect } from "react";
import SummaryCards from "./_component/summaryCards";
import useGetExpenseSummary from "@/query/useGetExpenseSummary";
import useBootUser from "@/hooks/useBootUser";

const ExpenseDashBoard = () => {
  const { id } = useBootUser();

  const { mutate, data, isPending } = useGetExpenseSummary();
  useEffect(() => {
    if (id) {
      mutate({ userId: id });
    }
  }, [id]);

  return (
    <div>
      <SummaryCards data={data} isLoading={isPending} />
    </div>
  );
};

export default withAuth(ExpenseDashBoard);
