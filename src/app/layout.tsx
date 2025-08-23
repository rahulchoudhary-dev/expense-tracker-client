import ClientProviders from "./ClientProviders";
import "./globals.css";
import type { Metadata } from "next";

import { Inter, Akatab, Zilla_Slab } from "next/font/google";

export const metadata: Metadata = {
  title: "Expendo - Financial Manager",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Expendo is your smart financial companion — track expenses, manage budgets, and gain insights to take control of your money. Stay organized and financially confident with Expendo.",
  keywords: [
    "Expense Tracker",
    "Budget Manager",
    "Personal Finance",
    "Money Management",
    "Financial Planning",
    "Expendo App",
    "Income and Expenses",
  ],
  authors: [{ name: "Expendo Team" }],
  creator: "Expendo Financial",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Expendo Financial - Smart Expense Tracker",
    description:
      "Track your expenses, analyze spending, and manage your budget easily with Expendo Financial.",
    url: "https://yourdomain.com",
    siteName: "Expendo Financial",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expendo Financial - Manager",
    description:
      "Your smart expense and budget management tool. Gain financial clarity with Expendo.",
    creator: "@expendoapp",
  },
};

const akatab = Zilla_Slab({
  weight: "600",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={akatab.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
