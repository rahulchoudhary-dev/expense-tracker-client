"use client";

import * as React from "react";
import { LogOut, TrendingUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
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
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Logout from "./Logout";
import { ThemeToggle } from "./ThemeToggle";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, toggleSidebar, isMobile } = useSidebar();
  const pathName = usePathname();

  // on mobile, toggle the sidebar when a menu item is clicked
  const toggleSidebarOnMobie = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      {" "}
      <SidebarHeader className="shadow-xl bg-gray-50 dark:bg-gray-900">
        <div
          className={`dark:bg-gray-900 border-b border-gray-300 dark:border-gray-500 ${
            open ? "p-4" : "py-4 px-2"
          } flex justify-start gap-4 items-center`}
        >
          <div className="w-12 h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-8 h-12 text-white" />
          </div>
          {open ? (
            <div className="flex flex-col">
              <div>
                <h2 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Expendo
                </h2>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Financial Manager
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="dark:bg-gray-900 shadow-xl bg-gray-50">
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold tracking-wide">
            Main Menu{" "}
          </SidebarGroupLabel>{" "}
          <SidebarGroupContent>
            {" "}
            <SidebarMenu className={`${open ? "" : ""}`}>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      onClick={() => toggleSidebarOnMobie()}
                      href={item.url}
                      className={`flex  ${
                        pathName == item.url
                          ? "bg-gray-200 dark:text-black"
                          : ""
                      } items-center gap-3 text-sm text-muted hover:text-primary`}
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
            <SidebarMenu className={`${open ? "" : ""}`}>
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
        <div className="p-4 border-t dark:border-gray-700 space-y-2">
          <ThemeToggle />

          <Logout />
        </div>
      </SidebarContent>
      <SidebarRail className="dark:bg-gray-900 shadow-xl bg-gray-50">
        <div className="flex flex-col items-center justify-center h-full">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            © 2024 ExpenseTracker
          </Link>
        </div>
      </SidebarRail>
    </Sidebar>
  );
}
