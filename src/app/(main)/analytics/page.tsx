"use client";

import withAuth from "@/hoc/withAuth";
import React from "react";
import useBootUser from "@/hooks/useBootUser";

import { LineChartComponent } from "@/components/LineChart";
import { BarChartComponent } from "@/components/BarChart";
import PieChartComponent from "@/components/PieChart";

const Analytics = () => {
  const { id } = useBootUser();

  return (
    <div className="p-4 space-y-6 dark:bg-gray-900 dark:shadow:xl dark:rounded-2xl">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Expense Analytics{" "}
      </h1>
      <h2 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">
        Monthly Expense Trend
      </h2>

      <div className="rounded-2xl shadow-md bg-white dark:bg-gray-900 p-4">
        <LineChartComponent />
      </div>

      <div className="rounded-2xl shadow-md bg-white dark:bg-gray-900 p-4">
        <BarChartComponent />
      </div>
      <div className="rounded-2xl shadow-md bg-white dark:bg-gray-900 p-4">
        <PieChartComponent />
      </div>
    </div>
  );
};

export default withAuth(Analytics);
