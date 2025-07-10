import { DollarSign } from "lucide-react";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

const ExpenseDrawerHeader = () => {
  return (
    <DrawerHeader>
      <DrawerTitle className="flex items-start gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
          <DollarSign className="w-4 h-4 text-white" />
        </div>
        Add New Expense
      </DrawerTitle>
      <DrawerDescription>
        Fill in the details below to track your expense.
      </DrawerDescription>
    </DrawerHeader>
  );
};

export default ExpenseDrawerHeader;
