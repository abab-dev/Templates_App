import React from "react";
import Layout from "@/Data/Layout";
import ElementList from "@/Data/ElementList";
import ElementLayoutCard from "@/components/ui/custom/ElementLayoutCard";
export default function ElementSidebar() {
  return (
    <div className="p-4">
      <h2 className="font-bold text-lg">Layouts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">

        {Layout.map((layout, index) => (

          <ElementLayoutCard layout={layout} key={index} />
        ))}
      </div>
      <h2 className="font-bold text-lg">Elements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">

        {ElementList.map((elements, index) => (

          <ElementLayoutCard layout={elements} key={index} />
        ))}
      </div>

    </div>
  )
}
