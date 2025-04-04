import React from "react";
import Header from "@/components/ui/custom/Header";
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
