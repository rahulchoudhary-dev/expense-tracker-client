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

export interface Option {
  label: string;
  value: string;
}

export const currencies: Option[] = [
  { label: "US Dollar", value: "USD" },
  { label: "Euro", value: "EUR" },
  { label: "British Pound", value: "GBP" },
  { label: "Japanese Yen", value: "JPY" },
  { label: "Canadian Dollar", value: "CAD" },
  { label: "Australian Dollar", value: "AUD" },
  { label: "Swiss Franc", value: "CHF" },
  { label: "Chinese Yuan", value: "CNY" },
  { label: "Indian Rupee", value: "INR" },
];

export const languages: Option[] = [
  { label: "English", value: "English" },
  { label: "Spanish", value: "Spanish" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
  { label: "Italian", value: "Italian" },
  { label: "Portuguese", value: "Portuguese" },
  { label: "Chinese", value: "Chinese" },
  { label: "Japanese", value: "Japanese" },
];

export const getRatingText = (stars: number) => {
  switch (stars) {
    case 1:
      return "Poor";
    case 2:
      return "Fair";
    case 3:
      return "Good";
    case 4:
      return "Very Good";
    case 5:
      return "Excellent";
    default:
      return "Rate our app";
  }
};

export const getRatingMessage = (stars: number) => {
  switch (stars) {
    case 1:
    case 2:
      return "We're sorry to hear you're not satisfied. Your feedback helps us improve!";
    case 3:
      return "Thanks for the feedback! We're always working to make the app better.";
    case 4:
    case 5:
      return "Thank you! We're thrilled you're enjoying the app. Consider leaving a review!";
    default:
      return "";
  }
};
