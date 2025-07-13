import { Ban } from "lucide-react";
import { memo } from "react";

const NoDataFound = ({ month, year }: { month: number; year: number }) => {
  return (
    <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4 text-center">
      <Ban className="w-16 h-16 text-gray-400 dark:text-gray-600" />
      <div>
        <p className="text-xl font-semibold text-gray-600 dark:text-gray-200">
          No data found for {month}/{year}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Try selecting a different month or year to view your expense
          analytics.
        </p>
      </div>
    </div>
  );
};

export default memo(NoDataFound);
