import React, { memo, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { currencies, languages } from "../_data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GeneralSettingsProps {}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({}) => {
  const { theme, setTheme } = useTheme();
  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState("");

  return (
    <div className="space-y-4">
      {/* Theme Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Theme
        </label>
        <div className="flex space-x-3">
          <Button
            onClick={() => setTheme("light")}
            className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
              theme === "light"
                ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <Sun size={18} className="mr-2" />
            Light
          </Button>
          <Button
            onClick={() => setTheme("dark")}
            className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
              theme === "dark"
                ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <Moon size={18} className="mr-2" />
            Dark
          </Button>
        </div>
      </div>

      {/* Currency Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Currency
        </label>
        <Select value={currency} onValueChange={(val) => setCurrency(val)}>
          <SelectTrigger className="w-full p-6">
            <SelectValue placeholder="Select a currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Language Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Language
        </label>
        <Select value={language} onValueChange={(val) => setLanguage(val)}>
          <SelectTrigger className="w-full p-6">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default memo(GeneralSettings);
