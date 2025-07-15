"use client";

import React from "react";
import Header from "../Header";
import { AppSidebar } from "../Sidebar";
import withAuth from "@/hoc/withAuth";
import { SidebarProvider, useSidebar } from "../ui/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex dark:bg-gray-900 min-h-screen ">
      <SidebarProvider>
        <LayoutBody>{children}</LayoutBody>
      </SidebarProvider>
    </div>
  );
};

const LayoutBody = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar();

  return (
    <>
      <aside
        className={`transition-all duration-300 ${
          open ? "w-64" : "w-20"
        } border-r shadow-md`}
      >
        <AppSidebar />
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="w-full border-b px-6 py-4 shadow-sm">
          <Header />
        </header>

        <section className="flex-1 p-6 px-6 bg-gray-50 ">{children}</section>
      </main>
    </>
  );
};

export default withAuth(MainLayout);
