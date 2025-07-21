"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { memo, useCallback, useEffect, useState } from "react";

import { monthOptions, yearOptions } from "../../../../constant/dateOptions";
import useGetCategory from "@/query/useGetCategory";
import usePaymentMethods from "@/query/useGetPaymentMethod";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Calendar1,
  CalendarCheck,
  FilterIcon,
  RefreshCw,
  RefreshCwIcon,
  Tag,
  Timer,
} from "lucide-react";
import getCurrentMonthYear from "@/utils/getCurrentMonthYear";
import useDebounce from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { FcMoneyTransfer } from "react-icons/fc";

interface ExpenseFiltersProps {
  pageData: {
    categoryId: string;
    paymentMethodId: string;
    month: number;
    year: number;
    q?: string;
  };
  setPageData: React.Dispatch<React.SetStateAction<any>>;
}

const ExpenseFilters = ({ pageData, setPageData }: ExpenseFiltersProps) => {
  const { currentMonth, currentYear } = getCurrentMonthYear();
  const { data: categories } = useGetCategory();
  const { data: paymentMethods } = usePaymentMethods();

  const handleResetFilters = useCallback(() => {
    setPageData({
      page: 0,
      limit: 10,
      q: "",
      month: currentMonth,
      year: currentYear,
      categoryId: "",
      paymentMethodId: "",
    });
    setSearchText("");
  }, []);

  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 2000);

  useEffect(() => {
    setPageData({
      ...pageData,
      q: debouncedValue,
    });
  }, [debouncedValue]);

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <FilterIcon size={18} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Filters
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:flex gap-6 lg:gap-4">
        <div className="grid gap-4 sm:grid-cols-5 lg:grid-cols-5 flex-1">
          <div className="max-w-sm">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wide">
              Search
            </label>
            <Input
              placeholder="Search by description or amount..."
              value={searchText}
              onChange={(event) => setSearchText(event.currentTarget.value)}
              className="pr-4 py-2.5 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 rounded-lg"
            />
          </div>
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wide">
              Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag size={15} />
              </div>
              <Select
                name="categoryId"
                value={pageData.categoryId}
                onValueChange={(value) =>
                  setPageData({ ...pageData, categoryId: value })
                }
              >
                <SelectTrigger className="w-full pl-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 rounded-lg shadow-sm cursor-pointer">
                  <SelectValue placeholder="Select a category">
                    {categories?.find(
                      (cat: any) => cat?.id === pageData?.categoryId
                    )?.name || "Select category"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg rounded-lg">
                  {categories?.map((cat: any) => (
                    <SelectItem
                      className="text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50 dark:focus:bg-blue-900/20 cursor-pointer transition-colors"
                      key={cat.id}
                      value={cat.id}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{cat.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Payment Method Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wide">
              Payment Method
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FcMoneyTransfer size={15} />
              </div>
              <Select
                name="paymentMethodId"
                value={pageData.paymentMethodId}
                onValueChange={(value) =>
                  setPageData({ ...pageData, paymentMethodId: value })
                }
              >
                <SelectTrigger className="w-full pl-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 rounded-lg shadow-sm cursor-pointer">
                  <SelectValue placeholder="Select a payment method">
                    {paymentMethods?.find(
                      (items: any) => items?.id == pageData?.paymentMethodId
                    )?.name || "Select Payment Method"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg rounded-lg">
                  {paymentMethods?.map((payType: any) => (
                    <SelectItem
                      className="text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 focus:bg-green-50 dark:focus:bg-green-900/20 cursor-pointer transition-colors"
                      key={payType.id}
                      value={payType.id}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{payType.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Month Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wide">
              Month
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarCheck size={15} />
              </div>
              <Select
                name="month"
                value={String(pageData.month)}
                onValueChange={(value) =>
                  setPageData({ ...pageData, month: Number(value) })
                }
              >
                <SelectTrigger className="w-full pl-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 rounded-lg shadow-sm cursor-pointer">
                  <SelectValue placeholder="Select month">
                    {
                      monthOptions.find((m) => m.value === pageData.month)
                        ?.label
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg rounded-lg">
                  {monthOptions.map((month) => (
                    <SelectItem
                      className="text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-50 dark:focus:bg-purple-900/20 cursor-pointer transition-colors"
                      key={month.value}
                      value={String(month.value)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>{month.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Year Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wide">
              Year
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Timer size={15} />
              </div>
              <Select
                name="year"
                value={String(pageData.year)}
                onValueChange={(value) =>
                  setPageData({ ...pageData, year: Number(value) })
                }
              >
                <SelectTrigger className="w-full pl-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 rounded-lg shadow-sm cursor-pointer">
                  <SelectValue placeholder="Select year">
                    {yearOptions.find((y) => y.value === pageData.year)?.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg rounded-lg">
                  {yearOptions.map((year) => (
                    <SelectItem
                      className="text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 focus:bg-orange-50 dark:focus:bg-orange-900/20 cursor-pointer transition-colors"
                      key={year.value}
                      value={String(year.value)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>{year.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Enhanced Reset Button */}
        <div className="flex items-end">
          <Button
            variant="secondary"
            onClick={handleResetFilters}
            size="default"
            className="group bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg px-6 py-2.5 font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Reset</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Filter Summary */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-slate-600 dark:text-slate-400">
            <span>Active filters:</span>
            <div className="flex items-center space-x-2">
              {searchText && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                  Search: {searchText.slice(0, 20)}
                  {searchText.length > 20 ? "..." : ""}
                </span>
              )}
              {pageData.categoryId && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                  Category
                </span>
              )}
              {pageData.paymentMethodId && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                  Payment
                </span>
              )}
              {!searchText &&
                !pageData.categoryId &&
                !pageData.paymentMethodId && (
                  <span className="text-slate-400 dark:text-slate-500">
                    None
                  </span>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ExpenseFilters);
