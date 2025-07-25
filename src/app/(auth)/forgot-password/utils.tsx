import {
  emailSchema,
  otpSchema,
  resetSchema,
} from "@/validations/forgot-password.validations";

export const getCurrentValidationSchema = (step: string) => {
  switch (step) {
    case "email":
      return emailSchema;
    case "otp":
      return otpSchema;
    case "reset":
      return resetSchema;
    default:
      return emailSchema;
  }
};
import { ChevronLeft, Mail, Shield, Lock, CheckCircle } from "lucide-react";

export const getStepIcon = (step: string, stepName: string) => {
  const isActive = step === stepName;
  const isCompleted =
    (stepName === "email" && (step === "otp" || step === "reset")) ||
    (stepName === "otp" && step === "reset");

  const iconClass = `w-6 h-6 ${
    isCompleted
      ? "text-green-500"
      : isActive
      ? "text-blue-500"
      : "text-gray-400"
  }`;

  if (isCompleted) {
    return <CheckCircle className={iconClass} />;
  }

  switch (stepName) {
    case "email":
      return <Mail className={iconClass} />;
    case "otp":
      return <Shield className={iconClass} />;
    case "reset":
      return <Lock className={iconClass} />;
    default:
      return null;
  }
};
