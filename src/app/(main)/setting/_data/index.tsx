import { HelpCircle, Zap, Shield, CreditCard } from "lucide-react";
import { ReactNode } from "react";

export interface Category {
  id: string;
  label: string;
  icon: ReactNode;
}

export function getIconBySlug(slug: string) {
  switch (slug) {
    case "general-question":
      return <HelpCircle size={20} />;
    case "technical-issue":
      return <Zap size={20} />;
    case "account-and-privacy":
      return <Shield size={20} />;
    case "billing-and-subscription":
      return <CreditCard size={20} />;
    default:
      return null; // or a default icon if you prefer
  }
}

export const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
  "INR",
];
export const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
];
