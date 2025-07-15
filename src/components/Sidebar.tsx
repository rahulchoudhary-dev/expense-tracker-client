"use client";

import { TrendingUp } from "lucide-react";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { mainMenuItems, settingsItems } from "@/config/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar
      className={`${open ? "w-64" : "w-24"} h-full`}
      collapsible="icon"
      {...props}
    >
      {" "}
      <SidebarHeader>
        <div
          className={`dark:bg-gray-900 border-b border-gray-300 dark:border-gray-500 ${
            open ? "p-4" : "py-4 px-2"
          } flex justify-start gap-4 items-center`}
        >
          <div className="w-12 h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-8 h-12 text-white" />
          </div>
          {open && (
            <div className="flex flex-col">
              <div>
                <h2 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ExpenseTracker
                </h2>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Financial Manager
                </p>
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="dark:bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold tracking-wide">
            Main Menu{" "}
          </SidebarGroupLabel>{" "}
          <SidebarGroupContent>
            {" "}
            <SidebarMenu className={`${open ? "ml-4" : ""}`}>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 text-sm text-muted hover:text-primary"
                    >
                      <item.icon className="w-9 h-9" /> {/* ← Bigger icons */}
                      <span className="">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel className="text-base font-medium tracking-wide">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={`${open ? "ml-4" : ""}`}>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center h-full w-full gap-3 text-sm text-muted hover:text-primary"
                    >
                      <item.icon size={20} className="w-15 h-20" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
