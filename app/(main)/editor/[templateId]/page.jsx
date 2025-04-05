'use client'
import React, { useEffect, useState } from "react";
import EditorHeader from "@/components/ui/custom/EditorHeader"
import ElementSidebar from "@/components/ui/custom/ElementSidebar";
import Canvas from "@/components/ui/custom/Canvas";
import Settings from "@/components/ui/custom/Settings";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useEmailTemplate } from "@/app/provider";
import { Loader2 } from "lucide-react";
import { useConvex } from "convex/react";
import { Demotemplate } from "@/Data/DemoTemplate";
import { useRouter } from "next/navigation";

function Editor() {
  const [viewHTMLCode, setViewHTMLCode] = useState();
  const { templateId } = useParams();
  const { user } = useUser();
  const router = useRouter();
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

      const design = typeof result?.design === 'string' ? JSON.parse(result.design) : result?.design;
      setEmailTemplate(design || []); // Set the design, fallback to empty array
    } catch (error) {
      console.error("Error fetching template data:", error);
      setEmailTemplate([]); // Set empty on error
    } finally {
      setIsLoading(false);
    }
  };

 useEffect(() => {
    let isMounted = true; // Flag to track mount status

    const loadData = async () => {
      if (templateId === "demo") {
        if (!user) {
          if (isMounted) {
            setEmailTemplate(Demotemplate);
            setIsLoading(false);
          }
        } else {
          router.push("/dashboard"); // Redirect logged-in users away from /editor/demo
        }
      } else if (user) {
        await getTemplateData(); // getTemplateData handles loading state
      } else {
        router.push("/sign-in"); // Redirect to sign-in if not logged in and not demo
      }
    };

    loadData();

    // Cleanup function
    return () => {
      isMounted = false; // Set flag to false when unmounting
      // Clear template only if navigating *away* from a non-demo template
      // This prevents clearing when switching between demo and other templates unnecessarily
      // Or clearing when just logging in/out on the demo page
      // A more robust solution might involve tracking the *previous* templateId
      if (templateId !== "demo") {
         console.log("Clearing template on unmount/dependency change for:", templateId);
         // Optionally add a small delay if needed, but usually direct is fine
         setEmailTemplate([]);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, templateId, router, setEmailTemplate]); // Added setEmailTemplate dependency


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <span className="ml-2 text-xl font-semibold">Loading template...</span>
      </div>
    );
  }


  return (
    <div className="flex flex-col h-screen">
      <EditorHeader viewHTMLCode={(v) => setViewHTMLCode(v)} />

      <div className="grid grid-cols-5 flex-grow relative">

        {/* Column 1: Element Sidebar */}
        <div
          // className={`
          //   sticky self-start          
          //   ${stickyHeightClass}       
          //   overflow-y-auto           
          //   border-r border-gray-200  
          //   bg-white                  
          // `}
          // style={stickyTopStyle}        /* Apply dynamic top offset */
          className="sticky self-start"
          // style={{top:'0px'}}
        >
          <ElementSidebar />
        </div>

        {/* Column 2-4: Canvas */}
        {/* The canvas itself will cause the *page* to scroll if its content is tall */}
        <div className="col-span-3 bg-gray-100 overflow-y-auto"> {/* Allow canvas internal scroll if needed */}
          <Canvas
            viewHTMLCode={viewHTMLCode}
            closeDialog={() => setViewHTMLCode(false)}
          />
        </div>

        {/* Column 5: Settings */}
        <div
          // className={`
          //   sticky self-start         
          //   ${stickyHeightClass}      
          //   overflow-y-auto           
          //   border-l border-gray-200  
          //   bg-white                  
          // `}
          // style={stickyTopStyle}        /* Apply dynamic top offset */

          className="sticky self-start"

          style={{top:'0px'}}
        >
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Editor;