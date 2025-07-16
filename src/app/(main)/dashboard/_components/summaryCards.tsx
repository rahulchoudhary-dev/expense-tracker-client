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
import { Wallet, DollarSign, ChartBar, Calendar1, CatIcon } from "lucide-react";
import { iData, iSummaryCardsProps } from "@/interfaces/summaryCardsProps";
import CountUp from "react-countup";

const ICONS_MAP: Record<string, JSX.Element> = {
  "Total Expense": <DollarSign className="w-5 h-5 text-primary font-bold" />,
  "Avg Expense": <ChartBar className="w-5 h-5 text-primary" />,
  "This Month": <Calendar1 className="w-5 h-5 text-primary" />,
  "Top Category": <CatIcon className="w-5 h-5 text-primary" />,
};

const COLOR_MAP: Record<string, string> = {
  "Total Expense": "bg-green-500",
  "Avg Expense": "bg-blue-500",
  "This Month": "bg-yellow-500",
  "Top Category": "bg-purple-500",
};

const SummaryCards: React.FC<iSummaryCardsProps> = ({
  data,
  isLoading,
}: any) => {
  const memoizedData = useMemo(() => {
    return data?.map((item: iData) => {
      return {
        ...item,
        icon: ICONS_MAP[item.lable] || (
          <Wallet className="w-5 h-5 text-muted" />
        ),
        bgColor: COLOR_MAP[item.lable] || "bg-gray-400",
      };
    });
  }, [data]);

  const renderSkeletonCard = () => (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="bg-gray-200 h-5 w-1/3 animate-pulse rounded" />
        <CardAction>
          <div className="bg-gray-300 h-10 w-10 rounded-full animate-pulse" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse" />
      </CardContent>
      <CardFooter>
        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {isLoading
        ? Array.from({ length: 4 }).map((_, idx) => (
            <React.Fragment key={idx}>{renderSkeletonCard()}</React.Fragment>
          ))
        : memoizedData?.map((item: any) => (
            <Card
              key={item.lable}
              className="md:w-full dark:bg-gray-900 hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-base md:text-lg">
                  {item.lable}
                </CardTitle>
                <CardAction>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full ${item.bgColor} cursor-pointer h-10 w-10`}
                  >
                    {item.icon}
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                {item.lable === "Top Category" ? (
                  <h1 className="font-bold text-xl md:text-2xl">
                    {item?.value}
                  </h1>
                ) : (
                  <h1 className="font-bold text-xl md:text-2xl">
                    <CountUp
                      end={Number(item?.value)}
                      decimals={2}
                      prefix={`${item.currency} `}
                    />
                  </h1>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-muted text-xs md:text-sm">
                  {item?.otherInfo}
                </p>
              </CardFooter>
            </Card>
          ))}
    </div>
  );
};

export default memo(SummaryCards);
