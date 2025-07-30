import { Clock } from "lucide-react";
import React from "react";

const SupportHours = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <Clock className="text-blue-600 dark:text-blue-400 mr-3" size={24} />
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
          Support Hours
        </h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4 text-blue-800 dark:text-blue-200">
        <div>
          <p>
            <strong>Email & Chat:</strong> 24/7
          </p>
          <p>
            <strong>Phone:</strong> Mon-Fri, 9 AM - 6 PM EST
          </p>
        </div>
        <div>
          <p>
            <strong>Response Time:</strong> Within 24 hours
          </p>
          <p>
            <strong>Urgent Issues:</strong> Within 4 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportHours;
