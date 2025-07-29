import useBudgetQuickStates from "@/query/budget/useQuickStates";
import formatCurrency from "@/utils/formateCurrency";
import { AlertCircle, Calendar, Target } from "lucide-react";
import { memo } from "react";

const BudgetGuide = () => {
  const { data, isLoading, isError } = useBudgetQuickStates();
  return (
    <>
      <div className="lg:col-span-1 ">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 sticky top-8 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Budget Tips
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                <Target className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm transition-colors duration-300">
                  Be Realistic
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
                  Set achievable budget amounts based on your actual spending
                  patterns.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                <AlertCircle className="w-4 h-4 text-green-600 dark:text-green-400 transition-colors duration-300" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm transition-colors duration-300">
                  Set Alerts
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
                  Enable notifications to stay on track with your spending
                  goals.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400 transition-colors duration-300" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm transition-colors duration-300">
                  Review Regularly
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
                  Check your budget progress weekly to make adjustments as
                  needed.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg transition-colors duration-300">
            <h4 className="font-medium text-blue-900 dark:text-blue-200 text-sm mb-2 transition-colors duration-300">
              Quick Stats
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-300 transition-colors duration-300">
                  Active Budgets:
                </span>
                <span className="font-medium text-blue-900 dark:text-blue-100 transition-colors duration-300">
                  {data?.totalActiveBudgets}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-300 transition-colors duration-300">
                  This Month:
                </span>
                <span className="font-medium text-blue-900 dark:text-blue-100 transition-colors duration-300">
                  {formatCurrency(data?.currentMonthBudgetAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700 dark:text-blue-300 transition-colors duration-300">
                  Remaining:
                </span>
                <span className="font-medium text-green-600 dark:text-green-400 transition-colors duration-300">
                  {formatCurrency(data?.remainingAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(BudgetGuide);
