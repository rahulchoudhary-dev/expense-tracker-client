"use client";

import { Button } from "@/components/ui/button";
import { monthNames } from "@/constant/dateOptions";
import useGetBudgets from "@/query/budget/useGetBudgets";
import React, { useState } from "react";
import CreateBudget from "./CreateBudget";

type BudgetListProps = {
  setIsCreateBudget: React.Dispatch<React.SetStateAction<boolean>>;
};

const BudgetList: React.FC<BudgetListProps> = ({ setIsCreateBudget }) => {
  const [filter, setFilter] = useState<any>("all");
  const { data: budgetData, isLoading } = useGetBudgets(filter);
  console.log(filter);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getMonthName = (month: number | null) => {
    return month ? monthNames[month - 1] : "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-sm md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
              Budget Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Manage and track your financial budgets
            </p>
          </div>
          <div className="text-center">
            <Button
              type="button"
              onClick={() => setIsCreateBudget(true)}
              variant={"outline"}
              className="bg-gradient-to-r cursor-pointer from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              + Add New Budget
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Total Budget
              </h3>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(budgetData?.summary?.sums?.total)}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              {budgetData?.summary?.counts?.total} total budgets
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Monthly Budgets
              </h3>
              <div className="p-3 bg-green-100 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(budgetData?.summary?.sums?.monthly)}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              {budgetData?.summary?.counts?.monthly} Active monthly budgets
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Yearly Budgets
              </h3>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(budgetData?.summary?.sums?.yearly)}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              {" "}
              {budgetData?.summary?.counts?.yearly} Active yearly budgets
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              Budget Overview
            </h2>
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filter === "all"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("monthly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filter === "monthly"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setFilter("yearly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filter === "yearly"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Budget Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgetData?.budgets?.length &&
              budgetData?.budgets?.map((budget: Budget) => (
                <div
                  key={budget.id}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        budget.type === "monthly"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {budget.type}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {budget.type === "monthly" && budget.month
                          ? `${getMonthName(budget.month)} ${budget.year}`
                          : budget.year}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                    {budget.title}
                  </h3>

                  <div className="mb-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(budget.amount)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Created</span>
                    <span>
                      {new Date(budget.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                        Edit
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetList;
