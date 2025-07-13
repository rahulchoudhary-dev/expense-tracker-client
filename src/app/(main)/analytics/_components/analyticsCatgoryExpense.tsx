import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monthOptions } from "@/constant/dateOptions";
import AnalyticsYearlyFilter from "./analyticsYearlyFilter";

interface categoryExpenseParamsProps {
  year: number;
  month: number;
}

interface AnalyticsCategoryFiltersProps {
  categoryExpenseParams: categoryExpenseParamsProps;
  setCategryExpenseParams: React.Dispatch<
    React.SetStateAction<{ year: number; month: number }>
  >;
}

const AnalyticsCategoryFilters = ({
  categoryExpenseParams,
  setCategryExpenseParams,
}: AnalyticsCategoryFiltersProps) => {
  console.log(categoryExpenseParams);
  return (
    <div className="w-full flex justify-end ">
      <div className="flex gap-4 w-full max-w-sm">
        {/* Month Dropdown */}
        <div className="flex hover:shadow-sm">
          <Select
            name="month"
            value={String(categoryExpenseParams?.month)}
            onValueChange={(value) =>
              setCategryExpenseParams({
                ...categoryExpenseParams,
                month: Number(value),
              })
            }
          >
            <SelectTrigger className="w-full shadow-sm cursor-pointer">
              <SelectValue placeholder="Select month">
                {
                  monthOptions.find(
                    (m) =>
                      Number(m.value) === Number(categoryExpenseParams.month)
                  )?.label
                }
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
        <AnalyticsYearlyFilter
          filterParams={categoryExpenseParams}
          setFilterParams={setCategryExpenseParams}
        />
      </div>
    </div>
  );
};

export default AnalyticsCategoryFilters;
