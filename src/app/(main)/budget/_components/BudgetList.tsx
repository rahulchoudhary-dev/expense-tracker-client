"use client";

import { Button } from "@/components/ui/button";
import { monthNames } from "@/constant/dateOptions";
import useGetBudgets from "@/query/budget/useGetBudgets";
import React, { useState } from "react";
import useDeleteBudget from "@/query/budget/useDeleteBudget";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import { TOAST_MESSAGES } from "@/constant";
import { BarChart, Calendar, DollarSign } from "lucide-react";
import formatCurrency from "@/utils/formateCurrency";

type BudgetListProps = {
  setIsCreateBudget: React.Dispatch<React.SetStateAction<boolean>>;
  setEditBudgetData: React.Dispatch<React.SetStateAction<any>>;
};

const BudgetList: React.FC<BudgetListProps> = ({
  setIsCreateBudget,
  setEditBudgetData,
}) => {
  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();
  const [filter, setFilter] = useState<any>("all");
  const { data: budgetData, isLoading, refetch } = useGetBudgets(filter);
  const { mutate: deleteBudgetMutation } = useDeleteBudget();

  const handleDeleteBudget = (id: number) => {
    deleteBudgetMutation(id, {
      onSuccess: () => {
        showSuccessToast("Budget Deleted Successfully");
        refetch();
      },
      onError: (error) => {
        showErrorToast(error.message || TOAST_MESSAGES.ERROR_GENERIC);
      },
    });
  };

  const getMonthName = (month: number | null) => {
    return month ? monthNames[month - 1] : "";
  };
  const handleEditBudget = (item: any) => {
    setEditBudgetData(item);
    setIsCreateBudget(true);
  };
  const handleAddNewBudget = () => {
    setEditBudgetData(null);
    setIsCreateBudget(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-2 lg:p-0 transition-colors duration-300">
      <div className="">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-sm md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
              Budget Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors duration-300">
              Manage and track your financial budgets
            </p>
          </div>
          <div className="text-center">
            <Button
              type="button"
              onClick={() => handleAddNewBudget()}
              variant={"outline"}
              className="bg-gradient-to-r cursor-pointer from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 border-0 dark:shadow-gray-900/50"
            >
              + Add New Budget
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Total Budget
              </h3>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full transition-colors duration-300">
                <Button
                  variant="outline"
                  size="icon"
                  className="relative hover:shadow-lg border-0 cursor-pointer h-6 w-6 rounded-full transform group-hover/icon:scale-110 transition-all duration-300 hover:rotate-12 bg-transparent dark:bg-transparent"
                >
                  <DollarSign
                    size={30}
                    className="text-blue-600 dark:text-white"
                  />
                </Button>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              {formatCurrency(budgetData?.summary?.sums?.total)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-300">
              {budgetData?.summary?.counts?.total} total budgets
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Monthly Budgets
              </h3>
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full transition-colors duration-300">
                <Button
                  variant="outline"
                  size="icon"
                  className="relative hover:shadow-lg border-0 cursor-pointer h-6 w-6 rounded-full transform group-hover/icon:scale-110 transition-all duration-300 hover:rotate-12 bg-transparent dark:bg-transparent"
                >
                  <Calendar
                    size={30}
                    className="text-green-600 dark:text-white"
                  />
                </Button>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              {formatCurrency(budgetData?.summary?.sums?.monthly)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-300">
              {budgetData?.summary?.counts?.monthly} Active monthly budgets
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Yearly Budgets
              </h3>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full transition-colors duration-300">
                <Button
                  variant="outline"
                  size="icon"
                  className="relative hover:shadow-lg border-0 cursor-pointer h-6 w-6 rounded-full transform group-hover/icon:scale-110 transition-all duration-300 hover:rotate-12 bg-transparent dark:bg-transparent"
                >
                  <BarChart
                    size={30}
                    className="text-purple-600 dark:text-white"
                  />
                </Button>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              {formatCurrency(budgetData?.summary?.sums?.yearly)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-300">
              {budgetData?.summary?.counts?.yearly} Active yearly budgets
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 mb-8 border border-gray-100 dark:border-gray-700 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0 transition-colors duration-300">
              Budget Overview
            </h2>
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 transition-colors duration-300">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  filter === "all"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("monthly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  filter === "monthly"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setFilter("yearly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  filter === "yearly"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Budget Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgetData?.budgets?.length &&
              budgetData?.budgets?.map((budget: any) => {
                // Calculate budget utilization
                const usedAmount = budget.usedAmount || 0;
                const totalAmount = budget.amount || 0;
                const remainingAmount = totalAmount - usedAmount;
                const utilizationPercentage =
                  totalAmount > 0 ? (usedAmount / totalAmount) * 100 : 0;

                // Determine progress bar color based on utilization
                const getProgressColor = (percentage: number) => {
                  if (percentage >= 90) return "bg-red-500 dark:bg-red-600";
                  if (percentage >= 75)
                    return "bg-yellow-500 dark:bg-yellow-600";
                  if (percentage >= 50) return "bg-blue-500 dark:bg-blue-600";
                  return "bg-green-500 dark:bg-green-600";
                };

                const getProgressBgColor = (percentage: number) => {
                  if (percentage >= 90) return "bg-red-100 dark:bg-red-900/30";
                  if (percentage >= 75)
                    return "bg-yellow-100 dark:bg-yellow-900/30";
                  if (percentage >= 50)
                    return "bg-blue-100 dark:bg-blue-900/30";
                  return "bg-green-100 dark:bg-green-900/30";
                };

                return (
                  <div
                    key={budget.id}
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg dark:hover:shadow-gray-900/70 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                          budget.type === "monthly"
                            ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                            : "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300"
                        }`}
                      >
                        {budget.type}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                          {budget.type === "monthly" && budget.month
                            ? `${getMonthName(budget.month)} ${budget.year}`
                            : budget.year}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 truncate transition-colors duration-300">
                      {budget.title}
                    </h3>

                    {/* Budget Amount and Usage */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                          {formatCurrency(budget.amount)}
                        </p>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">
                          {utilizationPercentage.toFixed(1)}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div
                        className={`w-full ${getProgressBgColor(
                          utilizationPercentage
                        )} rounded-full h-2.5 mb-3 transition-colors duration-300`}
                      >
                        <div
                          className={`${getProgressColor(
                            utilizationPercentage
                          )} h-2.5 rounded-full transition-all duration-500 ease-out`}
                          style={{
                            width: `${Math.min(utilizationPercentage, 100)}%`,
                          }}
                        ></div>
                      </div>

                      {/* Used and Remaining Amounts */}
                      <div className="flex justify-between text-sm">
                        <div className="text-center">
                          <p className="text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">
                            Used
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                            {formatCurrency(usedAmount)}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300">
                            Remaining
                          </p>
                          <p
                            className={`font-semibold transition-colors duration-300 ${
                              remainingAmount >= 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {formatCurrency(remainingAmount)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-300">
                      <span>Created</span>
                      <span>
                        {new Date(budget.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleEditBudget(budget)}
                          variant={"outline"}
                          className="bg-gradient-to-r w-1/2 cursor-pointer from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl dark:shadow-gray-900/50 transition-all duration-200 border-0"
                        >
                          Edit
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDeleteBudget(budget.id)}
                          className="flex-1 cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 border-0"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetList;
