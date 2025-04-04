"use client"; // Required for useRouter and useState/context hooks
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import AIInputBox from '@/components/ui/custom/AIInputBox';
import { Button } from "@/components/ui/button"; // Import Button
import { useEmailTemplate } from "@/app/provider"; // Import context hook

export default function CreateNew() {
  const router = useRouter(); // Initialize router
  const { setEmailTemplate } = useEmailTemplate(); // Get setEmailTemplate from context

  const handleStartFromScratch = () => {
    // Clear the existing template in the context/localStorage
    setEmailTemplate([]);
    // Navigate to the editor page
    router.push('/dashboard/editor'); // Assuming '/dashboard/editor' is the route
  };
  return (
    // Removed gradient classes, layout now handles it. Kept padding/margin.
    <div className="p-10 md:px-28 lg:px-72 mt-20 xl:px-64">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-3xl">CREATE NEW EMAIL TEMPLATE</h2>
        <p className="text-lg text-gray-400"> Professional Email Templates at Your Fingertips</p>
        <Tabs defaultValue="AI" className="w-[500px] mt-10">
          <TabsList>
            <TabsTrigger value="AI">Create with AI <Sparkles /></TabsTrigger>
            <TabsTrigger value="SCRATCH">Start from Scratch </TabsTrigger>
          </TabsList>
          <TabsContent value="AI">
            <AIInputBox />
          </TabsContent>
          <TabsContent value="SCRATCH">
            <div className="flex flex-col items-center gap-4 mt-8">
              <p className="text-center text-gray-500">
                Start with a blank canvas and build your email template element by element.
              </p>
              <Button onClick={handleStartFromScratch}>
                Start Building
              </Button>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}
