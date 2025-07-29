import React, { memo } from "react";

type FilterType = "all" | "monthly" | "yearly";

interface BudgetFilterTabsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const BudgetFilterTabs: React.FC<BudgetFilterTabsProps> = ({
  filter,
  setFilter,
}) => {
  const filters: FilterType[] = ["all", "monthly", "yearly"];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0 transition-colors duration-300">
        Budget Overview
      </h2>

      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 transition-colors duration-300">
        {filters.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              filter === type
                ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(BudgetFilterTabs);
