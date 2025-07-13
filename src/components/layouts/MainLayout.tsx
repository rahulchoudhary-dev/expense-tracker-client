"use client";

import React from "react";
import Header from "../Header";
import { AppSidebar } from "../Sidebar";
import withAuth from "@/hoc/withAuth";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex dark:bg-gray-900 min-h-screen bg-primary">
      <aside className="w-64  border-r shadow-md">
        <AppSidebar />
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="w-full border-b px-6 py-4 shadow-sm">
          <Header />
        </header>

        <section className="flex-1 p-6 bg-gray-50">{children}</section>
      </main>
    </div>
  );
};

export default withAuth(MainLayout);
