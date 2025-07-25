"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";

interface Props {
  step: "email" | "otp" | "reset";
  handleBack: () => void;
  isLoading: boolean;
}

const StepBackButton = ({ step, handleBack, isLoading }: Props) => {
  if (step === "email") return null;

  return (
    <button
      type="button"
      onClick={handleBack}
      className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      disabled={isLoading}
    >
      <ChevronLeft className="w-4 h-4" />
      <span className="text-sm">Back</span>
    </button>
  );
};

export default StepBackButton;
