"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDeleteExpense from "@/query/useDeleteExpense";
import { memo, useState } from "react";
import AddExpenseDrawer from "@/app/(main)/dashboard/_components/AddExpenseDrawer";

function ExpenseActions({ expense }: any) {
  const { mutate } = useDeleteExpense(expense.id);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer">
            View Expense
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsDrawerOpen(true)}
          >
            Edit Expense
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => mutate(expense.id)}
            className="cursor-pointer text-red-600"
          >
            Delete Expense
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddExpenseDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        defaultData={expense}
        isEditMode={true}
      />
    </>
  );
}
export default memo(ExpenseActions);
