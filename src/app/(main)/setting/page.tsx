"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  Globe,
  Moon,
  Sun,
  DollarSign,
  Tag,
  Bell,
  Download,
  Shield,
  HelpCircle,
  ChevronRight,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";

// TypeScript interfaces
interface Category {
  id: string;
  name: string;
  color: string;
}

interface SettingsState {
  theme: "light" | "dark";
  currency: string;
  language: string;
  categories: Category[];
  notifications: {
    expenseReminders: boolean;
    budgetAlerts: boolean;
    weeklyReports: boolean;
    monthlyReports: boolean;
  };
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    theme: "light",
    currency: "USD",
    language: "English",
    categories: [
      { id: "1", name: "Food & Dining", color: "#FF6B6B" },
      { id: "2", name: "Transportation", color: "#4ECDC4" },
      { id: "3", name: "Shopping", color: "#45B7D1" },
      { id: "4", name: "Entertainment", color: "#96CEB4" },
      { id: "5", name: "Bills & Utilities", color: "#FFEAA7" },
    ],
  });

  const [isEditingCategory, setIsEditingCategory] = useState<string | null>(
    null
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#FF6B6B");
  const [showAddCategory, setShowAddCategory] = useState(false);

  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CAD",
    "AUD",
    "CHF",
    "CNY",
    "INR",
  ];
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
  ];

  const handleThemeChange = (theme: "light" | "dark") => {
    setSettings((prev: any) => ({ ...prev, theme }));
  };

  const handleCurrencyChange = (currency: any) => {
    setSettings((prev: any) => ({ ...prev, currency }));
  };

  const handleLanguageChange = (language: any) => {
    setSettings((prev: any) => ({ ...prev, language }));
  };

  const handleNotificationChange = (
    key: keyof SettingsState["notifications"]
  ) => {
    setSettings((prev: any) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const addCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        color: newCategoryColor,
      };
      setSettings((prev: any) => ({
        ...prev,
        categories: [...prev.categories, newCategory],
      }));
      setNewCategoryName("");
      setNewCategoryColor("#FF6B6B");
      setShowAddCategory(false);
    }
  };

  const deleteCategory = (id: string) => {
    setSettings((prev: any) => ({
      ...prev,
      categories: prev.categories.filter((cat: any) => cat.id !== id),
    }));
  };

  const updateCategory = (id: string, name: string) => {
    setSettings((prev: any) => ({
      ...prev,
      categories: prev.categories.map((cat: any) =>
        cat.id === id ? { ...cat, name } : cat
      ),
    }));
    setIsEditingCategory(null);
  };

  const exportData = (format: "csv" | "pdf") => {
    // Placeholder for export functionality
    alert(`Exporting data as ${format.toUpperCase()}...`);
  };

  const SettingSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="text-blue-600 dark:text-blue-400 mr-3">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );

  const ToggleSwitch: React.FC<{
    enabled: boolean;
    onChange: () => void;
    label: string;
  }> = ({ enabled, onChange, label }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mb-8 flex justify-between items-center-safe">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Settings
              className="mr-3 text-blue-600 dark:text-blue-400"
              size={32}
            />
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your expense tracker preferences and configurations
          </p>
        </div>
        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Save All Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Header */}

        {/* General Settings */}
        <SettingSection title="General" icon={<User size={24} />}>
          <div className="space-y-4">
            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleThemeChange("light")}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                    settings.theme === "light"
                      ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <Sun size={18} className="mr-2" />
                  Light
                </button>
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                    settings.theme === "dark"
                      ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <Moon size={18} className="mr-2" />
                  Dark
                </button>
              </div>
            </div>

            {/* Currency Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </SettingSection>

        {/* Notifications */}
        {/* <SettingSection title="Notifications" icon={<Bell size={24} />}>
          <div className="space-y-1">
            <ToggleSwitch
              enabled={settings?.notifications?.expenseReminders}
              onChange={() => handleNotificationChange("expenseReminders")}
              label="Expense Reminders"
            />
            <ToggleSwitch
              enabled={settings?.notifications?.budgetAlerts}
              onChange={() => handleNotificationChange("budgetAlerts")}
              label="Budget Alerts"
            />
            <ToggleSwitch
              enabled={settings?.notifications?.weeklyReports}
              onChange={() => handleNotificationChange("weeklyReports")}
              label="Weekly Reports"
            />
            <ToggleSwitch
              enabled={settings?.notifications?.monthlyReports}
              onChange={() => handleNotificationChange("monthlyReports")}
              label="Monthly Reports"
            />
          </div>
        </SettingSection> */}

        {/* Data Management */}
        <SettingSection title="Data Management" icon={<Download size={24} />}>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Export Data
              </h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => exportData("csv")}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download size={18} className="mr-2" />
                  Export as CSV
                </button>
                <button
                  onClick={() => exportData("pdf")}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download size={18} className="mr-2" />
                  Export as PDF
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <button className="flex items-center justify-between w-full p-3 text-left bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <span className="font-medium">Clear All Data</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </SettingSection>

        {/* Security */}
        <SettingSection title="Security & Privacy" icon={<Shield size={24} />}>
          <div className="space-y-4">
            <button className="flex items-center justify-between w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <span className="text-gray-900 dark:text-white">
                Change Password
              </span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button className="flex items-center justify-between w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <span className="text-gray-900 dark:text-white">
                Two-Factor Authentication
              </span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <Link
              href="/setting/privacy-policy"
              className="flex items-center justify-between w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-gray-900 dark:text-white">
                {/* <Link>Privacy Policy</Link> */}
                Privacy Policy
              </span>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
          </div>
        </SettingSection>

        {/* About & Support */}
        <SettingSection title="About & Support" icon={<HelpCircle size={24} />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-900 dark:text-white">App Version</span>
              <span className="text-gray-500 dark:text-gray-400">v2.1.0</span>
            </div>

            <Link
              href="/setting/contact-support"
              className="flex items-center justify-between w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-gray-900 dark:text-white">
                Contact Support
              </span>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>

            <button className="flex items-center justify-between w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <span className="text-gray-900 dark:text-white">
                Rate This App
              </span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button className="flex items-center justify-between w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <span className="text-gray-900 dark:text-white">
                Open Source Licenses
              </span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </SettingSection>

        {/* Save Button */}
      </div>
    </div>
  );
};

export default SettingsPage;
