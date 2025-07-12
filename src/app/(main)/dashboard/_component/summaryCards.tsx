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
        icon: ICONS_MAP[item.key] || <Wallet className="w-5 h-5 text-muted" />,
        bgColor: COLOR_MAP[item.key] || "bg-gray-400",
      };
    });
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx}>
            <CardHeader>
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
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-5">
      {memoizedData?.map((item: any) => (
        <Card key={item.key}>
          <CardHeader>
            <CardTitle>{item.key}</CardTitle>
            <CardAction>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-3xl ${item.bgColor} cursor-pointer h-10 w-10`}
              >
                {item.icon}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="mt-[-20]">
            <h1 className="font-bold text-2xl">{item?.amount}</h1>
          </CardContent>
          <CardFooter className="mt-[-20]">
            <p className="text-muted font-normal text-sm">{item?.otherInfo}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default memo(SummaryCards);
