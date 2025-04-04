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
function Editor() {

  const [viewHTMLCode, setViewHTMLCode] = useState()
  const {templateId} = useParams()
  const {user} = useUser()
  const convex = useConvex()
  const getTemplateData = async ()=>{
    const result = await convex.query(api.emailTemplate.getTemplateData,{
      tId:templateId,
       email: user?.primaryEmailAddress?.emailAddress,
    }) 
    console.log(result)
  }
  useEffect(()=>{
    if (user){
      getTemplateData()
    }
  },[user]) 
  return (
    <div>
      <EditorHeader viewHTMLCode={(v) => setViewHTMLCode(v)}></EditorHeader>
      <div className="grid grid-cols-5">
        <ElementSidebar />
        <div className="col-span-3 bg-gray-100">
          <Canvas viewHTMLCode={viewHTMLCode} closeDialog={() => setViewHTMLCode(false)} />
        </div>
        <Settings />

      </div>
    </div>
  )
}
export default Editor
