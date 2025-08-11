"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Calendar,
  DollarSign,
  User,
  Percent,
  Calculator,
  Bell,
  Plus,
  Edit3,
  Trash2,
  Sun,
  Moon,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  TrendingUp,
} from "lucide-react";

// Define interfaces for better type safety
interface Transaction {
  id: number;
  type: "lend" | "borrow";
  partyName: string;
  amount: number;
  interestRate: number;
  interestType: "simple" | "compound";
  lendDate: string;
  repaymentDate: string;
  description: string;
  reminderDays: string;
  repayableAmount: number;
  status: "active" | "completed";
  createdAt: string;
}

interface FormData {
  type: "lend" | "borrow";
  partyName: string;
  amount: string;
  interestRate: string;
  interestType: "simple" | "compound";
  lendDate: string;
  repaymentDate: string;
  description: string;
  reminderDays: string;
}

const LendBorrowPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"lend" | "borrow">("lend");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [formData, setFormData] = useState<FormData>({
    type: "lend",
    partyName: "",
    amount: "",
    interestRate: "",
    interestType: "simple",
    lendDate: "",
    repaymentDate: "",
    description: "",
    reminderDays: "7",
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Calculate repayable amount
  const calculateRepayableAmount = (
    principal: number,
    rate: number,
    startDate: string,
    endDate: string,
    type: "simple" | "compound"
  ): number => {
    if (!principal || !rate || !startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const years = timeDiff / (1000 * 3600 * 24 * 365);

    if (type === "simple") {
      return principal * (1 + (rate / 100) * years);
    } else {
      return principal * Math.pow(1 + rate / 100, years);
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const repayableAmount = calculateRepayableAmount(
      parseFloat(formData.amount),
      parseFloat(formData.interestRate),
      formData.lendDate,
      formData.repaymentDate,
      formData.interestType
    );

    const newTransaction: Transaction = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
      interestRate: parseFloat(formData.interestRate),
      repayableAmount: repayableAmount,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    setTransactions([...transactions, newTransaction]);
    setFormData({
      type: "lend",
      partyName: "",
      amount: "",
      interestRate: "",
      interestType: "simple",
      lendDate: "",
      repaymentDate: "",
      description: "",
      reminderDays: "7",
    });
    setShowForm(false);
  };

  // Handle input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter transactions by type
  const filteredTransactions = transactions.filter((t) => t.type === activeTab);

  // Calculate totals
  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === "lend") {
        acc.totalLent += t.amount;
        acc.expectedReturn += t.repayableAmount;
      } else {
        acc.totalBorrowed += t.amount;
        acc.totalOwed += t.repayableAmount;
      }
      return acc;
    },
    { totalLent: 0, expectedReturn: 0, totalBorrowed: 0, totalOwed: 0 }
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Lend & Borrow Tracker
            </h1>
            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Manage your lending and borrowing with interest calculations
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            className={`p-6 rounded-xl shadow-sm ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Total Lent
                </p>
                <p
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  ${totals.totalLent.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <ArrowUpRight
                  className="text-green-600 dark:text-green-400"
                  size={24}
                />
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl shadow-sm ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Expected Return
                </p>
                <p
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  ${totals.expectedReturn.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <TrendingUp
                  className="text-blue-600 dark:text-blue-400"
                  size={24}
                />
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl shadow-sm ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Total Borrowed
                </p>
                <p
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  ${totals.totalBorrowed.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <ArrowDownLeft
                  className="text-red-600 dark:text-red-400"
                  size={24}
                />
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl shadow-sm ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Total Owed
                </p>
                <p
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  ${totals.totalOwed.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Clock
                  className="text-orange-600 dark:text-orange-400"
                  size={24}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className={`rounded-xl shadow-sm ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("lend")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "lend"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : darkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Money Lent ({transactions.filter((t) => t.type === "lend").length}
              )
            </button>
            <button
              onClick={() => setActiveTab("borrow")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "borrow"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : darkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Money Borrowed (
              {transactions.filter((t) => t.type === "borrow").length})
            </button>
          </div>

          {/* Transaction List */}
          <div className="p-6">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div
                  className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <DollarSign
                    className={`w-12 h-12 ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <h3
                  className={`text-lg font-medium mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  No {activeTab === "lend" ? "lending" : "borrowing"} records
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Start by adding your first{" "}
                  {activeTab === "lend" ? "lending" : "borrowing"} transaction
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 hover:bg-gray-650"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-lg ${
                            transaction.type === "lend"
                              ? "bg-green-100 dark:bg-green-900"
                              : "bg-red-100 dark:bg-red-900"
                          }`}
                        >
                          {transaction.type === "lend" ? (
                            <ArrowUpRight
                              className={`w-5 h-5 ${
                                transaction.type === "lend"
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            />
                          ) : (
                            <ArrowDownLeft
                              className={`w-5 h-5 ${
                                transaction.type === "borrow"
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            />
                          )}
                        </div>

                        <div>
                          <h4
                            className={`font-medium ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {transaction.partyName}
                          </h4>
                          <p
                            className={`text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {transaction.interestRate}%{" "}
                            {transaction.interestType} interest
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          ${transaction.amount.toLocaleString()}
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Repayable: ${transaction.repayableAmount.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode
                              ? "hover:bg-gray-600 text-gray-400 hover:text-gray-300"
                              : "hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode
                              ? "hover:bg-gray-600 text-gray-400 hover:text-red-400"
                              : "hover:bg-gray-200 text-gray-500 hover:text-red-600"
                          }`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div
                      className={`mt-3 pt-3 border-t flex items-center justify-between text-sm ${
                        darkMode
                          ? "border-gray-600 text-gray-400"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      <span>
                        Due:{" "}
                        {new Date(
                          transaction.repaymentDate
                        ).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bell size={14} />
                        Remind {transaction.reminderDays} days before
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Transaction Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className={`w-full max-w-2xl rounded-xl shadow-xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Add New Transaction
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Transaction Type */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Transaction Type
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="lend"
                        checked={formData.type === "lend"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        Lend Money
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="borrow"
                        checked={formData.type === "borrow"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                      >
                        Borrow Money
                      </span>
                    </label>
                  </div>
                </div>

                {/* Party Name and Amount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Party Name
                    </label>
                    <div className="relative">
                      <User
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <input
                        type="text"
                        name="partyName"
                        value={formData.partyName}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="Enter party name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Amount
                    </label>
                    <div className="relative">
                      <DollarSign
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                {/* Interest Rate and Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Interest Rate (%)
                    </label>
                    <div className="relative">
                      <Percent
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <input
                        type="number"
                        name="interestRate"
                        value={formData.interestRate}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        }`}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Interest Type
                    </label>
                    <select
                      name="interestType"
                      value={formData.interestType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="simple">Simple Interest</option>
                      <option value="compound">Compound Interest</option>
                    </select>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {formData.type === "lend" ? "Lend Date" : "Borrow Date"}
                    </label>
                    <div className="relative">
                      <Calendar
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <input
                        type="date"
                        name="lendDate"
                        value={formData.lendDate}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Repayment Date
                    </label>
                    <div className="relative">
                      <Calendar
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <input
                        type="date"
                        name="repaymentDate"
                        value={formData.repaymentDate}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Reminder Days */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Reminder (days before due date)
                  </label>
                  <div className="relative">
                    <Bell
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <select
                      name="reminderDays"
                      value={formData.reminderDays}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="1">1 day before</option>
                      <option value="3">3 days before</option>
                      <option value="7">1 week before</option>
                      <option value="14">2 weeks before</option>
                      <option value="30">1 month before</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="Add any additional notes..."
                  />
                </div>

                {/* Calculated Amount Preview */}
                {formData.amount &&
                  formData.interestRate &&
                  formData.lendDate &&
                  formData.repaymentDate && (
                    <div
                      className={`p-4 rounded-lg border-2 border-dashed ${
                        darkMode
                          ? "border-gray-600 bg-gray-700"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator
                          className={`w-5 h-5 ${
                            darkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Calculation Preview
                        </span>
                      </div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <p>
                          Principal Amount: $
                          {parseFloat(formData.amount || "0").toLocaleString()}
                        </p>
                        <p>
                          Interest Rate: {formData.interestRate}% (
                          {formData.interestType})
                        </p>
                        <p className="font-semibold mt-2">
                          Total Repayable Amount: $
                          {calculateRepayableAmount(
                            parseFloat(formData.amount),
                            parseFloat(formData.interestRate),
                            formData.lendDate,
                            formData.repaymentDate,
                            formData.interestType
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}

                {/* Form Actions */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className={`px-6 py-2 border rounded-lg transition-colors ${
                      darkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Add Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LendBorrowPage;
