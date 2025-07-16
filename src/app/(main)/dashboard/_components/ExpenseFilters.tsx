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
import { RefreshCw, RefreshCwIcon } from "lucide-react";
import getCurrentMonthYear from "@/utils/getCurrentMonthYear";
import useDebounce from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";

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
    <div className="grid grid-cols-1 md:flex gap-4 md:gap-4">
      <Input
        placeholder="Search by description or amount..."
        value={searchText}
        onChange={(event) => setSearchText(event.currentTarget.value)}
        className="max-w-xs"
      />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {/* Category Filter */}
        <div>
          <Select
            name="categoryId"
            value={pageData.categoryId}
            onValueChange={(value) =>
              setPageData({ ...pageData, categoryId: value })
            }
          >
            <SelectTrigger className="w-full shadow-sm cursor-pointer">
              <SelectValue placeholder="Select a category">
                {categories?.find(
                  (cat: any) => cat?.id === pageData?.categoryId
                )?.name || "Select category"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="shadow-sm">
              {categories?.map((cat: any) => (
                <SelectItem
                  className="text-muted z-50 bg-primary shadow-2xl cursor-pointer"
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Select
            name="paymentMethodId"
            value={pageData.paymentMethodId}
            onValueChange={(value) =>
              setPageData({ ...pageData, paymentMethodId: value })
            }
          >
            <SelectTrigger className="w-full shadow-sm cursor-pointer">
              <SelectValue placeholder="Select a payment method">
                {paymentMethods?.find(
                  (items: any) => items?.id == pageData?.paymentMethodId
                )?.name || "Select Payment Method"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="z-50">
              {paymentMethods?.map((payType: any) => (
                <SelectItem
                  className="text-muted z-50 bg-primary shadow-2xl cursor-pointer"
                  key={payType.id}
                  value={payType.id}
                >
                  {payType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Month Filter */}
        <div>
          <Select
            name="month"
            value={String(pageData.month)}
            onValueChange={(value) =>
              setPageData({ ...pageData, month: Number(value) })
            }
          >
            <SelectTrigger className="w-full shadow-sm cursor-pointer">
              <SelectValue placeholder="Select month">
                {monthOptions.find((m) => m.value === pageData.month)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="z-50">
              {monthOptions.map((month) => (
                <SelectItem
                  className="text-muted z-50 bg-primary shadow-2xl cursor-pointer"
                  key={month.value}
                  value={String(month.value)}
                >
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year Filter */}
        <div>
          <Select
            name="year"
            value={String(pageData.year)}
            onValueChange={(value) =>
              setPageData({ ...pageData, year: Number(value) })
            }
          >
            <SelectTrigger className="w-full z-50 shadow-sm cursor-pointer">
              <SelectValue placeholder="Select year">
                {yearOptions.find((y) => y.value === pageData.year)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="shadow-sm">
              {yearOptions.map((year) => (
                <SelectItem
                  className="text-muted z-50 bg-primary shadow-2xl cursor-pointer"
                  key={year.value}
                  value={String(year.value)}
                >
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        variant="secondary"
        onClick={handleResetFilters}
        size="default"
        className={`rounded-full cursor-pointer hover:shadow-xl`}
      >
        {/* <RefreshCw color="black" /> */}
        Reset
      </Button>
    </div>
  );
};
export default memo(ExpenseFilters);
