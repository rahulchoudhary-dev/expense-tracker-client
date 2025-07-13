import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { yearOptions } from "@/constant/dateOptions";

interface AnalyticsYearlyFilterProps {
  yearlyExpenseParams: {
    year: number;
  };
  setYearlyExpenseParams: React.Dispatch<
    React.SetStateAction<{ year: number }>
  >;
}

function AnalyticsYearlyFilter({
  yearlyExpenseParams,
  setYearlyExpenseParams,
}: AnalyticsYearlyFilterProps) {
  return (
    <div>
      <Select
        name="categoryId"
        onValueChange={(value) =>
          setYearlyExpenseParams({
            ...yearlyExpenseParams,
            year: Number(value),
          })
        }
      >
        <SelectTrigger className="w-full hover:shadow-lg shadow-sm cursor-pointer">
          <SelectValue placeholder="Select a year">
            {yearOptions?.find(
              (year: any) => year?.value === yearlyExpenseParams?.year
            )?.label || "Select category"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="shadow-sm">
          {yearOptions?.map((year: any) => (
            <SelectItem
              className="text-muted z-50 bg-primary shadow-2xl cursor-pointer"
              key={year.value}
              value={year.value}
            >
              {year.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default AnalyticsYearlyFilter;
