"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  Moon,
  Sun,
  Download,
  Shield,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import GeneralSettings from "./_components/GeneralSettings";
import { Button } from "@/components/ui/button";

// TypeScript interfaces
interface Category {
  id: string;
  name: string;
  color: string;
}

const SettingsPage: React.FC = () => {
  const exportData = (format: "csv" | "pdf") => {
    // Placeholder for export functionality
    alert(`${format.toUpperCase()} export feature coming soon!`);
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Header */}

        {/* General Settings */}
        <SettingSection title="General" icon={<User size={24} />}>
          <GeneralSettings />
        </SettingSection>

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
              <Button
                variant={"default"}
                className="flex items-center justify-between w-full p-6 text-left bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <span className="font-medium">Clear All Data</span>
                <ChevronRight size={20} />
              </Button>
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

            <Link
              href="/setting/app-rating"
              className="flex items-center justify-between w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-gray-900 dark:text-white">
                Rate This App
              </span>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
          </div>
        </SettingSection>

        {/* Save Button */}
      </div>
    </div>
  );
};

export default SettingsPage;
