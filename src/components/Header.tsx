"use client";

import React, { memo, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import AddExpenseDrawer from "../app/(main)/dashboard/_components/AddExpenseDrawer";
import Logout from "./Logout";
import { ThemeToggle } from "./ThemeToggle";
import { useSidebar } from "./ui/sidebar";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import OpenExpenseDrawerButton from "./OpenExpenseDrawerButton";

const Header = () => {
  const { setOpen, open, toggleSidebar } = useSidebar();
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);

  return (
    <>
      <header className="w-full py-1 border-gray-300 dark:border-gray-700 dark:bg-gray-900 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          {/* <Button
            onClick={() => toggleSidebar()}
            variant="ghost"
            size="icon"
            className=""
          >
            {!open ? (
              <Menu size={24} className="text-black dark:text-white" />
            ) : (
              <X size={24} className="text-black dark:text-white" />
            )}
          </Button> */}
          <FcMoneyTransfer size={32} />
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent dark:text-white">
              Expense Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Track and manage your expenses
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
          <Logout />
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile Action Buttons */}
      <div className="flex md:hidden justify-between items-center px-4 py-2 gap-3">
        <OpenExpenseDrawerButton onClick={() => setIsExpenseModalOpen(true)} />
        <AddExpenseDrawer
          open={isExpenseModalOpen}
          onOpenChange={() => setIsExpenseModalOpen(false)}
          isEditMode={true}
        />
        <div className="flex gap-2">
          <Logout />
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};

export default memo(Header);
