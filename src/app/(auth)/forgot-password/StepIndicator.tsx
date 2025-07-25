"use client";

import React from "react";
import { getStepIcon } from "./utils";

interface Props {
  step: "email" | "otp" | "reset";
}

const StepIndicator = ({ step }: Props) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getStepIcon(step, "email")}
          <span
            className={`text-sm font-medium ${
              step === "email"
                ? "text-blue-600"
                : step === "otp" || step === "reset"
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            Email
          </span>
        </div>
        <div className="flex-1 h-0.5 mx-4 bg-gray-200">
          <div
            className={`h-full transition-all duration-300 ${
              step === "otp" || step === "reset"
                ? "bg-green-500 w-full"
                : "bg-gray-200 w-0"
            }`}
          />
        </div>
        <div className="flex items-center space-x-2">
          {getStepIcon(step, "otp")}
          <span
            className={`text-sm font-medium ${
              step === "otp"
                ? "text-blue-600"
                : step === "reset"
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            OTP
          </span>
        </div>
        <div className="flex-1 h-0.5 mx-4 bg-gray-200">
          <div
            className={`h-full transition-all duration-300 ${
              step === "reset" ? "bg-green-500 w-full" : "bg-gray-200 w-0"
            }`}
          />
        </div>
        <div className="flex items-center space-x-2">
          {getStepIcon(step, "reset")}
          <span
            className={`text-sm font-medium ${
              step === "reset" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Reset
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
