import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles } from "lucide-react";
import AIInputBox from '@/components/ui/custom/AIInputBox'

export default function CreateNew() {
  return (
    <div className="p-10 md:px-28 lg:px-72 mt-20 xl:px-64">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-3xl">CREATE NEW EMAIL TEMPLATE</h2>
        <p className="text-lg text-gray-400"> Professional Email Templates at Yout Fingertips</p>
        <Tabs defaultValue="account" className="w-[500px] mt-10">
          <TabsList>
            <TabsTrigger value="AI">Create with AI <Sparkles /></TabsTrigger>
            <TabsTrigger value="SCRATCH">Start from Scratch </TabsTrigger>
          </TabsList>
          <TabsContent value="AI">
            <AIInputBox></AIInputBox>
          </TabsContent>
          <TabsContent value="SCRATCH">Change your password here.</TabsContent>
        </Tabs>

      </div>
    </div>
  )
}
