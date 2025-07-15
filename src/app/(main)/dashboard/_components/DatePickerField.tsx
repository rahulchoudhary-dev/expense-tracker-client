import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/utils";
import { memo } from "react";

function DatePickerField({ formik }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start dark:bg-input/30 text-left font-normal cursor-pointer",
            !formik.values.date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formik.values.date
            ? format(formik.values.date, "PPP")
            : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 shadow-lg">
        <Calendar
          className="rounded-md"
          initialFocus={true}
          defaultMonth={formik.values.date}
          autoFocus={true}
          mode="single"
          selected={formik.values?.date}
          onSelect={(date) => date && formik.setFieldValue("date", date)}
        />
      </PopoverContent>
    </Popover>
  );
}

export default memo(DatePickerField);
