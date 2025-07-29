import React, { memo } from "react";
import { Button } from "@/components/ui/button";

interface BudgetHeaderProps {
  title?: string;
  subtitle?: string;
  onAddNew: () => void;
  buttonLabel?: string;
}

const BudgetHeader: React.FC<BudgetHeaderProps> = ({
  title = "Budget Dashboard",
  subtitle = "Manage and track your financial budgets",
  onAddNew,
  buttonLabel = "+ Add New Budget",
}) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-sm md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors duration-300">
          {subtitle}
        </p>
      </div>
      <div className="text-center">
        <Button
          type="button"
          onClick={onAddNew}
          variant="outline"
          className="bg-gradient-to-r cursor-pointer from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 border-0 dark:shadow-gray-900/50"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default memo(BudgetHeader);
