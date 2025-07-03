import React from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { AddExpenseDrawer } from "./Drawer";
const Header = () => {
  return (
    <header className="w-full border-gray-300  px-6 py-1 flex items-center justify-between">
      <div className="hidden md:flex md:items-center gap-4">
        <div>
          <FcMoneyTransfer size={30} />
        </div>

        <div className="hidden md:flex md:flex-col">
          <div>
            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text font-semibold text-xl">
              Expense Dashboard
            </h1>
          </div>
          <div>
            <h1 className="text-sm font-light text-gray-800 text-left">
              Track and manage your expenses
            </h1>
          </div>
        </div>
      </div>
      <AddExpenseDrawer />

      {/* <div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-400 flex py-5">
          <div>
            <FiPlus size={25} className="font-semibold shrink-0" />
          </div>
          <div>
            <h1 className="leading-7 [&:not(:first-child)]:mt-6">
              Add Expense
            </h1>
          </div>
        </Button>
      </div> */}
    </header>
  );
};

export default Header;
