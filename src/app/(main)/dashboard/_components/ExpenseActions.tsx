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
import React, { memo, useState } from "react";
import AddExpenseDrawer from "@/app/(main)/dashboard/_components/AddExpenseDrawer";
import ExpenseDetailsDialog from "./view-expense/ExpenseDetailsDialog";
import { Expense } from "./types";

const ExpenseActions = ({ expense }: { expense: Expense }) => {
  const { mutate } = useDeleteExpense(expense.id);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);

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
          <DropdownMenuItem
            onClick={() => setIsViewDialogOpen(true)}
            className="cursor-pointer"
          >
            View Expense
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsEditDrawerOpen(true)}
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
        open={isEditDrawerOpen}
        onOpenChange={() => setIsEditDrawerOpen(!isEditDrawerOpen)}
        expenseData={expense}
        isEditMode={true}
      />
      <ExpenseDetailsDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        expenseId={expense.id}
      />
    </>
  );
};
export default memo(ExpenseActions);
