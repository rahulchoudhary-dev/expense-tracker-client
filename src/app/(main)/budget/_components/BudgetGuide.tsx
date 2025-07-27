import { AlertCircle, Calendar, Target } from "lucide-react";
import BudgetHelpBox from "./BudgetHelpBox";

const BudgetGuide = () => {
  return (
    <>
      <div className="my-6 text-center">
        <BudgetHelpBox
          linkUrl="/budget-guide"
          linkText="detailed budgeting tutorial"
          message="Need help getting started? Check out our"
        />
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Budget Tips
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  Be Realistic
                </h4>
                <p className="text-gray-600 text-sm">
                  Set achievable budget amounts based on your actual spending
                  patterns.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  Set Alerts
                </h4>
                <p className="text-gray-600 text-sm">
                  Enable notifications to stay on track with your spending
                  goals.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  Review Regularly
                </h4>
                <p className="text-gray-600 text-sm">
                  Check your budget progress weekly to make adjustments as
                  needed.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 text-sm mb-2">
              Quick Stats
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Active Budgets:</span>
                <span className="font-medium text-blue-900">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">This Month:</span>
                <span className="font-medium text-blue-900">$2,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Remaining:</span>
                <span className="font-medium text-green-600">$550</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetGuide;
