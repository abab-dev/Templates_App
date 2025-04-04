import React from "react";
import Header from "@/components/ui/custom/Header";
export default function DashboardLayout({ children }) {
  return (
    // Apply gradient and min-height to the layout container
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-red-100">
      <Header isDashboard={false} />
      {children}
    </div>
  );
}
