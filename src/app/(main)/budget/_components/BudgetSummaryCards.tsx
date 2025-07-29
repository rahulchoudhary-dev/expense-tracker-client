import { Button } from "@/components/ui/button";
import formatCurrency from "@/utils/formateCurrency";
import { BarChart, Calendar, DollarSign } from "lucide-react";
import { memo } from "react";
interface BudgetSummary {
  counts: {
    total: number;
    monthly: number;
    yearly: number;
  };
  sums: {
    total: number;
    monthly: number;
    yearly: number;
  };
}
interface BudgetDataSummaryCardsProps {
  budgetData: BudgetSummary;
}
const BudgetDataSummaryCards: React.FC<BudgetDataSummaryCardsProps> = ({
  budgetData,
}) => {
  return (
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
              <DollarSign size={30} className="text-blue-600 dark:text-white" />
            </Button>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
          {formatCurrency(budgetData?.sums?.total)}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-300">
          {budgetData?.counts?.total} total budgets
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
              <Calendar size={30} className="text-green-600 dark:text-white" />
            </Button>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
          {formatCurrency(budgetData?.sums?.monthly)}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-300">
          {budgetData?.counts?.monthly} Active monthly budgets
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
              <BarChart size={30} className="text-purple-600 dark:text-white" />
            </Button>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
          {formatCurrency(budgetData?.sums?.yearly)}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-300">
          {budgetData?.counts?.yearly} Active yearly budgets
        </p>
      </div>
    </div>
  );
};

export default memo(BudgetDataSummaryCards);
