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

export type iExpenseData = {
  id: string;
  amount: number;
  Category: any;
  PaymentMethod: any;
  date?: string | Date;
};
export const CATEGORY_COLOR_MAP: Record<string, string> = {
  Food: "bg-red-100 text-red-800",
  Transportation: "bg-orange-100 text-orange-800",
  Entertainment: "bg-indigo-100 text-indigo-800",
  Shopping: "bg-pink-100 text-pink-800",
  Utilities: "bg-blue-100 text-blue-800",
  Healthcare: "bg-green-100 text-green-800",
  Other: "bg-gray-100 text-gray-800",
};

export const columns: ColumnDef<iExpenseData>[] = [
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
    // header: ({ column }) => (
    //   <Button
    //     variant="ghost"
    //     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //   >
    //     Email <ArrowUpDown className="ml-2 h-4 w-4" />
    //   </Button>
    // ),
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
      const categoryColor = CATEGORY_COLOR_MAP[categoryName] || "bg-slate-300";

      return (
        <span className="capitalize">
          <Badge
            variant="outline"
            className={`px-2 py-1 rounded-md text-white ${categoryColor}`}
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
      const payment = row.original;
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
              {/* <SquarePen color="#0dde30" /> */}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Delete Expense
              {/* <Trash color="#dd2222" /> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
