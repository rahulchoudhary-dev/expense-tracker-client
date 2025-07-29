"use client";

import React, { JSX, memo, useMemo } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  DollarSign,
  ChartBar,
  Calendar1,
  CatIcon,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import CountUp from "react-countup";
import { COLOR_MAP } from "@/constant";
import { renderSkeletonCard } from "./renderSkeletonCard";
import { Data, SummaryCardsProps } from "./types";

const ICONS_MAP: Record<string, JSX.Element> = {
  "Total Expense": <DollarSign className="w-5 h-5 text-white font-bold" />,
  "Avg Expense": <ChartBar className="w-5 h-5 text-white" />,
  "This Month": <Calendar1 className="w-5 h-5 text-white" />,
  "Top Category": <CatIcon className="w-5 h-5 text-white" />,
};

const SummaryCards: React.FC<SummaryCardsProps> = ({ data, isLoading }) => {
  const memoizedData = useMemo(() => {
    if (data?.length >= 0) {
      return data?.map((item: Data) => {
        const colorConfig = COLOR_MAP[item.lable] || {
          gradient: "bg-gradient-to-br from-gray-500 to-gray-600",
          shadow: "shadow-gray-500/25",
          accent: "from-gray-400 to-gray-500",
        };

        return {
          ...item,
          icon: ICONS_MAP[item.lable] || (
            <Wallet className="w-5 h-5 text-white" />
          ),
          ...colorConfig,
        };
      });
    } else {
      return [];
    }
  }, [data]);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {isLoading
        ? Array.from({ length: 4 }).map((_, idx) => (
            <React.Fragment key={idx}>{renderSkeletonCard()}</React.Fragment>
          ))
        : memoizedData?.map((item, index: number) => (
            <Card
              key={item.lable}
              className="group relative overflow-hidden bg-white/80 dark:bg-gray-800 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/20 transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-50/50 dark:from-gray-800/50 dark:to-gray-900/50"></div>

              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent dark:via-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 p-2">
                <CardHeader className="flex justify-between items-start pb-4">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      {item.lable}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        Active
                      </span>
                    </div>
                  </div>

                  <CardAction>
                    <div className="relative group/icon">
                      {/* Icon background with gradient and glow effect */}
                      <div
                        className={`absolute inset-0 ${item.gradient} rounded-full blur-md opacity-60 group-hover/icon:opacity-80 transition-opacity duration-300`}
                      ></div>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`relative ${item.gradient} ${item.shadow} hover:shadow-lg border-0 cursor-pointer h-12 w-12 rounded-full transform group-hover/icon:scale-110 transition-all duration-300 hover:rotate-12`}
                      >
                        {item.icon}
                        <ArrowUpRight className="absolute -top-1 -right-1 w-3 h-3 text-white opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </div>
                  </CardAction>
                </CardHeader>

                <CardContent className="pb-4">
                  <div className="space-y-2">
                    {item.lable === "Top Category" ? (
                      <h1 className="font-bold text-2xl md:text-3xl text-gray-900 dark:text-white leading-tight">
                        {item?.value}
                      </h1>
                    ) : (
                      <h1 className="font-bold text-2xl md:text-3xl text-gray-900 dark:text-white leading-tight">
                        <CountUp
                          end={Number(item?.value)}
                          decimals={2}
                          prefix={`${item?.currency} `}
                          duration={2}
                        />
                      </h1>
                    )}

                    {/* Progress indicator */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.accent} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: `${Math.min(
                            (Math.abs(Number(item?.value)) / 1000) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm font-medium">
                      {item?.otherInfo}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Live</span>
                    </div>
                  </div>
                </CardFooter>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 dark:to-gray-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </Card>
          ))}
    </div>
  );
};

export default memo(SummaryCards);
