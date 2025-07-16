"use client";

import React, { memo, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import AddExpenseDrawer from "../app/(main)/dashboard/_components/AddExpenseDrawer";
import OpenExpenseDrawerButton from "./OpenExpenseDrawerButton";

const Header = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
  const userName = "Rahul";

  return (
    <>
      <header className="w-full py-1 border-gray-300 dark:border-gray-700 dark:bg-gray-900 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <FcMoneyTransfer size={32} />
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent dark:text-white">
              Welcome back,{userName}! 💰
            </h1>
            <p className="text-sm text-muted-foreground">
              Here's your expense tracking overview 📊
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <OpenExpenseDrawerButton
            onClick={() => setIsExpenseModalOpen(true)}
          />

          <AddExpenseDrawer
            open={isExpenseModalOpen}
            onOpenChange={() => setIsExpenseModalOpen(false)}
            isEditMode={true}
          />
        </div>
      </header>
    </>
  );
};

export default memo(Header);
