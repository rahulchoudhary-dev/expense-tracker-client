"use client";

import { Button } from "@/components/ui/button";
import { monthNames } from "@/constant/dateOptions";
import useGetBudgets from "@/query/budget/useGetBudgets";
import React, { useState } from "react";
import useDeleteBudget from "@/query/budget/useDeleteBudget";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import { TOAST_MESSAGES } from "@/constant";
import formatCurrency from "@/utils/formateCurrency";
import BudgetHeader from "./BudgetListHeader";
import BudgetDataSummaryCards from "./BudgetSummaryCards";
import BudgetFilterTabs from "./BudgetFilterTabs";
import {
  Calendar,
  DollarSign,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

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
        <BudgetHeader onAddNew={handleAddNewBudget} />
        {/* Summary Cards */}
        <BudgetDataSummaryCards budgetData={budgetData?.summary} />
        {/* Filter Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 mb-8 border border-gray-100 dark:border-gray-700 transition-all duration-300">
          <BudgetFilterTabs filter={filter} setFilter={setFilter} />

          {/* Enhanced Budget Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgetData?.budgets?.length &&
              budgetData?.budgets?.map((budget: any, index: number) => {
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

                const getStatusIcon = (percentage: number) => {
                  if (percentage >= 90)
                    return <TrendingDown className="w-4 h-4 text-red-500" />;
                  if (percentage >= 75)
                    return <Target className="w-4 h-4 text-yellow-500" />;
                  return <TrendingUp className="w-4 h-4 text-green-500" />;
                };

                return (
                  <div
                    key={budget.id}
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-600"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                            budget.type === "monthly"
                              ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                              : "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300"
                          }`}
                        >
                          {budget.type}
                        </div>
                        {getStatusIcon(utilizationPercentage)}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {budget.type === "monthly" && budget.month
                              ? `${getMonthName(budget.month)} ${budget.year}`
                              : budget.year}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 truncate transition-colors duration-300">
                      {budget.title}
                    </h3>

                    {/* Enhanced Budget Amount and Usage */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            {formatCurrency(budget.amount)}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            {utilizationPercentage.toFixed(1)}%
                          </span>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            utilized
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Progress Bar */}
                      <div
                        className={`w-full ${getProgressBgColor(
                          utilizationPercentage
                        )} rounded-full h-3 mb-3 transition-colors duration-300 overflow-hidden`}
                      >
                        <div
                          className={`${getProgressColor(
                            utilizationPercentage
                          )} h-3 rounded-full transition-all duration-1000 ease-out relative`}
                          style={{
                            width: `${Math.min(utilizationPercentage, 100)}%`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>

                      {/* Enhanced Used and Remaining Amounts */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                          <p className="text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300 text-xs">
                            Used
                          </p>
                          <p className="font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                            {formatCurrency(usedAmount)}
                          </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                          <p className="text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-300 text-xs">
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
