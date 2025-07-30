import { HelpCircle, Zap, Shield, CreditCard } from "lucide-react";
import { ReactNode } from "react";

export interface Category {
  id: string;
  label: string;
  icon: ReactNode;
}

export const categories: Category[] = [
  {
    id: "general",
    label: "General Question",
    icon: <HelpCircle size={20} />,
  },
  {
    id: "technical",
    label: "Technical Issue",
    icon: <Zap size={20} />,
  },
  {
    id: "account",
    label: "Account & Privacy",
    icon: <Shield size={20} />,
  },
  {
    id: "billing",
    label: "Billing & Subscription",
    icon: <CreditCard size={20} />,
  },
];
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I export my expense data?",
    answer:
      "You can export your data by going to Settings > Data Management and selecting either CSV or PDF export format. The exported file will include all your transactions, categories, and summary information.",
    category: "general",
  },
  {
    id: "2",
    question: "Can I sync my data across multiple devices?",
    answer:
      "Yes! Your data is automatically synced across all devices when you're logged into your account. Make sure you're using the same email address on all devices.",
    category: "technical",
  },
  {
    id: "3",
    question: "How do I delete my account?",
    answer:
      "To delete your account, go to Settings > Security & Privacy > Delete Account. Please note that this action is irreversible and all your data will be permanently removed.",
    category: "account",
  },
  {
    id: "4",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through our payment partners.",
    category: "billing",
  },
  {
    id: "5",
    question: "The app is running slowly. What should I do?",
    answer:
      "Try closing and reopening the app first. If the issue persists, check for app updates in your app store. You can also try restarting your device or clearing the app cache.",
    category: "technical",
  },
  {
    id: "6",
    question: "How do I set up budget alerts?",
    answer:
      'Go to Settings > Notifications and enable "Budget Alerts". You can set custom thresholds for different categories and receive notifications when you\'re approaching your limits.',
    category: "general",
  },
];
