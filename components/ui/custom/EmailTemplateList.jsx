import React, { useEffect, useState } from "react";
import { Button } from "../button";
import Link from "next/link";
import { useQuery } from "convex/react";
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
  const { user } = useUser();
  const [emailList, setEmailList] = useState([]);
  const templates = useQuery(
    api.emailTemplate.GetAllTemplatesForEmail,
    user?.primaryEmailAddress?.emailAddress
      ? { email: user.primaryEmailAddress.emailAddress }
      : "skip" // Skip query if email is not available
  );
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // templates can be undefined during initial load or if skipped
    if (templates !== undefined) {
      setEmailList(templates || []); // Ensure emailList is an array even if templates is null/empty
      setIsLoading(false); // Set loading to false when data is fetched or if query is skipped
    }
  }, [templates]);

  // Handle the case where the query is skipped (user email not available yet)
  useEffect(() => {
    if (templates === undefined && user?.primaryEmailAddress?.emailAddress === undefined && user?.isLoaded) {
      // Still waiting for user info, keep loading
      setIsLoading(true);
    } else if (templates === undefined && user?.primaryEmailAddress?.emailAddress === null && user?.isLoaded) {
       // User info loaded, but no email (shouldn't happen with Clerk usually, but handle defensively)
       setIsLoading(false);
       setEmailList([]);
    } else if (!user?.isLoaded) {
      // Clerk user is not loaded yet
      setIsLoading(true);
    }
  }, [templates, user]);


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
