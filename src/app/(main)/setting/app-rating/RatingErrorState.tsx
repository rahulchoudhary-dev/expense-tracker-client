import React from "react";
import { AlertCircle } from "lucide-react";

interface RatingErrorStateProps {
  title?: string;
  message?: string;
}

const RatingErrorState: React.FC<RatingErrorStateProps> = ({
  title = "Unable to load rating data",
  message = "Please try refreshing the page or contact support if the problem persists.",
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
      <div className="text-center">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
};

export default RatingErrorState;
