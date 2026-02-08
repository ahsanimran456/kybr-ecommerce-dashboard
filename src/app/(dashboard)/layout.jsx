"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [sidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar />
      <div
        className="transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? "70px" : "260px",
        }}
      >
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
