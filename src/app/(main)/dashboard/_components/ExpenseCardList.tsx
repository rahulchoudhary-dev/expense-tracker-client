"use client";

import React from "react";
import { format } from "date-fns";
import { Expense } from "./types";

const ExpenseCardList = ({ data }: { data: Expense[] }) => {
  if (!data?.length) {
    return (
      <p className="text-center py-4 text-muted-foreground">
        No expenses found
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border p-4 bg-white dark:bg-gray-800 shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              {item.Category?.name || "No Category"}
            </h2>
            <span className="text-base font-bold text-green-600 dark:text-green-400">
              ₹{item.amount}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            <strong>Date:</strong> {format(new Date(item.date), "dd MMM yyyy")}
          </p>

          <p className="text-sm text-muted-foreground">
            <strong>Payment:</strong> {item.PaymentMethod?.name || "N/A"}
          </p>

          {item.description && (
            <p className="text-sm text-muted-foreground mt-1">
              <strong>Description:</strong> {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseCardList;
