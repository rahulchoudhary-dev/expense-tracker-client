import React from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { AddExpenseDrawer } from "./Drawer";
import Logout from "./Logout";
import { ThemeToggle } from "./ThemeToggle";
const Header = () => {
  return (
    <header className="w-full  border-gray-300  px-6 py-1 flex items-center justify-between">
      <div className="hidden md:flex md:items-center gap-4">
        <div>
          <FcMoneyTransfer size={30} />
        </div>

        <div className="hidden md:flex md:flex-col">
          <div>
            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-400 dark:text-white inline-block text-transparent bg-clip-text font-semibold text-xl">
              Expense Dashboard
            </h1>
          </div>
          <div>
            <h1 className="text-sm text-muted font-light text-left">
              Track and manage your expenses
            </h1>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:gap-4 items-center">
        <AddExpenseDrawer />
        <Logout />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
