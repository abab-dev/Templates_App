'use client'
import React, { useState } from "react";
import EditorHeader from "@/components/ui/custom/EditorHeader"
import ElementSidebar from "@/components/ui/custom/ElementSidebar";
import Canvas from "@/components/ui/custom/Canvas";
import Settings from "@/components/ui/custom/Settings";
function Editor() {

  const [viewHTMLCode, setViewHTMLCode] = useState()
  return (
    <div>
      <EditorHeader viewHTMLCode={(v) => setViewHTMLCode(v)}></EditorHeader>
      <div className="grid grid-cols-5">
        <ElementSidebar />
        <div className="col-span-3 bg-gray-100">
          <Canvas viewHTMLCode={viewHTMLCode} />
        </div>
        <Settings />

      </div>
    </div>
  )
}
export default Editor
