"use client";

import React, { useState } from "react";
import BudgetList from "./_components/BudgetList";
import CreateBudget from "./_components/CreateBudget";
import { Budget } from "./types";
const BudgetDashBoard = () => {
  const [isCreateBudget, setIsCreateBudget] = useState<boolean>(false);
  const [editBudgetData, setEditBudgetData] = useState<Budget>();
  return (
    <div className="p-6">
      <div className="mt-4">
        {isCreateBudget ? (
          <CreateBudget
            editBudgetData={editBudgetData}
            setIsCreateBudget={setIsCreateBudget}
            setEditBudgetData={setEditBudgetData}
          />
        ) : (
          <BudgetList
            setEditBudgetData={setEditBudgetData}
            setIsCreateBudget={setIsCreateBudget}
          />
        )}
      </div>
    </div>
  );
};

export default BudgetDashBoard;
