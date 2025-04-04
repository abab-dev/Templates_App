"use client"
import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import TemplateList from "@/components/ui/custom/EmailTemplateList";
import { Loader2 } from "lucide-react"; // Import Loader icon

function Dashboard() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    // Optional: Add a more visually appealing loading state
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    // Updated gradient for more vibrancy
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-red-100">
      <div className="p-10 md:px-28 lg:px-40 xl:px-56 mt-16">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl">
            {!user ? (
              <div>Please sign in.</div>
            ) : (
              <div>
                Hello {user?.firstName ? user?.firstName : user?.primaryEmailAddress?.emailAddress}!
              </div>
            )}
          </h2>
          <Link href={'/dashboard/create'}>
            <Button>Create New Email Template</Button>
          </Link>
        </div>
        <TemplateList /> {/* Pass user email if needed, but handled internally now */}
      </div>
    </div>
  );
}

export default Dashboard;

