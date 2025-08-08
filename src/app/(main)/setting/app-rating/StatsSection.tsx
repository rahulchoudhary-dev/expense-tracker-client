import React from "react";

const StatsSection = () => {
  return (
    <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Join thousands of satisfied users!
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              4.8
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average Rating
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              50K+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Downloads
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              98%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Satisfaction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
