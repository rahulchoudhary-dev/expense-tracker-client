"use client";

import React, { useState } from "react";
import BudgetList from "./_components/BudgetList";
import CreateBudget from "./_components/CreateBudget";
import { Button } from "@/components/ui/button";
const BudgetDashBoard = () => {
  const [isCreateBudget, setIsCreateBudget] = useState<boolean>(false);

  return (
    <div className="p-6">
      <div className="mt-4">
        {isCreateBudget ? (
          <CreateBudget setIsCreateBudget={setIsCreateBudget} />
        ) : (
          <BudgetList setIsCreateBudget={setIsCreateBudget} />
        )}
      </div>
    </div>
  );
};

export default BudgetDashBoard;
