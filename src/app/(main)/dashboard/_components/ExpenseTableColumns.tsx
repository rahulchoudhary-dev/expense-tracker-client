"use client";

import { ColumnDef } from "@tanstack/react-table";
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
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { iExpenseDataTable } from "@/interfaces/expense";

export const CATEGORY_BG_COLOR_MAP: Record<string, string> = {
  Food: "bg-red-100 text-red-800",
  Transportation: "bg-orange-100 text-orange-800",
  Entertainment: "bg-indigo-100 text-indigo-800",
  Shopping: "bg-pink-100 text-pink-800",
  Utilities: "bg-blue-100 text-blue-800",
  Healthcare: "bg-green-100 text-green-800",
  Other: "bg-gray-100 text-gray-800",
};

export const CATEGORY_TEXT_COLOR_MAP: Record<string, string> = {
  Food: "text-red-800",
  Transportation: "text-orange-800",
  Entertainment: "text-indigo-800",
  Shopping: "text-pink-800",
  Utilities: "text-blue-800",
  Healthcare: "text-green-800",
  Other: "text-gray-800",
};

export const columns: ColumnDef<iExpenseDataTable>[] = [
  {
    accessorKey: "date",
    header: "Date",
    accessorFn: (row) => row?.date,
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return <div className="capitalize">{format(date, "PPPP")}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "Category",
    header: "Category",
    accessorFn: (row) => row?.Category?.name,
    cell: ({ getValue }) => {
      const categoryName = getValue() as string;
      const categoryBgColor =
        CATEGORY_BG_COLOR_MAP[categoryName] || "bg-slate-300";
      const categoryTextColor =
        CATEGORY_TEXT_COLOR_MAP[categoryName] || "bg-slate-300";

      return (
        <span className="capitalize">
          <Badge
            variant="outline"
            className={`px-2 py-1 rounded-md ${categoryBgColor} dark:${categoryTextColor}`}
          >
            {categoryName}
          </Badge>
        </span>
      );
    },
  },
  {
    accessorKey: "Amount",
    header: "Amount",
    accessorFn: (row) => row?.amount,
    cell: ({ getValue }) => {
      const amount = getValue() as string;
      return <span className="capitalize font-bold">$ {amount}</span>;
    },
  },
  {
    accessorKey: "PaymentMethod",
    header: "PaymentMethod",
    accessorFn: (row) => row?.PaymentMethod.name,
    cell: ({ getValue }) => {
      const paymentMethodName = getValue() as string;
      return <span className="capitalize">{paymentMethodName}</span>;
    },
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
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
            <DropdownMenuItem className="cursor-pointer">
              Edit Expense
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Delete Expense
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
