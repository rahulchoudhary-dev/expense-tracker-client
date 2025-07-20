import { DollarSign } from "lucide-react";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Label } from "./ui/label";

const ExpenseDrawerHeader = () => {
  return (
    <DrawerHeader className="hidden md:inline-flex flex-col gap-1">
      <div className="flex flex-col gap-1">
        <Label className="text-lg font-semibold">
          {" "}
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          Add New Expense
        </Label>
        <Label className="text-sm text-muted-foreground">
          Fill in the details below to track your expense.
        </Label>
      </div>
      <DrawerTitle className="text-lg font-semibold"></DrawerTitle>
    </DrawerHeader>
  );
};

export default ExpenseDrawerHeader;
