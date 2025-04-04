'use client'
import React, { useEffect, useState } from "react";
import EditorHeader from "@/components/ui/custom/EditorHeader"
import ElementSidebar from "@/components/ui/custom/ElementSidebar";
import Canvas from "@/components/ui/custom/Canvas";
import Settings from "@/components/ui/custom/Settings";
import { useParams } from "next/navigation";
import { GetTemplateDesign } from "@/convex/emailTemplate";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useEmailTemplate } from "@/app/provider";
import { Loader2 } from "lucide-react";
import { useConvex } from "convex/react";

function Editor() {
  const [viewHTMLCode, setViewHTMLCode] = useState();
  const { templateId } = useParams();
  const { user } = useUser();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const convex = useConvex();
  const [isLoading, setIsLoading] = useState(true);

  const getTemplateData = async () => {
    setIsLoading(true);
    try {
      const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
        tId: templateId,
        email: user?.primaryEmailAddress?.emailAddress,
      });
      console.log(result);
      setEmailTemplate((result?.design)); // Set the design in global context
    } catch (error) {
      console.error("Error fetching template data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && templateId) {
      getTemplateData();
    }
  }, [user, templateId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <span className="ml-2 text-xl font-semibold">Loading template...</span>
      </div>
    );
  }

  return (
    <div>
      <EditorHeader viewHTMLCode={(v) => setViewHTMLCode(v)} />
      <div className="grid grid-cols-5">
        <ElementSidebar />
        <div className="col-span-3 bg-gray-100">
          <Canvas
            viewHTMLCode={viewHTMLCode}
            closeDialog={() => setViewHTMLCode(false)}
          />
        </div>
        <Settings />
      </div>
    </div>
  );
}

export default Editor;
