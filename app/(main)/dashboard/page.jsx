"use client"
import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import EmailTemplateList from "@/components/ui/custom/EmailTemplateList"
function Dashboard() {
  const { isLoaded, user } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
        <EmailTemplateList></EmailTemplateList>
      </div>
    </div>
  );
}

export default Dashboard;

