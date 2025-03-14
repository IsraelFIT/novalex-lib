"use client";

import Header from "@/components/layout/nav-bar/header";
import Sidebar from "@/components/layout/nav-bar/sidebar";
import Backdrop from "@/components/layout/wrappers/backdrop";
import { useSidebarStore } from "@/store/sidebarStore";
import { ReactNode } from "react";
import "@/styles/library.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebarStore();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="library-main">
      {/* Sidebar and Backdrop */}
      <Sidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div className={`flex-1 ${mainContentMargin}`}>
        {/* Header */}
        <Header />
        {/* Page Content */}
        <div className="library-children">{children}</div>
      </div>
    </div>
  );
}
