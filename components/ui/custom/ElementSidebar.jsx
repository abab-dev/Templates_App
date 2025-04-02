"use client";
import React from "react";
import Layout from "@/Data/Layout";
import ElementList from "@/Data/ElementList";
import ElementLayoutCard from "@/components/ui/custom/ElementLayoutCard";
import { useDragElementLayout } from "@/app/provider";

export default function ElementSidebar() {
  const { setDragElementLayout } = useDragElementLayout();

  const onDragLayoutStart = (layout) => {
    setDragElementLayout({
      dragLayout: {
        ...layout,
        id: Date.now(),
      },
    });
  };

  const onDragElementStart = (element) => {
    setDragElementLayout({
      dragElement: {
        ...element,
        id: Date.now(),
      },
    });
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg">Layouts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
        {Layout.map((layout, index) => (
          <div key={index} draggable onDragStart={() => onDragLayoutStart(layout)}>
            <ElementLayoutCard layout={layout} />
          </div>
        ))}
      </div>

      <h2 className="font-bold text-lg mt-6">Elements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
        {ElementList.map((element, index) => (
          <div key={index} draggable onDragStart={() => onDragElementStart(element)}>
            <ElementLayoutCard layout={element} />
          </div>
        ))}
      </div>
    </div>
  );
}
