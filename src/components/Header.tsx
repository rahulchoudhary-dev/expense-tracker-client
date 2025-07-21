"use client";

import React, { memo, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import AddExpenseDrawer from "../app/(main)/dashboard/_components/AddExpenseDrawer";
import OpenExpenseDrawerButton from "./OpenExpenseDrawerButton";
import { Plus, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAppSelector } from "@/hooks/useRedux";

const Header = () => {
  const isMobile = useIsMobile();
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      <header className="w-full relative overflow-hidden">
        {/* Background with gradient and animated elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent dark:via-gray-800/30"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-2 right-20 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-2 left-32 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40 animate-bounce delay-300"></div>
        <div className="absolute top-4 left-64 w-1 h-1 bg-indigo-400 rounded-full opacity-50 animate-pulse delay-700"></div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo and Welcome */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 flex-1 min-w-0">
              {/* Logo with enhanced styling */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <FcMoneyTransfer
                    size={isMobile ? 28 : 36}
                    className="drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Welcome Section */}
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent truncate">
                    Welcome back, {user?.firstName}!
                  </h1>
                  <div className="hidden sm:flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                    <span className="text-lg">💰</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                    Here's your expense tracking overview
                  </p>
                  <span className="hidden sm:inline text-sm">📊</span>
                </div>
              </div>

              {/* Mobile Add Button */}
              {isMobile && (
                <div className="flex-shrink-0">
                  <Button
                    size="icon"
                    onClick={() => setIsExpenseModalOpen(true)}
                    className="relative bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 rounded-full w-10 h-10 sm:w-12 sm:h-12"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                  </Button>
                </div>
              )}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0">
              <div className="relative">
                <OpenExpenseDrawerButton
                  onClick={() => setIsExpenseModalOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border with gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
      </header>

      {/* Expense Drawer - positioned outside header for proper z-index */}
      <AddExpenseDrawer
        open={isExpenseModalOpen}
        onOpenChange={() => setIsExpenseModalOpen(false)}
        isEditMode={false}
      />
    </>
  );
};

export default memo(Header);
