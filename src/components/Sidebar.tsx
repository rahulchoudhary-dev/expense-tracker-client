"use client";

import {
  LayoutDashboard,
  Wallet,
  BarChart2,
  PiggyBank,
  Settings,
  TrendingUp,
} from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarProvider,
// } from "./ui/sidebar";
// import Link from "next/link";

const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Expenses",
    url: "#",
    icon: Wallet,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart2,
  },
  {
    title: "Budget",
    url: "#",
    icon: PiggyBank,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const settingsItems = [
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

// export function AppSidebar({ isOpen }: any) {
//   return (
//     <Sidebar collapsible="icon">
//       <div className="dark:bg-gray-900 border-b border-gray-300 dark:border-gray-500 p-6 flex justify-start gap-4 items-center">
//         <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
//           <TrendingUp className="w-4 h-4 text-white" />
//         </div>
//         <div className="flex flex-col">
//           <div>
//             <h2 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//               ExpenseTracker
//             </h2>
//           </div>
//           <div>
//             <p className="text-xs text-muted-foreground">Financial Manager</p>
//           </div>
//         </div>
//       </div>
//       <SidebarContent className="dark:bg-gray-900">
//         <SidebarGroup>
//           <SidebarGroupLabel className="text-base font-bold tracking-wide">
//             Main Menu
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu className="ml-4 ">
//               {mainMenuItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link
//                       href={item.url}
//                       className="flex items-center gap-3 text-sm text-muted hover:text-primary"
//                     >
//                       <item.icon size={18} />
//                       <span className="">{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>

//           <SidebarGroupLabel className="text-base font-medium tracking-wide">
//             Settings
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu className="ml-4">
//               {settingsItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link
//                       href={item.url}
//                       className="flex items-center gap-3 text-sm text-muted hover:text-primary"
//                     >
//                       <item.icon size={18} />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

// import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
// import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
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

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar className="w-64 h-full" collapsible="icon" {...props}>
      {" "}
      <SidebarHeader>
        <div
          className={`dark:bg-gray-900 border-b border-gray-300 dark:border-gray-500 ${
            open ? "p-6" : "py-6"
          } flex justify-start gap-4 items-center`}
        >
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
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
                      <item.icon size={20} />
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
                      className="flex items-center gap-3 text-sm text-muted hover:text-primary"
                    >
                      <item.icon size={20} />
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
