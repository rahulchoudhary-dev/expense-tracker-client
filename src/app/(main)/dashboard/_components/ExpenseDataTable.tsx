"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns as defaultColumns } from "./ExpenseTableColumns";
import ExpenseFilters from "./ExpenseFilters";
import TablePagination from "@/components/TablePagination";
import { iExpenseDataTableProps } from "@/interfaces/expense";

export function ExpenseDataTable({
  count = 0,
  data = [],
  columns = defaultColumns,
  isLoading,
  pageData,
  setPageData,
}: iExpenseDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      columnVisibility: {
        select: false,
      },
    },
  });
  return (
    <>
      <div className="w-full overflow-auto bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl shadow-sm">
        {/* Header Section with Enhanced Styling */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
          <ExpenseFilters pageData={pageData} setPageData={setPageData} />
        </div>

        {/* Table Container with Enhanced Design */}
        <div className="relative overflow-hidden">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div
                  className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <span className="ml-2 text-slate-600 dark:text-slate-300 font-medium">
                  Loading...
                </span>
              </div>
            </div>
          )}

          {/* Enhanced Table */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                {table?.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="font-semibold text-slate-700 dark:text-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 px-6 py-4 text-left border-r border-slate-200 dark:border-slate-600 last:border-r-0"
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center space-x-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table?.getRowModel().rows?.length ? (
                  table?.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={`
                        border-b border-slate-100 dark:border-slate-700 
                        hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                        dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 
                        transition-all duration-200 ease-in-out
                        ${
                          row.getIsSelected()
                            ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700"
                            : ""
                        }
                        ${
                          index % 2 === 0
                            ? "bg-white dark:bg-slate-800"
                            : "bg-slate-50/50 dark:bg-slate-800/50"
                        }
                        group cursor-pointer
                      `}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-6 py-4 text-slate-700 dark:text-slate-200 border-r border-slate-100 dark:border-slate-700 last:border-r-0 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors"
                        >
                          <div className="flex items-center">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center bg-slate-50 dark:bg-slate-800/50"
                    >
                      <div className="flex flex-col items-center justify-center space-y-3">
                        {isLoading && (
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-slate-600 dark:text-slate-300 font-medium">
                              Loading data...
                            </span>
                          </div>
                        )}
                        {table?.getRowModel().rows?.length <= 0 && (
                          <>
                            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-slate-400 dark:text-slate-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <div className="text-center">
                              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-1">
                                No Results Found
                              </h3>
                              <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Try adjusting your filters or search criteria
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Enhanced Pagination Section */}
        <div className="flex items-center w-full justify-center space-x-2 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700">
          <div className="">
            <TablePagination
              count={count}
              pageData={pageData}
              setPageData={setPageData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
