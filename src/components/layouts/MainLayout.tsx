"use client";

import React from "react";
import Header from "../Header";
import { AppSidebar } from "../Sidebar";
import withAuth from "@/hoc/withAuth";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

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
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            // "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <header className="dark:bg-gray-900 flex px-4 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-2 lg:gap-2">
              <SidebarTrigger />
              <Header />
            </div>
          </header>
          {/* <SiteHeader /> */}
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 md:gap-6 ">
                <section className="flex-1 p-6 px-6 bg-gray-50 dark:bg-gray-900">
                  {children}
                </section>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default withAuth(MainLayout);
