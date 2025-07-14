import React from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { AddExpenseDrawer } from "./Drawer";
import Logout from "./Logout";
import { ThemeToggle } from "./ThemeToggle";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Frame, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
const Header = () => {
  const { setOpen, open } = useSidebar();

  return (
    <>
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {!open ? (
            <Menu size={24} className="text-black dark:text-white" />
          ) : (
            <X size={24} className="text-black dark:text-white" />
          )}
        </Button>
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
      </div>
    </>
  );
};

export default Header;
