"use client";

import { useState } from "react";
import {
  PlusCircle,
  DollarSign,
  Calendar,
  Tag,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Wallet,
} from "lucide-react";

export default function BudgetAddPage() {
  const [formData, setFormData] = useState({
    budgetName: "",
    amount: "",
    category: "",
    period: "monthly",
    startDate: "",
    endDate: "",
    description: "",
    alertThreshold: "80",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Travel",
    "Education",
    "Groceries",
    "Other",
  ];

  const periods = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" },
    { value: "custom", label: "Custom Period" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.budgetName.trim()) {
      newErrors.budgetName = "Budget name is required";
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (formData.period === "custom" && !formData.endDate) {
      newErrors.endDate = "End date is required for custom period";
    }

    if (
      formData.endDate &&
      formData.startDate &&
      new Date(formData.endDate) <= new Date(formData.startDate)
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          budgetName: "",
          amount: "",
          category: "",
          period: "monthly",
          startDate: "",
          endDate: "",
          description: "",
          alertThreshold: "80",
        });
      }, 2000);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Budget Created!
          </h2>
          <p className="text-gray-600 mb-6">
            Your budget has been successfully created and is now active.
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Create Another Budget
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Create New Budget
                </h1>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
              <span>Step 1 of 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Budget Details
                </h2>
                <p className="text-gray-600">
                  Set up your budget to track and manage your expenses
                  effectively.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Budget Name */}
                <div>
                  <label
                    htmlFor="budgetName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Budget Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="budgetName"
                      name="budgetName"
                      value={formData.budgetName}
                      onChange={handleInputChange}
                      placeholder="e.g., Monthly Groceries, Vacation Fund"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.budgetName
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                    />
                    <Tag className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.budgetName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.budgetName}
                    </p>
                  )}
                </div>

                {/* Amount and Category Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Budget Amount */}
                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Budget Amount *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.amount
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                      />
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.amount}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.category
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>

                {/* Period */}
                <div>
                  <label
                    htmlFor="period"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Budget Period
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {periods.map((period) => (
                      <label
                        key={period.value}
                        className={`relative flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.period === period.value
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="period"
                          value={period.value}
                          checked={formData.period === period.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">
                          {period.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Start Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.startDate
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                      />
                      <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.startDate && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.startDate}
                      </p>
                    )}
                  </div>

                  {/* End Date */}
                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      End Date {formData.period === "custom" && "*"}
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        disabled={formData.period !== "custom"}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          formData.period !== "custom"
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : errors.endDate
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                      />
                      <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.endDate && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.endDate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Alert Threshold */}
                <div>
                  <label
                    htmlFor="alertThreshold"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Alert Threshold ({formData.alertThreshold}%)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      id="alertThreshold"
                      name="alertThreshold"
                      value={formData.alertThreshold}
                      onChange={handleInputChange}
                      min="50"
                      max="95"
                      step="5"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>50%</span>
                      <span>95%</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Get notified when you've spent {formData.alertThreshold}% of
                    your budget
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Add any notes or details about this budget..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white transition-colors ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Budget...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Create Budget
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
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
                      Set achievable budget amounts based on your actual
                      spending patterns.
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
        </div>
      </div>
    </div>
  );
}
