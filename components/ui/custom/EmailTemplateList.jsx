import React, { useEffect, useState } from "react";
import { Button } from "../button";
import Link from "next/link";
import { useConvex } from "convex/react"; // Import useConvex
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react"; // Import Loader icon

function TemplateList() {
  const { user, isLoaded } = useUser();
  const convex = useConvex(); // Get Convex client
  const [emailList, setEmailList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch templates
  const fetchTemplates = async (userEmail) => {
    setIsLoading(true);
    try {
      const result = await convex.query(api.emailTemplate.GetAllTemplatesForEmail, {
        email: userEmail,
      });
      setEmailList(result || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching templates:", error);
      setEmailList([]); // Set empty list on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if Clerk is loaded and user email is available
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      fetchTemplates(user.primaryEmailAddress.emailAddress);
    } else if (isLoaded && !user?.primaryEmailAddress?.emailAddress) {
      // Handle case where user is loaded but has no primary email (edge case)
      setIsLoading(false);
      setEmailList([]);
    } else {
      // Clerk is not loaded yet, keep showing loading
      setIsLoading(true);
    }
  }, [user, isLoaded, convex]); // Rerun effect when user, isLoaded, or convex changes

  return (
    <div>
      <h2 className="mt-20 font-extrabold text-xl text-primary">Workspace</h2>
      {isLoading ? ( // Show loader while loading
        <div className="flex justify-center mt-10">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : emailList?.length === 0 ? ( // Show create message if list is empty after loading
        <div className="flex justify-center flex-col mt-7 items-center">
          {/* You can add an image component here if needed */}
          <p className="text-gray-500">No templates created yet.</p>
          <Link href={"/dashboard/create"}>
            <Button className="mt-7">+ Create new</Button>
          </Link>
        </div>
      ) : ( // Render template cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
          {emailList.map((template) => (
            <Card key={template._id}>
              <CardHeader>
                {/* Use description as title if available, fallback to tId */}
                <CardTitle className="truncate">{template.description || template.tId}</CardTitle>
                <CardDescription className="line-clamp-3 h-[60px] overflow-hidden">
                  {/* Display tId as description if description was used as title */}
                  {template.description ? `ID: ${template.tId}` : "No description provided."}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={`/editor/${template.tId}`} className="w-full">
                  <Button className="w-full">View / Edit</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
export default TemplateList;
