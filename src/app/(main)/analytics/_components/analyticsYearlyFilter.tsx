import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { yearOptions } from "@/constant/dateOptions";

interface AnalyticsYearlyFilterProps<T extends { year: number }> {
  filterParams: T;
  setFilterParams: React.Dispatch<React.SetStateAction<T>>;
}

function AnalyticsYearlyFilter<T extends { year: number }>({
  filterParams,
  setFilterParams,
}: AnalyticsYearlyFilterProps<T>) {
  return (
    <div className="flex hover:shadow-sm">
      <div className="flex hover:shadow-sm">
        <Select
          name="year"
          value={String(filterParams.year)}
          onValueChange={(value) =>
            setFilterParams({
              ...filterParams,
              year: Number(value),
            })
          }
        >
          <SelectTrigger className="w-full shadow-sm cursor-pointer">
            <SelectValue placeholder="Select month">
              {
                yearOptions.find(
                  (m) => Number(m.value) === Number(filterParams.year)
                )?.label
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="z-50">
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
  );
}

export default AnalyticsYearlyFilter;
