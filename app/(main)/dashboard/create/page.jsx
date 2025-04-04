"use client"; // Required for useRouter and useState/context hooks
"use client"; // Required for useRouter and useState/context hooks
import React, { useState } from "react"; // Import useState
import { useRouter } from "next/navigation"; // Import useRouter
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Loader2 } from "lucide-react"; // Import Loader2
import AIInputBox from '@/components/ui/custom/AIInputBox';
import { Button } from "@/components/ui/button"; // Import Button
import { Input } from "@/components/ui/input"; // Import Input
import { useEmailTemplate } from "@/app/provider"; // Import context hook
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { useMutation } from "convex/react"; // Import useMutation
import { api } from "@/convex/_generated/api"; // Import api
import { useUser } from "@clerk/nextjs"; // Import useUser

export default function CreateNew() {
  const router = useRouter(); // Initialize router
  const { setEmailTemplate } = useEmailTemplate(); // Get setEmailTemplate from context
  const { user } = useUser(); // Get user data
  const saveTemplate = useMutation(api.emailTemplate.saveTemplate); // Initialize mutation
  const [isLoadingScratch, setIsLoadingScratch] = useState(false); // Loading state for scratch button
  const [scratchDescription, setScratchDescription] = useState(""); // State for scratch description

  const handleStartFromScratch = async () => {
    if (!scratchDescription.trim()) {
      // Optionally, add validation feedback here (e.g., toast notification)
      console.error("Description cannot be empty");
      return; // Prevent submission if description is empty
    }
    setIsLoadingScratch(true);
    const tId = uuidv4(); // Generate unique ID

    try {
      // Save an empty template structure to the database
      await saveTemplate({
        tId: tId,
        design: JSON.stringify([]), // Start with an empty design array
        email: user?.primaryEmailAddress?.emailAddress || "",
        description: scratchDescription, // Use the description from state
      });

      // Clear the local state (optional, as editor will fetch based on tId)
      setEmailTemplate([]);

      // Navigate to the editor page with the new template ID
      router.push(`/editor/${tId}`);

    } catch (error) {
      console.error("Error starting from scratch:", error);
      // Handle error appropriately (e.g., show a notification)
      setIsLoadingScratch(false); // Reset loading state on error
    }
    // No need to set isLoadingScratch to false on success, as navigation occurs
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
              <p className="text-center text-gray-500 mb-2">
                Give your new template a name or description.
              </p>
              <Input
                type="text"
                placeholder="e.g., Monthly Newsletter Template"
                value={scratchDescription}
                onChange={(e) => setScratchDescription(e.target.value)}
                className="w-full mb-4" // Added margin-bottom
              />
              <Button
                onClick={handleStartFromScratch}
                disabled={isLoadingScratch || !scratchDescription.trim()} // Disable if loading or description is empty
              >
                {isLoadingScratch ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  'Start Building'
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}
